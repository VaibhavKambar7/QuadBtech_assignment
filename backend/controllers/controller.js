const { client } = require("../config/database");
const axios = require("axios");

const fetchDataFromDatabase = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM tickers");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    res.status(500).send("Error fetching data from the database.");
  }
};

const fetchAndStoreData = async (req, res) => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const tickers = Object.values(response.data);

    const top10Tickers = tickers
      .sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume))
      .slice(0, 10);

    await client.query("DELETE FROM tickers");

    for (const ticker of top10Tickers) {
      const { name, last, buy, sell, volume, base_unit } = ticker;
      const query = {
        text: "INSERT INTO tickers (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)",
        values: [name, last, buy, sell, volume, base_unit],
      };
      try {
        const result = await client.query(query);
        console.log("Inserted:", result.rowCount, "row(s)");
      } catch (error) {
        console.error("Error inserting into database:", error);
      }
    }

    res.send("Data fetched and stored successfully.");
  } catch (error) {
    console.error("Error fetching and storing data:", error);
    res.status(500).send("Error fetching and storing data.");
  }
};

module.exports = { fetchAndStoreData, fetchDataFromDatabase };
