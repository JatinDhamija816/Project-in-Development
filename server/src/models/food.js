import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true,
        trim: true
    },
    priceFull: {
        type: Number,
        required: true
    },
    priceHalf: {
        type: Number,
    },
    foodPhoto: {
        type: String,
        default: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8fA%3D%3D'
    },
    description: {
        type: String,
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    }
});

const Food = mongoose.model('Food', foodSchema);

export default Food;
