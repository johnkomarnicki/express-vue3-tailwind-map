const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

// routes
app.use("/api/search", require("./routes/searchResults.js"));

app.listen(PORT, () => console.log(`app started on port: ${PORT}`));
