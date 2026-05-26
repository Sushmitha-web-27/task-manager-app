const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, status } = req.body;

    const task = await Task.create({
      title,
      status,
    });

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  deleteTask,
};