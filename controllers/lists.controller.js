const db = require("../models");
const Lists = db.lists;

exports.getLists = async (req, res) => {
  try {
    const data = await Lists.find();
    res.json(data);

  } catch(error) {
    res.status(500).send({ message: error.message });
  }
}

exports.getListById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Lists.findById(id);
    res.json(data);
  } catch(error) {
    res.status(500).send({ message: error.message });
  }
}

exports.addNewItem = async (req, res) => {
  try {
    const data = new Lists({
      name: req.body.name,
      style: req.body.style || "#ffffff",
      userId: req.body.userId
    });

    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch(error) {
    res.status(500).send({ message: error.message });
  }
}

exports.updateItem = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const options = { new: true };

     const result = await Lists.findByIdAndUpdate(
      id, updateData, options
     );

     res.send(result);
  } catch(error) {
    res.status(500).send({ message: error.message });
  }
}

exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Lists.findByIdAndDelete(id);
    res.send(`Item with ${data.name} has been deleted...`);
  } catch(error) {
    res.status(500).send({ message: error.message });
  }
}