require('dotenv').config();
const mysql = require('mysql2');

const SCHEMA_NAME = process.env.DB_NAME;
let connection = null;

// Function to create the database schema if it doesn't exist
function createSchemaIfNotExists() {
  const connectionWithoutDatabase = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: false
  });

  connectionWithoutDatabase.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL without database:', err);
      throw err;
    }

    // Create the database schema if it doesn't exist
    connectionWithoutDatabase.query(`CREATE DATABASE IF NOT EXISTS ${SCHEMA_NAME}`, (err) => {
      if (err) {
        console.error('Error creating database schema:', err);
        throw err;
      }
      console.log(`Database schema '${SCHEMA_NAME}' created successfully or already exists.`);
      
      // Close the connection
      connectionWithoutDatabase.end();

      // Establish connection to the database
      establishDatabaseConnection();
    });
  });
}

// Function to establish connection to the database
// Function to establish connection to the database
function establishDatabaseConnection() {
  // Create the connection with the specified schema
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: SCHEMA_NAME,
    ssl: false
  });

  connection.connect((err) => {
    if (err) {
      throw err;
    }

    console.log('Connected to MySQL!');

    // Create the 'qticketdb' table
    const createTableQuery = `
      CREATE TABLE qticketdb (
        id INT PRIMARY KEY AUTO_INCREMENT,
        uid VARCHAR(16) NOT NULL,
        check_in DATETIME,
        check_out DATETIME
      )
    `;

    // Create the 'qticketdb_history' table
    const createHistoryTableQuery = `
      CREATE TABLE IF NOT EXISTS qticketdb_history (
        id INT PRIMARY KEY AUTO_INCREMENT,
        ticket_id INT,
        date_used DATETIME,
        type TINYINT,  
        time_used DATETIME,
        FOREIGN KEY (ticket_id) REFERENCES qticketdb(id) 
      )
    `;

    // Insert entries into the qticketdb table
    const entries = [
      '367b-da-be-f3-32',
      '661b-2d-11-7c-3b',
      '044b-05-2a-ca-8a',
      '9a27-67-8a-ac-ab',
      '202a-ca-26-1a-3f',
      'b0e4-0b-85-83-34',
      '1755-41-ba-24-01',
      '7685-69-f4-21-69',
      'b750-46-68-5d-19',
      '4483-cf-ac-0e-13',
      'ac5b-14-be-80-35',
      'dbaf-4e-07-2e-3b',
      'd544-d1-d9-39-6c',
      '9417-b0-b1-80-78',
      '4198-77-f8-b3-6b',
      '345a-a5-df-fc-97',
      'b414-87-37-4e-df',
      '3607-3c-d6-49-05',
      '9020-c5-93-db-a5',
      'bd41-bb-84-4f-fb',
      '4038-53-d8-55-68',
      '3268-29-ec-15-a2',
      '97dc-c9-3c-4a-7d',
      '9632-84-4f-98-50',
      '91a5-6a-d2-94-a6',
      '8832-2c-be-86-78',
      '5570-3b-47-1f-29',
      'd63f-bb-27-b4-0c',
      '72ad-ac-5b-7b-89',
      '71d2-09-8a-bc-16',
      '7934-67-da-65-d1',
      '9b80-dd-30-5b-c5',
      'fe46-2a-89-50-be',
      '55cf-84-3f-6e-0c',
      '6671-de-06-22-fd',
      'c363-1b-b2-04-8d',
      'eb49-08-72-69-32',
      '3e40-e6-b7-5d-f6',
      '98fd-e6-d0-c8-3c',
      '60b3-4c-96-98-05',
      'cb17-38-90-b1-c6',
      'c219-cd-1c-33-0f',
      '2221-3e-28-ae-c0',
      '1d38-40-6d-1c-bf',
      'e760-a1-a0-ed-1c',
      '99a4-ee-13-01-f6',
      '29e6-77-71-4a-6c',
      '70d8-c7-c1-8c-9b',
      '0fe8-e5-32-0a-2b',
      '64e5-a0-5b-d1-46',
      'f996-1a-57-4c-71',
      'ddf5-77-70-98-3b',
      '8cbe-90-1b-52-a4',
      '7b5f-1f-44-d9-02',
      'de38-6f-99-2e-4b',
      'c100-f5-c4-12-9a',
      'ab2b-6a-b5-dd-7f',
      'e02e-84-1d-6f-5b',
      '8e2e-dd-d8-ed-93',
      'b2a7-e4-13-ae-e5',
      'eaf6-ba-f9-ec-cf',
      'bb96-a2-39-4c-d9',
      'c033-b9-c5-f1-ae',
      'eb03-b0-8d-64-e3',
      '4e78-d3-e1-7e-22',
      '64c5-92-61-b2-0a',
      '9d1b-c1-ad-46-3e',
      'b469-f4-43-3b-4c',
      'ac16-01-37-ad-50',
      'f1d2-0d-d5-7f-35',
      'ce60-22-b1-5e-4b',
      '9fd5-b9-91-cd-d9',
      'c3f0-0b-3a-2b-26',
      'f622-b9-42-70-7a',
      'e75c-74-91-5c-b3',
      'da31-4c-22-a0-fd',
      '6a46-ae-e0-4c-94',
      '7a19-47-ba-00-ef',
      '616f-d9-a3-0f-11',
      'e3fe-9e-4e-17-18',
      '9ba0-21-f7-32-6b',
      'e0bf-33-81-77-7b',
      '0519-64-f4-20-fd',
      '05d0-56-c4-3c-04',
      '4900-ec-27-16-57',
      '322c-42-0c-6d-05',
      'c5e0-59-ba-e8-e6',
      '5198-83-1c-9d-c9',
      '77be-8f-89-c5-5b',
      'fa7b-b4-9f-4e-72',
      'b3bb-40-d0-9a-b7',
      'eefa-8a-af-77-b6',
      'd6b8-6e-e4-c5-ab',
      'c17b-3e-51-3b-37',
      'b819-f6-a6-26-2a',
      '556c-38-c4-f5-6a',
      '18c6-a5-0e-ba-c6',
      'd0f5-5e-95-51-68',
      'b402-52-8f-c7-8b',
      '4dc2-5a-ae-83-b7',
      '0555-7c-bd-c7-16',
      'ba64-6d-c5-76-f6',
      'e058-62-5d-2d-dc',
      'd094-46-d9-83-19',
      '2a59-6f-17-b4-e5',
      '10fc-0c-ce-84-6b',
      '896d-77-e4-a8-16',
      '5d41-76-1d-c0-42',
      '6e2c-99-f6-74-2d',
      'a122-a5-cd-90-5e',
      '4bbf-48-4d-29-d5',
      'a026-14-1d-6c-dd',
      'f0e6-01-cf-b2-a8',
      'f0a7-f1-0a-d5-6d',
      '4064-59-7e-99-24',
      '698f-b4-45-fd-1a',
      '22a1-73-e1-ac-c1',
      '8658-a4-72-93-f7',
      '17e5-f4-90-dc-04',
      'a916-48-b9-c8-54',
      'dcfc-03-90-4b-02',
      '78a5-10-c1-f2-97',
      'fe79-18-10-23-ea',
      'da2f-66-82-5d-e8',
      'e384-fd-d0-7d-5e',
      '97b4-f4-39-fe-f0',
      '70df-cd-34-7e-99',
      'f21f-dd-72-8f-e6',
      '36e0-c7-bd-e2-e8',
      '8d7e-3c-4c-1b-51',
      'dd90-12-21-83-32',
      'bda1-41-1a-63-c9',
      '877a-40-d2-f4-17',
      'c308-00-ec-49-bc',
      '3404-c2-98-81-71',
      'b5d0-6f-d8-f3-68',
      '15c6-af-b9-63-6c',
      'b5dc-72-bd-86-a1',
      '1c3f-09-39-c0-4c',
      '85e2-dd-cd-b0-b5',
      '47f4-bc-3c-1c-9b',
      '5135-da-be-e0-1c',
      '0777-f8-2c-d5-0e',
      '042a-f4-5a-7f-9a',
      '59bd-3c-38-92-5f',
      'ecab-21-7f-c8-0a',
      'e715-0c-e3-c0-2f',
      '3c58-c1-99-43-8d',
      'c6a1-c7-54-7c-83',
      'edfe-6c-01-f7-8f',
      'cfdc-80-09-bf-24',
      'b54f-d0-e7-93-2c',
      '084b-14-1c-3e-fc',
      '4c8a-88-87-77-be',
      'e0c6-28-89-ac-e6',
      'f288-30-db-df-d0',
      'a0cd-28-87-07-4a',
      'a29a-ee-a6-13-12',
      'e3db-8f-35-8a-db',
      '9805-aa-89-ec-85',
      '7d12-e7-78-ac-b4',
      'd8cd-99-2f-9c-b5',
      '0bc1-25-7c-53-92',
      '4301-3a-5d-40-82',
      'dbed-12-89-65-29',
      '610e-cf-29-7b-aa',
      '9828-95-19-ea-6a',
      '80b1-0f-ca-10-af',
      '15f8-37-f7-af-93',
      '7d8e-a0-11-e6-17',
      '8430-5f-18-8e-09',
      'd9e8-74-b5-72-7a',
      'da8a-05-d5-78-7a',
      'e352-08-31-84-cf',
      '5f49-c5-9d-19-02',
      '60ae-8d-95-30-7e',
      'd724-ef-12-25-fc',
      '0982-89-92-44-78',
      '0ee6-2d-94-32-ee',
      '2813-ce-9b-39-a3',
      '1d07-ea-05-08-d2',
      '778b-b1-05-51-ba',
      'ae89-5a-1c-00-62',
      '11d5-cf-d8-ad-f6',
      'eaf3-f6-0d-90-9c',
      '6f3c-e3-df-fc-89',
      'ed4e-28-52-70-45',
      'ad3d-10-d4-a2-db',
      '5fea-f0-03-51-dc',
      '0093-a2-b5-40-dc',
      '1813-da-9a-87-53',
      '9816-a9-12-e5-d7',
      '4120-77-00-58-23',
      '2dc1-5c-cf-91-ae',
      '9e2f-84-c3-bc-80',
      'a8fd-5b-ec-a5-35',
      '419c-e4-13-e5-df',
      '6da9-fb-37-c4-b5',
      'a333-09-0d-0c-21',
      'f1b9-e5-79-29-bb',
      'ec2b-96-14-15-0b',
      '5e2d-93-fb-13-9c',
      'b527-72-f0-14-6e',
      'cec0-04-d1-d3-b3',
      '22fe-09-16-eb-51',
      '565f-80-c6-e9-02',
      '475b-48-26-85-fa',
      'f096-9e-48-8c-11',
      '0350-98-4a-00-ec',
      '034a-b2-c5-f9-c5',
      '156c-26-73-20-74',
      'ab95-fe-c3-c7-3d',
      '1abe-84-a2-b8-38',
      '6898-78-b0-33-e8',
      '25c9-b9-94-69-4a',
      '31c0-0c-d9-71-63',
      '989d-fa-f4-4f-f3',
      '0e06-af-eb-c3-58',
      'd71f-0a-8e-f4-e4',
      'f3c4-01-c7-76-c4',
      '5768-00-ec-4f-88',
      '31a8-7d-50-3b-3b',
      '342b-f7-03-af-87',
      'b720-50-c2-22-dd',
      '277d-70-96-62-a1',
      '92c4-86-e8-ec-b8',
      '4fd1-90-8d-aa-7e',
      '3753-af-07-83-65',
      'be7e-03-a3-fb-9f',
      '18a0-00-72-0b-ef',
      '75d3-ef-9c-06-bb',
      '5ea1-6a-ec-ae-6b',
      '58b5-b8-99-7c-94',
      'e984-78-3e-e6-47',
      'f6c3-53-b4-9f-ac',
      'ecae-41-c2-8d-4d',
      '13a5-5d-96-7c-af',
      '1081-0d-70-9a-61',
      'b0bd-07-56-d5-05',
      'ce61-42-23-39-95',
      'e6c6-9e-55-ba-f7',
      '525e-6c-91-d5-a5',
      '85ac-a9-74-2e-eb',
      '3b1d-1f-61-d0-24',
      'e64e-53-e9-49-97',
      'f921-69-f1-90-df',
      '56fc-85-89-a7-04',
      '570d-ab-54-45-f5',
      'b43f-9c-25-b9-e3',
      'f836-85-df-7a-21',
      '1467-42-ad-eb-3e',
      'd3a6-a7-4a-17-70',
      '437b-5a-a8-0b-b5',
      '45c2-25-0a-75-09',
      '381a-b2-8b-76-d8',
      'e5a2-5d-ec-9b-72',
      '9807-73-0e-5c-ae',
      '17aa-39-c2-69-d5',
      '06c1-f8-e5-9b-f0',
      '5b2f-f9-1c-36-32',
      '7d87-4c-9a-b8-4e',
      '3326-80-04-c2-19',
      'b99c-d0-d6-ef-e3',
      'b57c-85-aa-a8-d8',
      '26af-8a-ed-21-39',
      '21f2-7a-12-a2-1a',
      '4365-cd-e1-72-f7',
      '35b2-34-5e-e4-51',
      '495d-55-95-d5-73',
      '0314-55-9a-98-03',
      'aa9e-b1-21-65-7a',
      '5130-d3-e9-db-f2',
      'e2b5-cf-23-77-3f',
      'cd9a-08-62-c9-75',
      'a3e4-86-7c-88-55',
      '156f-12-b9-3f-64',
      '93d6-b6-99-37-a6',
      'e9bd-c7-53-62-82',
      'f982-9c-2f-d6-3a',
      '291e-cc-33-61-3a',
      '09d1-82-fe-85-b2',
      '687f-33-f8-70-eb',
      '513a-5c-f3-78-54',
      '34a1-60-bf-1b-65',
      '532e-90-e5-7f-64',
      'ca48-95-46-c9-d7',
      '647e-27-2d-76-8e',
      '6970-d8-fe-bf-4f',
      '9927-4e-15-b7-1e',
      'c9f2-bf-86-92-6a',
      'a469-dc-9c-23-4b',
      'fee7-5b-04-ec-20',
      '9cbf-2d-16-10-2c',
      '78c0-fa-18-bf-5c',
      'ac11-cf-7c-a3-56',
      '590a-f1-05-19-8b',
      '84ce-3c-4b-84-5d',
      '9022-a4-a0-9d-4b',
      'e14b-56-a4-87-7a',
      '5d31-e6-0b-46-d2',
      '29a0-b5-9d-4a-5f',
      'cafa-b3-e6-05-0c',
      '812d-8a-8a-26-15',
      'c3ea-9e-9c-f1-14',
      '0c49-7a-fc-d3-b0',
      '92c7-52-87-7e-7f',
      'd07a-b5-5a-42-42',
      '4438-99-05-99-05',
      '4e04-dd-3d-ed-c8',
      'e802-a0-87-c3-f6',
      'bf00-ef-d7-11-83',
      '04c2-70-34-5b-a4',
      '4531-9d-2a-fc-2d',
      '3683-4a-d2-19-00',
      '3c0b-0b-64-94-12',
      '3fdd-b5-a0-fa-1a',
      '198d-b4-6b-e0-de',
      '8013-66-32-df-5b',
      '6e83-19-3c-b3-ad',
      '8a8a-46-ec-0d-cc',
      '8d99-78-82-78-d8',
      '29f2-f7-4b-a9-ee',
      'dc3e-ec-10-77-7f',
      '7842-12-d0-f9-dd',
      '0ab9-1c-d7-34-1c',
      'cc83-53-7e-97-b0',
      '66ae-0d-56-9b-8b',
      '6d0e-1c-a1-f5-45',
      '87df-11-8e-1d-08',
      '4b64-65-e7-50-cf',
      '71dc-99-2a-96-ac',
      '7bea-34-3c-b6-8f',
      '5f47-85-39-25-36',
      'a569-57-dd-dc-8c',
      'b864-52-b2-69-9e',
      'e3e7-64-b3-84-61',
      'bbd7-a8-4c-5a-78',
      'e54f-4b-b8-a8-4a',
      '37cc-8c-ea-df-41',
      '6804-72-07-88-61',
      '74b4-b6-a9-71-96',
      'e9fd-76-2b-e1-8d',
      'e3ac-11-64-af-d2',
      'b9eb-0d-8a-b9-e6',
      '6ebe-e6-46-2d-d1',
      'aef8-c4-92-f7-dd',
      'b045-10-16-38-ce',
      '9b32-a9-8f-b2-ea',
      'd958-f4-14-7b-ec',
      '707d-eb-62-2e-85',
      'bee7-97-17-b7-d6',
      'cdcc-06-93-ee-4c',
      'dfac-df-30-62-b8',
      '54f2-83-d2-d4-06',
      '50c1-a0-41-b7-f0',
      '7f22-af-ed-ee-f7',
      'e13f-fb-57-2e-ad',
      '1315-44-27-9e-b9',
      '7685-2a-cf-31-5e',
      'f8e0-6b-cd-5e-1c',
      'a18a-84-90-cb-79',
      'd29a-c3-55-05-f2',
      'c9ab-be-6b-82-87',
      '7405-3d-df-59-51',
      '80b7-8b-bd-36-d8',
      '64d1-ba-1a-95-10',
      '7588-07-cf-00-79',
      '988e-4d-50-98-5c',
      '467b-15-30-1a-8a',
      '0fd3-ac-c4-4d-94',
      '761d-bf-98-b8-4f',
      '6897-f7-32-b9-c8',
      '8062-1d-f4-54-c0',
      '0e23-3f-55-5f-01',
      '862c-76-86-31-9d',
      'e72c-9a-71-a8-8c',
      '9ee9-8d-84-56-05',
      'ecac-80-7d-d2-2a',
      '8ace-33-25-94-86',
      'dcab-20-93-4f-1d',
      'f849-8c-1c-76-63',
      '2088-7f-25-b1-3b',
      'fbd6-09-d2-b6-d0',
      '1698-b0-52-c1-d8',
      '0e5e-c8-7a-91-0b',
      '2a91-31-61-7b-87',
      '5194-57-84-3e-f3',
      'ccee-52-dc-48-bf',
      'b202-0f-50-45-69',
      '9a42-fb-8c-f1-0b',
      'cd7d-9b-3d-1c-76',
      '540f-c8-9f-84-92',
      '6b6a-6d-d1-a4-13',
      '1190-72-45-65-ed',
      '4e80-19-37-fe-3c',
      '83f7-6b-ce-d7-a7',
      '5567-0e-40-a6-09',
      'bf2e-71-36-b1-3c',
      'e54c-97-fe-5f-e1',
      '4ef0-49-56-90-4d'
    ];
    const insertQuery = `INSERT INTO qticketdb (uid) VALUES ?`;

    // Execute queries sequentially
    connection.query(createTableQuery, (error) => {
      if(error?.message.startsWith(`Table '${SCHEMA_NAME}' already exists`)) {
        console.log('Table already exists');
        // connection.end();
        return;
      }
      if (error) {
        console.error('Error creating qticketdb table:', error);
        return;
      }

      connection.query(createHistoryTableQuery, (error) => {
        if (error) {
          console.error('Error creating qticketdb_history table:', error);
          return;
        }

        connection.query(insertQuery, [entries.map(uid => [uid])], (error) => {
          if (error) {
            console.error('Error inserting entries:', error);
          } else {
            console.log('Tables created and entries inserted successfully');
          }
          // Close the connection
          // connection.end();
        });
      });
    });
  });
}

function getConnection() {
  return connection;
}

module.exports = {
  getConnection: getConnection,
  SCHEMA_NAME: SCHEMA_NAME
};

// Call the function to create the schema if it doesn't exist
createSchemaIfNotExists();