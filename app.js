require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const Item = require('./models/Item')
const methodOverride = require('method-override')  
const session = require('express-session')
const flash = require('connect-flash')
const feed = require('./feed') 

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
// const items = require('./demoData')
// Item.collection.drop().then(()=>{
//     items.forEach(item=>{
//         Item.create(item)
//     })    
// })
feed()

//other options
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000 }
}))
app.use(cors())
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(flash())


//including the routes
const authRoutes = require('./routes/auth')
const itemRoutes = require('./routes/item')
const userRoutes = require('./routes/user')
const nutritionApiRoutes = require('./routes/nutritionApi')

app.use(authRoutes)
app.use('/item',itemRoutes)
app.use('/user',userRoutes)
app.use('/nutrition',nutritionApiRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`running on port ${process.env.PORT}`)
})