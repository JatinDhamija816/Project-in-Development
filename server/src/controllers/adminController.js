import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import Cuisine from '../models/cuisine.js'

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all details'
            })
        }
        if (email === 'admin@gmail.com' && password === 'admin') {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
            return res.status(200).json({
                success: true,
                message: 'Login successful',
                token
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }
    } catch (error) {
        console.error('Error in Admin login Controller:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

export const addCuisine = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Invalid input',
                errors: errors.array()
            });
        }

        const { name } = req.body;

        const existingCuisine = await Cuisine.findOne({ name });
        if (existingCuisine) {
            return res.status(409).json({
                success: false,
                message: 'Cuisine already exists'
            });
        }

        const cuisine = new Cuisine({ name });
        await cuisine.save();

        return res.status(201).json({
            success: true,
            message: 'Cuisine added successfully',
            cuisine
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'Duplicate key error: Cuisine already exists',
                error: error.message
            });
        }
        console.error('Error in addCuisine Controller:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

export const getCuisine = async (req, res) => {
    try {
        const cuisine = await Cuisine.find()
        return res.status(200).json({
            success: true,
            message: 'All Cuisine',
            cuisine
        });
    } catch (error) {
        console.error('Error in getCuisine Controller:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};