require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')  

//database connection
const DB_options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}  
mongoose.connect(process.env.MONGODBURI,DB_options)
mongoose.connection.on('connected',()=>{
    console.log('Database Connected')
})

//other options
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

//including the routes
const authRoutes = require('./routes/auth')

app.use(authRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`running on port ${process.env.PORT}`)
})