// require('dotenv').config()
const dotenv = require('dotenv').config()
const colors = require('colors')
const { errorHandler} = require('./middleWare/errorMiddleware')
const connectDB = require('./config/db')
const port =  process.env.PORT || 8000 //either this port or this

connectDB()

const express = require('express')
const app = express()

app.use(express.json())  //allows us to use middle ware //body parser for raw json
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server Started. Listening on port ${port}`))
// app.listen(process.env.PORT, () => console.log('Server Started. Listening on port...'))
