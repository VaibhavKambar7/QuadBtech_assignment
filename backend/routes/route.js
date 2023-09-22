const express = require("express");
const router = express.Router();
const { fetchAndStoreData,fetchDataFromDatabase } = require("../controllers/controller");

router.route("/fetchDataDB").get(fetchDataFromDatabase);
router.route("/fetchAndStoreData").get(fetchAndStoreData);

module.exports = { router };
