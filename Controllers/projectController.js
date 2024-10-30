import Project from "../model/Project.js";
import axios from "axios";

// Create a new project
export const createProject = async (req, res) => {
    try {
        const { name, description, ownerId, teamId, startDate, endDate, status } = req.body;
        const token = req.headers.authorization?.split(' ')[1];

        const userResponse = await axios.get(`http://localhost:9090/api/v1/auth/user/${ownerId}`);
        if (!userResponse.data) {
            return res.status(404).json({ message: 'User not found' });
        }

        const teamResponse = await axios.get(
            `http://localhost:9090/api/v1/teams/${teamId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        if (!teamResponse.data) {
            return res.status(404).json({ message: 'Team not found' });
        }

        const newProject = new Project({
            name,
            description,
            ownerId,
            teamId,
            startDate,
            endDate,
            status,
        });

        const savedProject = await newProject.save();
        return res.status(201).json(savedProject);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating project', error });
    }
};

// Get all projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching projects', error });
    }
};

// Get a project by ID
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching project', error });
    }
};

// Update a project
export const updateProject = async (req, res) => {
    try {
        const { name, description, ownerId, teamId, startDate, endDate, status } = req.body;
        const token = req.headers.authorization?.split(' ')[1];

        const userResponse = await axios.get(`http://localhost:9090/api/v1/auth/user/${ownerId}`);
        if (!userResponse.data) {
            return res.status(404).json({ message: 'User not found' });
        }

        const teamResponse = await axios.get(
            `http://localhost:9090/api/v1/teams/${ownerId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        if (!teamResponse.data) {
            return res.status(404).json({ message: 'Team not found' });
        }

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { name, description, ownerId, teamId, startDate, endDate, status },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        return res.status(200).json(updatedProject);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating project', error });
    }
};

// Delete a project
export const deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        return res.status(204).json({ message: 'Project deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting project', error });
    }
};
