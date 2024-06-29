import express from 'express'
import { login, register, verifyEmail, logout, passwordResetEmail, verifyPasswordToken, changePassword } from '../controllers/ownerController.js'
import { validateOwner } from '../middleware/validateOwner.js'
import { validatePassword } from '../middleware/validatePassword.js'

const router = express.Router()

router.post('/register', validateOwner(), register)
router.get('/verifyEmail/:token', verifyEmail)
router.post('/login', login)
router.post('/logout', logout)
router.post('/passwordResetEmail', passwordResetEmail)
router.get('/verifyPassword/:token', verifyPasswordToken)
router.put('/changePassword/:token', validatePassword(), changePassword)

export default router