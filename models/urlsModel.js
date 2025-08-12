const mongoose = require("mongoose");

const urlsSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

const Url = mongoose.model("Url", urlsSchema);

module.exports = Url;
