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
        if (project.members.includes(userId)) {
            return res.status(400).json({ message: 'User is already a member of this project' });
        }

        project.members.push(userId);
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
        if (!project.members.includes(userId)) {
            return res.status(400).json({ message: 'User is not a member in this project' });
        }

        project.members = project.members.filter(member => member.toString() !== userId);
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

        const usersResponse = await axios.get(`http://localhost:9090/api/v1/auth/users`);
        const allUsers = usersResponse.data; 


        const membersInfo = allUsers.filter(user => project.members.includes(user.id));

        return res.status(200).json({ members: membersInfo });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching project members', error });
    }
};