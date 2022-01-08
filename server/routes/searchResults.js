const express = require("express");
const router = express.Router();
const axios = require("axios");
const url = require("url");

router.get("/:query", async (req, res) => {
  try {
    // adding api key & query strings
    const params = new URLSearchParams({
      access_token: process.env.API_KEY,
      ...url.parse(req.url, true).query,
    });
    // getting query param from req
    const query = req.params.query;
    const results = await axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${params}`
    );

    // format data to include city and state
    results.data.features.forEach((item) => {
      item.context.forEach((type) => {
        if (type.id.includes("place")) {
          item.city = item.text;
        }
        if (type.id.includes("region")) {
          item.state = item.text;
        }
      });
    });

    const data = results.data;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
