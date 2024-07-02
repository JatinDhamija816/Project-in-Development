import express from 'express'
import cors from 'cors'
import adminRoute from './routes/adminRoute.js'
import ownerRoute from './routes/ownerRoute.js'
import hotelRoute from './routes/hotelRoute.js'
import foodRoute from './routes/foodRoute.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/owner', ownerRoute)
app.use('/api/v1/hotel', hotelRoute)
app.use('/api/v1/food', foodRoute)

export default app