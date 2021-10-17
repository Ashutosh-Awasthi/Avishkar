const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Item = require('../models/Item')
const bcrypt = require('bcrypt')
const isAuth = require('../middleware/isAuth')

router.get('/login',(req,res)=>{
    res.render('./auth/login')
})

router.get('/',(req,res)=>{
    res.send('Home')
})

router.get('/logout',(req,res)=>{
    res.cookie('ACCESS_TOKEN','',{
        maxAge: 1
    })
    res.redirect('/')
})

router.post('/login',(req,res)=>{
    const {email,password} = req.body;

    User.findOne({email},async(err,fUser)=>{

        if(!err && fUser && await bcrypt.compare(password,fUser.password)){
            const token = await jwt.sign({_id:fUser._id},process.env.JWT_SECRET)
            res.cookie("ACCESS_TOKEN",token,{
                httpOnly: true
            });
            res.json({email: fUser.email})
        }else{
            res.json(false);
        }
    })
})

router.post('/register',async(req,res)=>{
    const hash = await bcrypt.hash(req.body.password,10)
    if(!req.body.fname || !req.body.lname || !req.body.height || !req.body.weight)
        res.json({message: 'feilds are required',result: false})
    else{
            const UserData = {
            password: hash,
            email: req.body.email,
            username: req.body.fname + ' ' + req.body.lname,
            physique: {
                height: req.body.height,
                weight: req.body.weight,
                bmi: req.body.weight/(req.body.height*req.body.height*0.3048*0.3048),
                age: req.body.age
            }
        }

        User.create(UserData,async (err,nUser)=>{
            if(!err){
                console.log(nUser)
                const token = await jwt.sign({_id:nUser._id},process.env.JWT_SECRET)
                res.cookie("ACCESS_TOKEN",token,{
                    httpOnly: true
                });
                res.json(nUser)
            }else{
                console.log(err)
                res.json(false)
            }
        })
    }
})

router.get('/secret',isAuth,(req,res)=>{
    res.json(req.app.locals.user)
})

module.exports = router