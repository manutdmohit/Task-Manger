const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});

    res.status(200).json({
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    if (!task) {
      res
        .status(404)
        .json({ message: `No task with id : ${req.params.id} found` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({
        message: `No task with id ${taskID} `,
      });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });

    if (!task) {
      return res.status(404).json({ message: `No task with id : ${taskID}` });
    }

    res.status(200).json({
      message: task.id,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
