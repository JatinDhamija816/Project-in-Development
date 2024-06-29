import { body } from 'express-validator';

export const validateOwner = () => {
    return [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('contactNumber').isMobilePhone().withMessage('Valid contact number is required'),
        body('password')
            .isLength({ min: 8, max: 20 }).withMessage('Password must be between 8 and 20 characters')
            .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
            .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
            .matches(/\d/).withMessage('Password must contain at least one number')
    ]
}
