const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')

router.get('/',(req,res)=>{
    res.send('hello')
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
        if(!err && await bcrypt.compare(password,fUser.password)){
            const token = await jwt.sign({_id:fUser._id},process.env.JWT_SECRET)
            res.cookie("ACCESS_TOKEN",token,{
                httpOnly: true
            });
            res.json({email: fUser.email})
        }else{
            console.log(err)
            res.json(false);
        }
    })
})

router.post('/register',async(req,res)=>{
    const hash = await bcrypt.hash(req.body.password,10)
    const UserData = {
        password: hash,
        email: req.body.email
    }
    User.create(UserData,async (err,nUser)=>{
        if(!err){
            console.log(nUser)
            const token = await jwt.sign({_id:nUser._id},process.env.JWT_SECRET)
            res.cookie("ACCESS_TOKEN",token,{
                httpOnly: true
            });
            res.json({email: nUser.email})
        }else{
            console.log(err)
            res.json(false)
        }
    })
})

module.exports = router