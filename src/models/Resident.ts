import mongoose from 'mongoose';

const residentSchema = new mongoose.Schema({
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
    address: {
        type: String,
        required: true,
        trim: true
    },
    flatNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    complaints: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Complaint'
    }
}, {timestamps: true})

const Resident = mongoose.models.Resident || mongoose.model('Resident', residentSchema);

export default Resident;