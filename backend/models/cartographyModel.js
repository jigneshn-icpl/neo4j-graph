// cartographyModel.js
const mongoose = require("mongoose");

const CartographySchema  = new mongoose.Schema({
  _id: String,
  labels: [String],
  properties: mongoose.Schema.Types.Mixed,
  parentID: [String],
  childID: [String],
  relation: [String]
}, { collection: 'carto', strict: false });

const Cartography = mongoose.model("carto", CartographySchema);

module.exports = Cartography;
