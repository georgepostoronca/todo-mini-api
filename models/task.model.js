const mongoose = require("mongoose");

const Task = mongoose.model("Task", new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  completed: {
    required: true,
    type: Boolean,
    default: false
  },
  parentId: {
    required: true,
    type: String,
  },
  createdAt: Number,
  updatedAt: Number,
}, {
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
}));

module.exports = Task;