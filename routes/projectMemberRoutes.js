import express from "express";
import { addMember, removeMember, getMembers } from "../Controllers/projectMemberController.js";
const router = express.Router();




// Add a member to a project
router.post('/:projectId/members', addMember);

// Remove a member from a project
router.delete('/:projectId/members', removeMember);

// Get all members of a project
router.get('/:projectId/members', getMembers);

export default router;