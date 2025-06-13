import mongoose from 'mongoose';

const managerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
    managerId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {timestamps: true});

const Manager = mongoose.models.Manager || mongoose.model('Manager', managerSchema);

export default Manager;