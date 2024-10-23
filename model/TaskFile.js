import mongoose from 'mongoose';

const taskFileSchema = new mongoose.Schema({
    task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    file_url: {
        type: String,
        required: true,
    },
    uploaded_by:{
        type:String,
    },
    uploaded_at: {
        type: Date,
        default: Date.now,
    }
});

const TaskFile = mongoose.model('TaskFile', taskFileSchema);
export default TaskFile;