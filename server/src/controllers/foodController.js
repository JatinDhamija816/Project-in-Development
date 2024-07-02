import jwt from "jsonwebtoken"
import Owner from "../models/owner.js"
import Hotel from "../models/hotel.js"
import Food from "../models/food.js"

export const addFood = async (req, res) => {
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
                message: "Hotel not found"
            })
        }

        if (!owner.hotels.includes(hotelId)) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found in owner's list"
            })
        }
        const { foodName, priceFull, priceHalf, foodPhoto, description } = req.body

        if (!foodName || !priceFull || !description) {
            return res.status(400).json({
                success: false,
                message: "Please Provide all details"
            })
        }

        const newFood = new Food({
            foodName, priceFull, priceHalf, foodPhoto, description, hotel: hotel._id
        })

        await newFood.save()

        hotel.dishes.push(newFood)
        await hotel.save()

        return res.status(200).json({
            success: true,
            message: 'New Food Added',
            newFood,
        })
    } catch (error) {
        console.error('Error in addFood Controller', error)
        return res.status(500).json({
            success: false,
            message: 'Error in addFood Controller',
            error: error.message
        })
    }

}

export const getFood = async (req, res) => {
    try {
        const { foodId } = req.params

        const food = await Food.findById(foodId)
        if (!food) {
            return res.status(404).json({
                success: false,
                message: 'Food not found',
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Food retrieved successfully',
            data: food
        });
    } catch (error) {
        console.error('Error in getFood Controller', error)
        return res.status(500).json({
            success: false,
            message: 'Error in getFood Controller',
            error: error.message
        })
    }
}

export const updateFood = async (req, res) => {
    try {
        const { foodId, hotelId, token } = req.params

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

        const findHotel = await Hotel.findById(hotelId)
        if (!findHotel) {
            return res.status(404).json({
                success: false,
                message: 'Hotel not found',
            })
        }

        if (!owner.hotels.includes(hotelId)) {
            return res.status(404).json({
                success: false,
                message: 'Hotel not found in owner\'s list',
            })
        }
        const findFood = await Food.findById(foodId)
        if (!findFood) {
            return res.status(404).json({
                success: false,
                message: 'Food not found',
            })
        }
        const { foodName, priceFull, priceHalf, foodPhoto, description } = req.body
        const updateFields = {}

        if (foodName) updateFields.foodName = foodName
        if (priceFull) updateFields.priceFull = priceFull
        if (priceHalf) updateFields.priceHalf = priceHalf
        if (foodPhoto) updateFields.foodPhoto = foodPhoto
        if (description) updateFields.description = description

        const updatedFood = await Food.findByIdAndUpdate(foodId, updateFields, { new: true })
        if (!updatedFood) {
            return res.status(400).json({
                success: true,
                message: 'Food not updated, something went wrong'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Food updated successfully',
            updatedFood,
        });
    } catch (error) {
        console.error('Error in update Food Controller', error)
        return res.status(500).json({
            success: false,
            message: 'Error in update Food Controller',
            error: error.message
        })
    }
}

export const deleteFood = async (req, res) => {
    try {
        const { foodId, hotelId, token } = req.params
        const { id } = jwt.verify(token, process.env.JWT_SECRET)

        const owner = await Owner.findById(id)
        if (!owner) {
            return res.status(404).json({
                success: false,
                message: 'Owner not found or invalid token',
            })
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
                message: 'Access denied: Hotel not found in owner\'s list',
            })
        }
        const food = await Food.findById(foodId)
        if (!food) {
            return res.status(404).json({
                success: false,
                message: 'Food not found',
            })
        }
        hotel.dishes = hotel.dishes.filter((id) => id.toString() !== foodId)
        await hotel.save()

        const deletedFood = await Food.findByIdAndDelete(foodId)
        if (!deletedFood) {
            return res.status(404).json({
                success: false,
                message: 'Food not found',
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Food deleted successfully',
        })
    } catch (error) {
        console.error('Error in deleteFood Controller', error)
        return res.status(500).json({
            success: false,
            message: 'Error in deleteFood Controller',
            error: error.message
        })
    }
}

export const getAllFoodByHotel = async (req, res) => {
    try {
        const { hotelId } = req.params
        const hotel = await Hotel.findById(hotelId)

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: 'Hotel not found',
            })
        }

        if (hotel.dishes.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No food found',
            });
        }

        const allFood = await Promise.all(hotel.dishes.map(dishId => Food.findById(dishId)));

        return res.status(200).json({
            success: true,
            message: 'All food',
            allFood
        });

    } catch (error) {
        console.error('Error in getAllFoodByHotel Controller', error)
        return res.status(500).json({
            success: false,
            message: 'Error in getAllFoodByHotel Controller',
            error: error.message
        })
    }
}

export const getAllFood = async (req, res) => {
    try {
        const allFood = await Food.find()

        return res.status(200).json({
            success: true,
            message: 'gelAllFood',
            allFood
        })
    } catch (error) {
        console.error('Error in getAllFood Controller', error);
        return res.status(500).json({
            success: false,
            message: 'Error in getAllFood Controller',
            error: error.message
        });
    }
}