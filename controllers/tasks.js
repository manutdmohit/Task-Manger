const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');

exports.getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});

  res.status(200).json({
    tasks,
  });
});

exports.createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

exports.getTask = asyncWrapper(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) {
    res
      .status(404)
      .json({ message: `No task with id : ${req.params.id} found` });
  }

  res.status(200).json({ task });
});

exports.updateTask = asyncWrapper(async (req, res) => {
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
});

exports.deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return res.status(404).json({ message: `No task with id : ${taskID}` });
  }

  res.status(200).json({
    message: task.id,
  });
});
