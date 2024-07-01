import mongoose from 'mongoose'

const operationalHoursSchema = new mongoose.Schema({
    monday: {
        type: String,
        default: 'closed',
        validate: {
            validator: function (v) {
                return /^(0[1-9]|1[0-2]):([0-5][0-9])[ap]m : (0[1-9]|1[0-2]):([0-5][0-9])[ap]m$/.test(v)
            },
            message: props => `${props.value} is not a valid time format!`
        }
    },
    tuesday: {
        type: String,
        default: 'closed',
        validate: {
            validator: function (v) {
                return /^(0[1-9]|1[0-2]):([0-5][0-9])[ap]m : (0[1-9]|1[0-2]):([0-5][0-9])[ap]m$/.test(v)
            },
            message: props => `${props.value} is not a valid time format!`
        }
    },
    wednesday: {
        type: String,
        default: 'closed',
        validate: {
            validator: function (v) {
                return /^(0[1-9]|1[0-2]):([0-5][0-9])[ap]m : (0[1-9]|1[0-2]):([0-5][0-9])[ap]m$/.test(v)
            },
            message: props => `${props.value} is not a valid time format!`
        }
    },
    thursday: {
        type: String,
        default: 'closed',
        validate: {
            validator: function (v) {
                return /^(0[1-9]|1[0-2]):([0-5][0-9])[ap]m : (0[1-9]|1[0-2]):([0-5][0-9])[ap]m$/.test(v)
            },
            message: props => `${props.value} is not a valid time format!`
        }
    },
    friday: {
        type: String,
        default: 'closed',
        validate: {
            validator: function (v) {
                return /^(0[1-9]|1[0-2]):([0-5][0-9])[ap]m : (0[1-9]|1[0-2]):([0-5][0-9])[ap]m$/.test(v)
            },
            message: props => `${props.value} is not a valid time format!`
        }
    },
    saturday: {
        type: String,
        default: 'closed',
        validate: {
            validator: function (v) {
                return /^(0[1-9]|1[0-2]):([0-5][0-9])[ap]m : (0[1-9]|1[0-2]):([0-5][0-9])[ap]m$/.test(v)
            },
            message: props => `${props.value} is not a valid time format!`
        }
    },
    sunday: {
        type: String,
        default: 'closed',
        validate: {
            validator: function (v) {
                return /^(0[1-9]|1[0-2]):([0-5][0-9])[ap]m : (0[1-9]|1[0-2]):([0-5][0-9])[ap]m$/.test(v)
            },
            message: props => `${props.value} is not a valid time format!`
        }
    }
}, { _id: false })

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
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    contactNumber: {
        type: String,
        required: true,
    },
    hotelType: {
        type: String,
        enum: ['delivery', 'dine-in', 'both'],
        required: true
    },
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    }],
    operationalHours: {
        type: operationalHoursSchema,
        default: () => ({})
    },
    image: {
        type: String,
        default: 'https://blog.ipleaders.in/wp-content/uploads/2019/11/foodmitho.jpg'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: true
    }
}, { timestamps: true })

const Hotel = mongoose.model('Hotel', hotelSchema)

export default Hotel 
