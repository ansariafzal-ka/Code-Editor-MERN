const mongoose = require("mongoose");

const codeModel = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Code", codeModel);
