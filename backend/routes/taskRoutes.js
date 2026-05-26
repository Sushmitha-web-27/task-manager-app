const express = require("express");
const router = express.Router();

const Task = require("../models/Task");

// GET TASKS
router.get("/", async (req, res) => {

  try {

    const tasks = await Task.find();

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// ADD TASK
router.post("/", async (req, res) => {

  try {

    const newTask = new Task({
      title: req.body.title,
      status: req.body.status,
    });

    const savedTask = await newTask.save();

    res.json(savedTask);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// UPDATE TASK
router.put("/:id", async (req, res) => {

  try {

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        status: req.body.status,
      },
      { new: true }
    );

    res.json(updatedTask);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// DELETE TASK
router.delete("/:id", async (req, res) => {

  try {

    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;