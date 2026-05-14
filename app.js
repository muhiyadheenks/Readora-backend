const express = require('express')
const errorHandler = require('./middleware/errorMiddleware')
const userRoutes = require('./routes/userRouter')
const bookRoutes = require('./routes/bookRouter')
const cors = require('cors')
const categoryRoutes = require('./routes/categoryRoute')
const homeRoutes = require('./routes/homeRoutes')
const cartRoutes = require('./routes/cartRoutes')


const app = express()
app.use(cors({
    origin: "http://localhost:5175",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.json())



app.use("/api", bookRoutes)
app.use("/api/users", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", homeRoutes)
app.use("/api", cartRoutes)


app.use(errorHandler)
module.exports = app