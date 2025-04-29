// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Cartography = require("./models/cartographyModel"); // Assuming the schema is in CartographyModel.js
const { getGraphData } = require("./controller/mix2.controller");

const app = express();
const port = 5000;

app.use(cors());

mongoose.connect("mongodb://localhost:27017/cartograph", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// MongoDB Connection Events
db.on('connected', () => {
  console.log(`✅ Master DB connected successfully with Cartography database!`);
});

db.on('error', (err) => {
  console.log('❌ MongoDB master connection error:', err.message);
  process.exit(1);
});

app.get("/cartography", getGraphData);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
