import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    project_id:{
        type:String,
        required:true,
    },
    assigned_to:{
        type:String,
        required:true,
    },
    priority:{
        type:String,
    },
    status: {
        type: String,
        default: 'pending', // Default task status
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
});

const Task = mongoose.model("Task", taskSchema);

export default Task;