import mongoose from 'mongoose'

const ownerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    contactNumber: {
        type: Number,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    hotels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    }],
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, { timestamps: true })

const Owner = mongoose.model('owner', ownerSchema)

export default Owner 