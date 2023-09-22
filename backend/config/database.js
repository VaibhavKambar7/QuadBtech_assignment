const { Client } = require("pg");
require('dotenv').config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
});

const createTable = async () => {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL");

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS tickers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        last DECIMAL,
        buy DECIMAL,
        sell DECIMAL,
        volume DECIMAL,
        base_unit VARCHAR(20)
      );
    `;

    await client.query(createTableQuery);
    console.log("Table 'tickers' created successfully.");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

module.exports = { client, createTable };
