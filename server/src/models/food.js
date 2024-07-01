import mongoose from 'mongoose'

const foodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    foodPhoto: {
        type: String,
        default: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8fA%3D%3D'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    }
})

const Food = mongoose.model('Food', foodSchema)

export default Food 
