import express from 'express';
import TaskService from '../Controllers/taskController.js';
import authenticateJWT from '../middleware/auth.js';
import axios from 'axios';

const router = express.Router();

// List all tasks
router.get('/', authenticateJWT, async (req, res) => {
    const tasks = await TaskService.getAllTasks();
    res.json(tasks);
});

// Create a new task
router.post('/', authenticateJWT, async (req, res) => {
    try{
        const { name, description, project_id, assigned_to, priority, status } = req.body;
    
        const userResponse = await axios.get(`http://localhost:9090/api/v1/auth/user/${assigned_to}`);
        if (!userResponse.data) {
            return res.status(404).json({ message: 'User not found' });
        }
        const task = await TaskService.createTask({ name, description, project_id, assigned_to, priority, status });
        res.json(task);
    }catch(err){
        return res.status(500).json({ message: 'Error Creating task', err });
    }
});

// Get a specific task by ID
router.get('/:taskId', authenticateJWT, async (req, res) => {
    try{
        const task = await TaskService.getTaskById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    }catch(err){
        return res.status(500).json({ message: 'Error Founding task', err });
    }
});

// Update a task
router.put('/:taskId', authenticateJWT, async (req, res) => {
    try{
        const { name, description, project_id, assigned_to, priority, status } = req.body;
        
        const userResponse = await axios.get(`http://localhost:9090/api/v1/auth/user/${assigned_to}`);
        if (!userResponse.data) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedTask = await TaskService.updateTask(req.params.taskId, { name, description, project_id, assigned_to, priority, status });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    }catch(err){
        return res.status(500).json({ message: 'Error Updating task', err });
    }
});

// Delete a task
router.delete('/:taskId', authenticateJWT, async (req, res) => {
    try{
        const result = await TaskService.deleteTask(req.params.taskId);
        if (!result) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(204).end();
    }catch(err){
        return res.status(500).json({ message: 'Error Deleting task', err });
    }
});

export default router;
