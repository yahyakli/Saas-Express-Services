import mongoose from 'mongoose';
const { Schema } = mongoose;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String, // Store the owner UUID from PostgreSQL
        required: true,
    },
    teamId: {
        type: String, // Store the team UUID from PostgreSQL
        required: true,
    },
    members: [{
        type: Object,
    }],
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
        default: 'PENDING',
    },
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);
export default Project;