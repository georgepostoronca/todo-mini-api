const mongoose = require("mongoose");

const Lists = mongoose.model("Lists", new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  style: {
    required: true,
    type: String
  },
  tasks: {
    required: true,
    default: 0,
    type: Number
  },
  completed: {
    required: true,
    default: 0,
    type: Number
  },
  userId: {
    type: String,
    required: true
  }
}))

module.exports = Lists;