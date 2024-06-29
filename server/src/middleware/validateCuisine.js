import { check } from 'express-validator';

export const validateCuisine = [
    check('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ min: 2 })
        .withMessage('Name should be at least 2 characters long'),
];