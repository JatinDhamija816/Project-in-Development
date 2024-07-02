import express from 'express'
import upload from '../middleware/hotelImage.js'
import { addFood, deleteFood, getAllFood, getAllFoodByHotel, getFood, updateFood } from '../controllers/foodController.js'
const router = express.Router()

router.post('/addFood/:hotelId/:token', upload.single('image'), addFood)
router.get('/getFood/:foodId', getFood)
router.patch('/updateFood/:foodId/:hotelId/:token', updateFood)
router.delete('/deleteFood/:foodId/:hotelId/:token', deleteFood)
router.get('/getAllFoodByHotel/:hotelId', getAllFoodByHotel)
router.get('/getAllFood', getAllFood)

export default router