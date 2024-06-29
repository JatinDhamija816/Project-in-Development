import express from 'express'
import { register } from '../controllers/ownerController.js'
import { validateOwner } from '../middleware/validateOwner.js'

const router = express.Router()

router.post('/register', validateOwner(), register)

export default router