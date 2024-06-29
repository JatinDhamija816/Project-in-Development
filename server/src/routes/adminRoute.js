import express from 'express'
import { login, addCuisine } from '../controllers/adminController.js'
import { validateCuisine } from '../middleware/validateCuisine.js'

const router = express.Router()

router.post('/login', login)
router.post('/addCuisine', validateCuisine, addCuisine)

export default router