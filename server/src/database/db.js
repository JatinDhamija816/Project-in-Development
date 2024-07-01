import mongoose from 'mongoose'

export default async function ConnectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('DB Connected')
    } catch (error) {
        console.error('Error in DB Connection', error)
    }
}