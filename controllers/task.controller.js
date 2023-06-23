const db = require("../models");
const Task = db.task;
const Lists = db.lists;

exports.getTasks = async (_req, res) => {
  try {
    const data = await Task
    .find();
    res.json(data);
  } catch(error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = Task.findById(id);
    res.json(data);
  } catch(error) {
    res.status(500).json({ message: error.message })
  }
}

exports.addItem = async (req, res) => {
  try {
    const parentId = req.params.parentId;
    const data = new Task({
      title: req.body.title,
      updatedAt: req.body.updatedAt,
      parentId
    });

    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch(error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateItem = async (req, res) => {
  try {
    const id = req.body.id;
    const updateOption = req.body;
    const options = { new: true };

    const result = await Task({
      id, updateOption, options
    });

    res.send(result);
  } catch(error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Task.findByIdAndDelete(id);
    res.send(`Item with ${data.name} has been deleted...`);
  } catch(error) {
    res.status(500).json({ message: error.message })
  }
}