-- Create the database
CREATE DATABASE IF NOT EXISTS qticketdb;
USE qticketdb;

-- Create the 'qticketdb' table
CREATE TABLE qticketdb (
   id INT PRIMARY KEY AUTO_INCREMENT,
   uid VARCHAR(16) NOT NULL,
   check_in DATETIME,
   check_out DATETIME
);

-- Create the 'qticketdb_history' table
CREATE TABLE qticketdb_history (
   id INT PRIMARY KEY AUTO_INCREMENT,
   ticket_id INT,
   date_used DATETIME,
   type TINYINT,  
   time_used DATETIME,
   FOREIGN KEY (ticket_id) REFERENCES qticketdb(id) 
);


-- Delete all data
DELETE FROM qticketdb;
DELETE FROM qticketdb_history;

-- Drop Tables
DROP TABLE IF EXISTS qticketdb;
DROP TABLE IF EXISTS qticketdb_history;

-- Get the ID of the last inserted ticket
SET @lastTicketId = LAST_INSERT_ID(); 

-- Add a history entry for the new ticket 
INSERT INTO qticketdb_history (ticket_id, date_used, type, time_used)
VALUES (1, NOW(), 0, NOW());

-- Get ticket with full history
SELECT t.*, h.date_used, h.type, h.time_used 
FROM qticketdb t
JOIN qticketdb_history h ON t.id = h.ticket_id
WHERE t.id = 1; 