require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const Item = require('./models/Item')  

//database connection
const DB_options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}  
mongoose.connect(process.env.MONGODBURI,DB_options)
mongoose.connection.on('connected',()=>{
    console.log('Database Connected')
})

//adding demoData to the Dbase
const items = require('./demoData')
Item.collection.drop().then(()=>{
    items.forEach(item=>{
        Item.create(item)
    })    
})

//other options
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors())
app.set('view engine','ejs')
app.use(express.static('public'))


//including the routes
const authRoutes = require('./routes/auth')
const itemRoutes = require('./routes/item')

app.use(authRoutes)
app.use('/item',itemRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`running on port ${process.env.PORT}`)
})