import Task from '../model/Task.js';
import TaskFile from '../model/taskFile.js';
import TaskComment from '../model/taskComment.js';

const TaskService = {
    getAllTasks: async () => {
        return await Task.find();
    },

    createTask: async ({ name, description, project_id, assigned_to, priority, status }) => {
        const task = new Task({
            name,
            description,
            project_id,
            assigned_to,
            priority,
            status
        });
        return await task.save();
    },

    getTaskById: async (taskId) => {
        return await Task.findById(taskId);
    },

    updateTask: async (taskId, { name, description, project_id, assigned_to, priority, status }) => {
        const task = await Task.findById(taskId);
        if (task) {
            task.name = name;
            task.description = description;
            task.project_id = project_id;
            task.assigned_to = assigned_to;
            task.priority = priority;
            task.status = status;
            task.updated_at = new Date();
            return await task.save();
        }
        return null;
    },

    deleteTask: async (taskId) => {
        const task = await Task.findByIdAndDelete(taskId);
        return task ? true : false;
    },

    addFileToTask: async (taskId, file_url, uploaded_by) => {
        const task = await Task.findById(taskId);
        if (!task) return null;

        const taskFile = new TaskFile({ task_id: taskId, file_url, uploaded_by });
        return await taskFile.save();
    },

    addCommentToTask: async (taskId, user_id, comment) => {
        const task = await Task.findById(taskId);
        if (!task) return null;

        const taskComment = new TaskComment({ task_id: taskId, user_id, comment });
        return await taskComment.save();
    }
};

export default TaskService;