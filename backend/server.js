const express = require("express");
const axios = require("axios");
const { client, createTable } = require("./config/database");
const { fetchBTCINRPrice, calculateValues } = require("./btcprice");
const { router } = require("./routes/route");

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

fetchBTCINRPrice();

calculateValues();

createTable();

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
