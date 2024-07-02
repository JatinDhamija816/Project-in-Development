import jwt from 'jsonwebtoken'
import Owner from '../models/owner.js'
import Hotel from '../models/hotel.js'

export const addHotel = async (req, res) => {
    try {
        const { token } = req.params

        let ownerId;
        try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            ownerId = id;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        const owner = await Owner.findById(ownerId);
        if (!owner) {
            return res.status(404).json({
                success: false,
                message: 'Owner not found'
            });
        }

        const { hotelName, address, city, state, contactNumber, hotelType, operationalHours } = req.body

        if (!hotelName || !address || !city || !state || !contactNumber || !hotelType || !operationalHours) {
            return res.status(400).json({
                success: false,
                message: "Please provide all details"
            });
        }

        const newHotel = new Hotel({
            hotelName, address, city, state, contactNumber, hotelType, operationalHours, owner: owner._id
        })

        await newHotel.save()

        owner.hotels.push(newHotel)
        await owner.save()

        return res.status(201).json({
            success: true,
            message: 'New Hotel Created',
            newHotel,
        });
    } catch (error) {
        console.error('Error in addHotel Controller', error)
        return res.status(500).json({
            success: false,
            message: 'Error in add Hotel Controller',
            error: error.message
        })
    }
}

export const getHotel = async (req, res) => {
    try {
        const { hotelId, token } = req.params

        let ownerId;
        try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            ownerId = id;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        const owner = await Owner.findById(ownerId);
        if (!owner) {
            return res.status(404).json({
                success: false,
                message: 'Owner not found'
            });
        }

        const hotel = await Hotel.findById(hotelId)
        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: 'Hotel not found',
            })
        }

        if (!owner.hotels.includes(hotelId)) {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to access this hotel',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Hotel retrieved successfully',
            hotel
        })

    } catch (error) {
        console.error('Error in getHotel Controller', error)
        return res.status(500).json({
            success: false,
            message: 'Error in getHotel Controller',
            error: error.message
        })
    }
}

export const updateHotel = async (req, res) => {
    try {
        const { hotelId, token } = req.params

        let ownerId;
        try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            ownerId = id;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        const owner = await Owner.findById(ownerId);
        if (!owner) {
            return res.status(404).json({
                success: false,
                message: 'Owner not found'
            });
        }

        const hotel = await Hotel.findById(hotelId)
        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: 'Hotel not found',
            })
        }

        if (!owner.hotels.includes(hotelId)) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized access to hotel'
            })
        }
        const { hotelName, address, city, state, contactNumber, hotelType, operationalHours } = req.body

        const updateFields = {}

        if (hotelName) updateFields.hotelName = hotelName
        if (address) updateFields.address = address
        if (city) updateFields.city = city
        if (state) updateFields.state = state
        if (contactNumber) updateFields.contactNumber = contactNumber
        if (hotelType) updateFields.hotelType = hotelType
        if (operationalHours) updateFields.operationalHours = operationalHours

        const updateHotel = await Hotel.findByIdAndUpdate(hotelId, updateFields, { new: true })
        if (!updateHotel) {
            return res.status(400).json({
                success: true,
                message: 'Hotel not updated, something went wrong'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Hotel updated successfully',
            updateHotel
        })

    } catch (error) {
        console.error('Error in updateHotel controller', error);
        return res.status(500).json({
            success: false,
            message: 'Server error in updateHotel controller',
            error: error.message
        })
    }
}

export const deleteHotel = async (req, res) => {
    try {
        const { hotelId, token } = req.params

        if (!hotelId || !token) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: hotelId and token',
            });
        }

        let ownerId;
        try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            ownerId = id;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        const owner = await Owner.findById(ownerId);
        if (!owner) {
            return res.status(404).json({
                success: false,
                message: 'Owner not found'
            });
        }

        const hotel = await Hotel.findById(hotelId)
        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: 'Hotel not found',
            })
        }
        if (!owner.hotels.includes(hotelId)) {
            return res.status(403).json({
                success: false,
                message: 'Hotel not found in owner\'s list',
            })
        }

        owner.hotels = owner.hotels.filter((id) => id.toString() !== hotelId)
        await owner.save()

        const deletedHotel = await Hotel.findByIdAndDelete(hotelId)
        if (!deletedHotel) {
            return res.status(404).json({
                success: false,
                message: 'Hotel could not be deleted',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Hotel deleted successfully',
        })

    } catch (error) {
        console.error('Error in deleteHotel Controller', error)
        return res.status(500).json({
            success: false,
            message: 'Error in deleteHotel Controller',
            error: error.message
        })
    }
}

export const getAllHotelOfOwner = async (req, res) => {
    try {
        const { token } = req.params

        const { id } = jwt.verify(token, process.env.JWT_SECRET)

        const owner = await Owner.findById(id)
        if (!owner) {
            return res.status(404).json({
                success: false,
                message: 'Owner not found or invalid token',
            })
        }

        if (!owner.hotels || owner.hotels.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No hotels found for this owner',
            });
        }

        const hotels = await Promise.all(
            owner.hotels.map(hotelId => Hotel.findById(hotelId))
        );

        return res.status(200).json({
            success: true,
            message: 'Hotels retrieved successfully',
            hotels
        });
    } catch (error) {
        console.error('Error in getHotel Controller', error)
        return res.status(500).json({
            success: false,
            message: 'Error in getHotel Controller',
            error: error.message
        })
    }
}

export const getAllHotel = async (req, res) => {
    try {
        const TotalHotel = await Hotel.find()

        return res.status(200).json({
            success: true,
            message: 'Total Hotel',
            TotalHotel
        })

    } catch (error) {
        console.error('Error in getHotel Controller', error)
        return res.status(500).json({
            success: false,
            message: 'Error in getHotel Controller',
            error: error.message
        })
    }
}