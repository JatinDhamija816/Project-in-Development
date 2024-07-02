import express from 'express'
import { addHotel, deleteHotel, getAllHotelOfOwner, getAllHotel, getHotel, updateHotel } from '../controllers/hotelController.js'
import upload from '../middleware/hotelImage.js'
const router = express.Router()

router.post('/addHotel/:token', upload.single('image'), addHotel)
router.get('/getHotel/:hotelId/:token', getHotel)
router.patch('/updateHotel/:hotelId/:token', updateHotel)
router.delete('/deleteHotel/:hotelId/:token', deleteHotel)
router.get('/getAllHotel/:token', getAllHotelOfOwner)
router.get('/getAllHotel', getAllHotel)

export default router