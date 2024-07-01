import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinaryConfig.js'

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'hotelImage',
        allowed_formats: ['jpg', 'png', 'jpeg']
    },
})

const upload = multer({ storage: storage })

export default upload