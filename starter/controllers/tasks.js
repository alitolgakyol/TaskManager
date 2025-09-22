const Task = require('../models/task')
const asyncWrapper = require('../middleware/async')

// Removed duplicate getAllTasks declaration to fix redeclaration error.

const getTask =  async (req, res) => {
    try {
        console.log(req.params);
        const {id: taskID} = req.params;
        const task = await Task.findOne({_id: taskID});
        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskID}` });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};


const editTask = async (req, res) => {
    try {
        const {id: taskID} = req.params;
        const task = await Task.findByIdAndUpdate({_id: taskID}, req.body, {    
            new: true,
            runValidators: true,
            overwrite: true
        });
        if (!task) return res.status(404).json({ msg: `No task with id: ${taskID}` });
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const deleteTask = async (req, res) => {
    try {
        const {id: taskID} = req.params;
        const task = await Task.findByIdAndDelete({_id: taskID});
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
    const {id: taskID} = req.params;
    const task = await Task.findByIdAndUpdate({_id: taskID}, req.body, {
        new: true,
        runValidators: true,
    });
    if (!task) return res.status(404).json({ msg: `No task with id: ${taskID}` });
    res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,
    editTask
};
