// require('dotenv').config()
const dotenv = require('dotenv').config()
const port =  process.env.PORT || 8000 //either this port or this

const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.json())  //allows us to use middle ware

app.use('/api/goals', require('./routes/goalRoutes'))

app.listen(port, () => console.log(`Server Started. Listening on port ${port}`))
// app.listen(process.env.PORT, () => console.log('Server Started. Listening on port...'))
