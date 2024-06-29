import mongoose from 'mongoose'

const hotelSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city:{
        type: String,
        required: true,
        trim: true
    },
    state:{
        type: String,
        required: true,
        trim: true
    },
    hotelContactNumber: {
        type: String,
        required: true,
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
        of: {
            type: String,
            default: 'Closed'
        },
        required: true,
        validate: {
            validator: function (v) {
                const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                const isValidDay = Object.keys(v).every(day => validDays.includes(day));
                if (!isValidDay) return false;
                ///^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/   this is 24hr format regExp
                return Object.values(v).every(time => time === 'Closed' || /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/.test(time));
            },
            message: props => `Operational hours must include valid days of the week`
        },
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: true
    }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;
