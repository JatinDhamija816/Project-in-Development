import nodemailer from 'nodemailer'
import Owner from '../models/owner.js'

const sendVerifyEmail = async (user, token) => {
    try {
        const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASSWORD, OWNER_URL } = process.env

        const transporter = nodemailer.createTransport({
            service: EMAIL_SERVICE,
            host: 'smtp.gmail.com',
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASSWORD,
            },
        })

        const url = `${OWNER_URL}/verifyEmail/${token}`
        const tokenExpiry = Date.now() + 3600000  // 1 hour

        await Owner.findByIdAndUpdate(user._id, {
            verifyToken: token,
            verifyTokenExpiry: tokenExpiry,
        })

        const mailOptions = {
            from: EMAIL_USER,
            to: user.email,
            subject: 'Verify Your Email',
            html: `Click <a href="${url}">here</a> to verify your email. <br> Or click this link: <a href="${url}">${url}</a>.`,
        }

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse
    } catch (error) {
        throw new Error(`Failed to send Email: ${error.message}`)
    }
}

export default sendVerifyEmail 