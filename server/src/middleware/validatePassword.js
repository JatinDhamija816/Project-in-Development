import { body } from 'express-validator'

export const validatePassword = () => {
    return [
        body('newPassword')
            .isLength({ min: 8, max: 20 }).withMessage('Password must be between 8 and 20 characters')
            .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
            .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
            .matches(/\d/).withMessage('Password must contain at least one number'),
        body('confirmPassword')
            .isLength({ min: 8, max: 20 }).withMessage('Password must be between 8 and 20 characters')
            .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
            .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
            .matches(/\d/).withMessage('Password must contain at least one number'),
    ]
}
