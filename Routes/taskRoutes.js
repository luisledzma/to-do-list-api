const express = require('express');
const router = express.Router();
const Task = require('../Models/Task');
const List = require('../Models/List');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().populate('listId', 'title');  // Populate the listId field
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all tasks
// Get tasks by list ID and structure the response
router.get('/:id', async (req, res) => {
    try {
        // Find the list by its ID
        const list = await List.findById(req.params.id).select('_id title icon');
        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }

        // Find tasks associated with this list ID
        const tasks = await Task.find({ listId: req.params.id }).select('-listId'); // Exclude listId from each task

        // Structure the response with tasks nested inside the list object
        const response = {
            listId: list._id,
            title: list.title,
            icon: list.icon,
            tasks: tasks
            
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single task by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const task = await Task.findById(req.params.id).populate('listId', 'title');
//         if (!task) return res.status(404).json({ message: 'Task not found' });
//         res.json(task);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// Create a new task
router.post('/', async (req, res) => {
    const { title, description, listId, completed } = req.body;
    const task = new Task({ title, description, listId, completed });
    try {
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a task
router.patch('/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
