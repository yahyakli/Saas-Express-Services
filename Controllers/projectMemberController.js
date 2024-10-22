import Project from "../model/Project.js";
import axios from "axios";


// Add a member to a project
export const addMember = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const userId = req.body.userId;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Query PostgreSQL to verify if the user exists
        const userResponse = await axios.get(`http://localhost:9090/api/v1/auth/user/${userId}`);
        if (!userResponse.data) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is already a member
        const isMember = project.members.some(member => member.id === userResponse.data.id);
        if (isMember) {
            return res.status(400).json({ message: 'User is already a member of this project' });
        }

        project.members.push(userResponse.data);
        await project.save();

        return res.status(200).json({ message: 'User added to project', project });
    } catch (error) {
        return res.status(500).json({ message: 'Error adding member to project', error });
    }
};

// Remove a member from a project
export const removeMember = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const userId = req.body.userId;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Query PostgreSQL to verify if the user exists
        const userResponse = await axios.get(`http://localhost:9090/api/v1/auth/user/${userId}`);
        if (!userResponse.data) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is not a member in project
        const isMember = project.members.some(member => member.id === userResponse.data.id); // Adjust this based on your user object structure
        if (!isMember) {
            return res.status(400).json({ message: 'User is not a member in this project' });
        }

        project.members = project.members.filter(member => member.id !== userResponse.data.id);

        await project.save();
        return res.status(200).json({ message: 'User removed from project', project });
    } catch (error) {
        return res.status(500).json({ message: 'Error removing member from project', error });
    }
};

// Get all members of a project
export const getMembers = async (req, res) => {
    try {
        const projectId = req.params.projectId;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        return res.status(200).json({ members: project.members });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching project members', error });
    }
};