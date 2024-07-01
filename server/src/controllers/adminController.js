import jwt from 'jsonwebtoken'

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
            })
        } else {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            })
        }
    } catch (error) {
        console.error('Error in Admin login Controller:', error)
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
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