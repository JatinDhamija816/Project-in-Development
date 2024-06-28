import mongoose from 'mongoose'

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true
    },
    ownerContactNumber: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    hotelType: {
        type: String,
        enum: ['delivery', 'dine-in', 'both'],
        required: true
    },
    cuisines: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cuisine'
    }],
    operationalHours: {
        type: Map,
        of: String,
        required: true,
    },
    workingDays: {
        type: [String],
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
    }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;
