import express from "express";
import { addMember, removeMember, getMembers } from "../Controllers/projectMemberController.js";
import authenticateJWT from '../middleware/auth.js'
const router = express.Router();




// Add a member to a project
router.post('/:projectId/members', authenticateJWT, addMember);

// Remove a member from a project
router.delete('/:projectId/members', authenticateJWT, removeMember);

// Get all members of a project
router.get('/:projectId/members', authenticateJWT, getMembers);

export default router;