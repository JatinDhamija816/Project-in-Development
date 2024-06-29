import express from 'express'
import cors from 'cors'
import adminRoute from './routes/adminRoute.js'
import ownerRoute from './routes/ownerRoute.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/owner', ownerRoute)

export default app