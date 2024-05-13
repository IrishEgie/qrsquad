const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');
const bodyParser = require('body-parser');
const os = require('os');

const PORT = 5000;
const DB_TABLE_NAME = "attendees";
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

function getIPAddress() {
  const { networkInterfaces } = require('os');

  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
  }
  return results;
}

app.get("/api/", (req, res) => {

  res.status(200).send("Meow");
});
app.get("/api/ticket/:uid", (req, res) => {

  // Helper function to format the results
  function restructureTicketData(results) {
    const ticketData = results[0];
    const history = results.map(row => ({
      date_used: row.date_used,
      type: row.type,
      time_used: row.time_used
    }));

    return {
      success: 200,
      id: ticketData.id,
      uid: ticketData.uid,
      check_in: ticketData.check_in,
      check_out: ticketData.check_out,
      history: history
    };
  }

  const ticketId = req.params.uid;
  const query = `
    SELECT t.*, 
    IFNULL(h.date_used, '') AS date_used, 
    IFNULL(h.type, '') AS type, 
    IFNULL(h.time_used, '') AS time_used
    FROM qticketdb t
    LEFT JOIN qticketdb_history h ON t.id = h.ticket_id
    WHERE t.uid = ?
    ORDER BY h.date_used DESC, h.time_used DESC 
    `;
  db.getConnection().query(query, [ticketId], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while fetching the ticket data.' });
    } else if (results.length > 0) {
      const ticket = restructureTicketData(results); // Refactor the result into the desired format
      res.json(ticket);
    } else {
      res.status(404).json({ success: 404, error: 'Ticket not found.' });
    }
  });
});

app.post("/api/insert_log/:ticket_id", (req, res) => {
  const ticketId = req.params.ticket_id;
  const dateUsed = new Date();
  const type = req.body.type;
  const timeUsed = new Date();

  const query = `
    INSERT INTO qticketdb_history (ticket_id, date_used, type, time_used) 
    VALUES (?, ?, ?, ?)
  `;

  db.getConnection().query(query, [ticketId, dateUsed, type, timeUsed], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while executing the query.' });
    } else {
      // Fetch both check_in and check_out values in a single query
      const combinedQuery = `
        SELECT
          (SELECT IFNULL(MIN(h.date_used), '') FROM qticketdb_history h WHERE h.ticket_id = t.id) AS check_in,
          (SELECT IFNULL(MAX(h.date_used), '') FROM qticketdb_history h WHERE h.ticket_id = t.id) AS check_out
        FROM qticketdb t
        WHERE t.id = ?
      `;

      db.getConnection().query(combinedQuery, [ticketId], (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error: 'An error occurred while executing the query.' });
        } else {
          const checkInValue = new Date(result[0].check_in);
          // const checkInValue = new Date();
          const checkOutValue = new Date(result[0].check_out);
          // Update qticketdb table with the new check_in and check_out values
          const updateQuery = `
            UPDATE qticketdb
            SET check_in = ?,
                check_out = ?
            WHERE id = ?
          `;

          db.getConnection().query(updateQuery, [checkInValue, checkOutValue, ticketId], (error, updateResult) => {
            if (error) {
              console.log(error);
              res.status(500).json({ error: 'An error occurred while updating the check_in and check_out values.' });
            } else {
              // console.log(updateResult);
              res.status(200).json({ success: 200 });
            }
          });
        }
      });
    }
  });
});


app.listen(PORT, () => {
  const networkInterfaces = os.networkInterfaces();
  let localHostAddress = getIPAddress();
  let localHostIP;
  const connectionRegex = /Local Area Connection.*|Wi-Fi/;
  for (const [key, value] of Object.entries(localHostAddress)) {
    if (connectionRegex.test(key)) {
      console.log("Desired key:", key);
      localHostIP = value;
    }
  }
  console.log(`Server from ${localHostIP}:${PORT} running loaded with Database Schema: ${db.SCHEMA_NAME}`);
});