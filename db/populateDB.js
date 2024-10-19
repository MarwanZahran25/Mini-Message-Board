const { Client } = require("pg");
require("dotenv").config();

const createTableSQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR(255) NOT NULL, 
  "user" VARCHAR(255) NOT NULL, 
  added TIMESTAMP NOT NULL
);
`;

const insertDataSQL = `
INSERT INTO messages ("user", text, added) 
VALUES
  ($1, $2, $3),
  ($4, $5, $6),
  ($7,$8,$9);
`;

async function main() {
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });

  console.log("sending");

  try {
    await client.connect(); // Connect to the database

    // Run the CREATE TABLE command first
    await client.query(createTableSQL);

    // Then run the INSERT INTO command
    await client.query(insertDataSQL, [
      "Amando",
      "Hi there!",
      new Date(),
      "Charles",
      "Hello World!",
      new Date(),
      "Marwan",
      "I created this Database",
      new Date(),
    ]);

    console.log("Messages inserted successfully!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.end(); // Close the connection
    console.log("Done");
  }
}
async function deleateAll() {
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  console.log("started deleting");
  await client.connect();
  await client.query("drop table messages");
  await client.end();
  console.log("finished");
}

main();
