import express from 'express';
import { createProject, getAllProjects, getProjectById, updateProject, deleteProject } from '../Controllers/projectController.js';
import authenticateJWT from '../middleware/auth.js';
const router = express.Router();

// Create a new project
router.post('/', authenticateJWT, createProject);

// Get all projects
router.get('/', authenticateJWT, getAllProjects);

// Get a project by ID
router.get('/:id', authenticateJWT, getProjectById);

// Update a project by ID
router.put('/:id', authenticateJWT, updateProject);

// Delete a project by ID
router.delete('/:id', authenticateJWT, deleteProject);

export default router;
