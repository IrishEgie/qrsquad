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
      success: true,
      id: ticketData.id,
      uid: ticketData.uid,
      check_in: ticketData.check_in,
      check_out: ticketData.check_out,
      history: history
    };
  }

  const ticketId = req.params.uid;
  const query = `
    SELECT t.*, h.date_used, h.type, h.time_used
    FROM qticketdb t
    JOIN qticketdb_history h ON t.id = h.ticket_id
    WHERE t.uid = ?
    ORDER BY h.date_used DESC, h.time_used DESC 
    LIMIT 20 
  `;

  db.connection.query(query, [ticketId], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while fetching the ticket data.' });
    } else if (results.length > 0) {
      const ticket = restructureTicketData(results); // Refactor the result into the desired format
      res.json(ticket);
    } else {
      res.status(404).json({ success: false, error: 'Ticket not found.' });
    }
  });
});

app.get("/api/status_info", (req, res) => {
  res.json(getIPAddress());
});

app.post("/api/update_attendee/:id", (req, res) => {
  const id = req.params.id;
  const column = req.body.column;
  const value = req.body.value;

  const query = `UPDATE ${DB_TABLE_NAME} SET ${column} = ? WHERE uid = ?`;

  db.connection.query(query, [value, id], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while executing the query.' });
    } else if (results.affectedRows > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, error: 'No ticket found with the given ticket code.' });
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