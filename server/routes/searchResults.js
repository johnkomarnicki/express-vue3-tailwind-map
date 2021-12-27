const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:query", async (req, res) => {
  try {
    // getting query param from req
    const query = req.params.query;
    const results = await axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.API_KEY}`
    );
    const data = results.data;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
