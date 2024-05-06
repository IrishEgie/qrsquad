-- Create the database
CREATE DATABASE IF NOT EXISTS qticketdb;
USE qticketdb;

-- Create the 'qticketdb' table
CREATE TABLE qticketdb (
   id INT PRIMARY KEY AUTO_INCREMENT,
   uid VARCHAR(25) NOT NULL,
   check_in DATETIME,
   check_out DATETIME
);

-- Create the 'qticketdb_history' table
CREATE TABLE qticketdb_history (
   id INT PRIMARY KEY AUTO_INCREMENT,
   ticket_id INT,
   date_used DATE,
   type TINYINT,  
   time_used TIME,
   FOREIGN KEY (ticket_id) REFERENCES qticketdb(id) 
);

-- Insert a new ticket (sample data)
INSERT INTO qticketdb (uid, check_in, check_out) 
VALUES ('f6333a7b-9cb3-496f-a13f-861e51961884', NOW(), NOW());

-- Get the ID of the last inserted ticket
SET @lastTicketId = LAST_INSERT_ID(); 

-- Add a history entry for the new ticket 
INSERT INTO qticketdb_history (ticket_id, date_used, type, time_used)
VALUES (@lastTicketId, CURDATE(), 0, '10:50:30');

-- Get ticket with full history
SELECT t.*, h.date_used, h.type, h.time_used 
FROM qticketdb t
JOIN qticketdb_history h ON t.id = h.ticket_id
-- WHERE t.id = @lastTicketId; 
WHERE t.uid = 2; 