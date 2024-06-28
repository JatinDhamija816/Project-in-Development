import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    passwrod: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Admin = mongoose.model('admin', adminSchema)

export default Admin