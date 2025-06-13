import mongoose from 'mongoose'

const workerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    workerId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    assignedComplaints: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Complaint'
    },
    tokens: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 4.0
    },
    role: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const Worker = mongoose.models.Worker || mongoose.model('Worker', workerSchema);

export default Worker;