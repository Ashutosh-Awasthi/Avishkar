const router = require('express').Router()
const axios = require('axios') 
const isAuth = require('../middleware/isAuth')
const Item = require('../models/Item')
const User = require('../models/User')

const url = 'https://api.edamam.com/api/food-database/v2/parser?app_id=3d6626db&app_key=14e482a377e11d78eef54ec7109efcbc&ingr=2%20piece%20roti&nutrition-type=logging'

// router.get('/',(req,res)=>{
//     axios.get(`https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.app_id}&app_key=${process.env.app_key}&ingr=${req.query.q}&nutrition-type=logging`)
//     .then(response=>{
//         res.json(response.data)
//     })
// })

router.get('/',(req,res)=>{
    axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=OCp7jWX2fx2sGB5aN82ZPsIQh0HbNuxIjkj14Nuf&query=${req.query.q}`)
    .then(response=>{
        res.json(response.data)
    })
})

router.get('/isLoggedIn',isAuth,(req,res)=>{
    res.json({message: 'logged in', result: true})
})

router.post('/dietdata',isAuth,(req,res)=>{

    let fData = req.body
    console.log(fData)
    User.findById(req.app.locals.user._id,(err, fUser)=>{
        if(!err && fUser) {
            fData.forEach(d=>{
                if(d)   fUser.plan.push(d)
            })
            fUser.save()
            res.json({result: true, message: 'Diet added successfully'})
        }else{
            console.log(err)
            res.json({result: false, message: 'Oops some error occcured'})
        }
    })
})

router.get('/dietdata',isAuth,(req, res)=>{
    User.findById(req.app.locals.user._id,(err, fUser)=>{
        if(!err && fUser){
            res.json(fUser.plan)
            console.log(fUser)
        }
        else
            res.json({result: false, message:"No such items found"})
    })
})

router.get('/clear',isAuth,(req,res)=>{
    User.findById(req.app.locals.user._id,async(err, fUser)=>{
        if(!err && fUser){
            fUser.plan = []
            await fUser.save()  
            res.json({result: true, message: "cleared"})
        }else{
            res.json({result: false, message: "Failed"})
        }
    })
})

module.exports = router