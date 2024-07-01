import app from "./app.js"
import ConnectDB from './database/db.js'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 5000

ConnectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server Start at http://localhost:${port}`)
        })
    })
    .catch((err) => {
        console.error('Server not Start ', err)
    })