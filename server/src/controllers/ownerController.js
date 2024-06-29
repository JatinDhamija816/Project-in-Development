import Owner from "../models/owner.js"
import { validationResult } from "express-validator"
import hashPassword from "../utils/hashPassword.js"
import generateToken from "../utils/generateJWT.js"
import sendVerifyEmail from "../utils/sendVerifyEmail.js"

export const register = async (req, res) => {
    try {
        const { name, email, contactNumber, password } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Invalid input',
                errors: errors.array()
            });
        }

        const existingEmail = await Owner.findOne({ email })
        if (existingEmail) {
            return res.status(403).json({
                success: false,
                message: 'Owner with this email already exists'
            })
        }

        const hashedPassword = await hashPassword(password)

        const owner = new Owner({ name, email, contactNumber, password: hashedPassword })
        await owner.save()

        const token = generateToken(owner)
        await sendVerifyEmail(owner, token)

        return res.status(201).json({
            success: true,
            message: 'Owner Registered Successfully. Check Your Email for Verification link ',
            owner,
            token
        })


    } catch (error) {
        console.error('Error in owner register Controller', error)
        return res.status(500).json({
            success: false,
            message: 'Error in owner register Controller',
            error: error.message
        })
    }
}