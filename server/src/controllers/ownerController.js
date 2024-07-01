import Owner from "../models/owner.js"
import { validationResult } from "express-validator"
import hashPassword from "../utils/hashPassword.js"
import generateToken from "../utils/generateJWT.js"
import sendVerifyEmail from "../utils/sendVerifyEmail.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import PasswordResetEmail from "../utils/PasswordResetEmail.js"

export const register = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Invalid input',
                errors: errors.array()
            })
        }

        const { name, email, contactNumber, password } = req.body

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
            owner
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

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params
        const { id } = jwt.verify(token, process.env.JWT_SECRET)

        const owner = await Owner.findById(id)
        if (!owner) {
            return res.status(400).json({
                success: false,
                message: 'Invalid token or token has expired.'
            })
        }

        owner.isEmailVerified = true
        owner.verifyToken = undefined
        owner.verifyTokenExpiry = undefined

        await owner.save()

        return res.status(200).json({
            success: true,
            message: 'Email Verified Successfully'
        })

    } catch (error) {
        console.error('An error occurred during verification. Please try again later. ', error)
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({
                success: false,
                message: 'Token has expired. Please request a new verification email.'
            })
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid token.'
            })
        }
        return res.status(500).json({
            success: false,
            message: 'An error occurred during verification. Please try again later.',
            error: error
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false, message: 'Please fill in all details.'
            })
        }
        const owner = await Owner.findOne({ email })
        if (!owner) {
            return res.status(404).json({
                success: false, message: 'owner not found.'
            })
        }
        const isMatch = await bcrypt.compare(password, owner.password)
        if (!isMatch) {
            return res.status(401).json({
                success: false, message: 'Invalid credentials.'
            })
        }
        if (!owner.isEmailVerified) {
            return res.status(403).json({
                success: false, message: 'owner not verified. Check your email for verification.'
            })
        }

        const token = generateToken(owner)

        return res.status(200).json({
            success: true, message: 'Login successfull.',
            token
        })
    } catch (error) {
        console.error('Error in login module:', error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('token', '', {
            expires: new Date(0),
            httpOnly: true
        })

        return res.status(200).json({
            success: true,
            message: 'Logout successful'
        })
    } catch (error) {
        console.error('Error in Logout module', error)
        return res.status(500).json({
            success: false,
            message: 'Error in Logout module',
            error
        })
    }
}

export const passwordResetEmail = async (req, res) => {
    try {
        const { email } = req.body

        const owner = await Owner.findOne({ email })
        if (!owner) {
            return res.status(404).json({
                succes: false,
                message: 'owner not found',
            })
        }

        const token = generateToken(owner)
        await PasswordResetEmail(owner, token)

        return res.status(200).json({
            succes: true,
            message: 'Password reset Email sent ',
        })

    } catch (error) {
        console.error('Error in CheckEmail Module', error)
        return res.status(400).json({
            succes: false,
            message: 'Error in checkEmail module',
            error
        })
    }
}

export const verifyPasswordToken = async (req, res) => {
    try {
        const { token } = req.params

        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        const owner = await Owner.findById(id)
        if (!owner) {
            return res.status(400).json({
                success: false,
                message: 'Invalid token or token has expired.'
            })
        }

        owner.resetPasswordToken = undefined
        owner.resetPasswordExpires = undefined
        await owner.save()

        return res.status(200).json({
            success: true,
            message: 'Email Verified Successfully',
            token
        })

    } catch (error) {
        console.error('Error in verify Password Token', error)
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({
                success: false,
                message: 'Token has expired. Please request a new verification email.'
            })
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid token.'
            })
        }
        return res.status(500).json({
            success: false,
            message: 'An error occurred during verification of Password Token. Please try again later.',
            error
        })
    }
}

export const changePassword = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Invalid input',
                errors: errors.array()
            })
        }

        const { token } = req.params
        const { newPassword, confirmPassword } = req.body

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false, message: 'New Password and Confirm Password are not match'
            })
        }
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        const owner = await Owner.findById(id)

        const hashedPassword = await hashPassword(newPassword)

        owner.password = hashedPassword
        await owner.save()

        res.cookie('verifyPassword', '', {
            expires: new Date(0),
            httpOnly: true
        })

        return res.status(200).json({
            success: true,
            message: 'Password updated successfully',
        })

    } catch (error) {
        console.error('Error in Reset Password Module', error)
        return res.status(404).json({
            success: false,
            message: 'Error in Reset Password Module',
            error
        })
    }
}