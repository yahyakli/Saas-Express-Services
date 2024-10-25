import mongoose from 'mongoose';

const taskCommentSchema = new mongoose.Schema({
    task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    user_id: {
        type: String, // Assuming user ID is a string
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    commented_at: {
        type: Date,
        default: Date.now,
    }
});

const TaskComment = mongoose.model('TaskComment', taskCommentSchema);
export default TaskComment;
