import express from 'express';
import TaskService from '../Controllers/taskController.js';
import authenticateJWT from '../middleware/auth.js';

const router = express.Router();

// List all tasks
router.get('/', authenticateJWT, async (req, res) => {
    const tasks = await TaskService.getAllTasks();
    res.json(tasks);
});

// Create a new task
router.post('/', authenticateJWT, async (req, res) => {
    const { name, description, project_id, assigned_to, priority, status } = req.body;
    const task = await TaskService.createTask({ name, description, project_id, assigned_to, priority, status });
    res.json(task);
});

// Get a specific task by ID
router.get('/:taskId', authenticateJWT, async (req, res) => {
    const task = await TaskService.getTaskById(req.params.taskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
});

// Update a task
router.put('/:taskId', authenticateJWT, async (req, res) => {
    const { name, description, project_id, assigned_to, priority, status } = req.body;
    const updatedTask = await TaskService.updateTask(req.params.taskId, { name, description, project_id, assigned_to, priority, status });
    if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
});

// Delete a task
router.delete('/:taskId', authenticateJWT, async (req, res) => {
    const result = await TaskService.deleteTask(req.params.taskId);
    if (!result) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.status(204).end();
});

// Add a file to a task
router.post('/:taskId/files', authenticateJWT, async (req, res) => {
    const { file_url } = req.body;
    const file = await TaskService.addFileToTask(req.params.taskId, file_url, req.params.uploaded_by);
    if (!file) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(file);
});

// Add a comment to a task
router.post('/:taskId/comments', authenticateJWT, async (req, res) => {
    const { user_id, content } = req.body;
    const taskComment = await TaskService.addCommentToTask(req.params.taskId, user_id, content);
    if (!taskComment) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(taskComment);
});

export default router;
