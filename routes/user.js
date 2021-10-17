const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Item = require('../models/Item')
const bcrypt = require('bcrypt')
const isAuth = require('../middleware/isAuth')

router.get('/',isAuth,(req,res)=>{
    res.render('./user/main',{data: req.app.locals.user, component: 'profile'})
})

router.get('/bmi',isAuth,(req,res)=>{
    res.render('./user/main',{data: req.app.locals.user, component: 'bmi'})
})

router.get('/diet',isAuth,(req,res)=>{
    res.render('./user/main',{data: req.app.locals.user, component: 'diet'})
})

//updating user
router.get('/:id/update',isAuth,(req,res)=>{
    res.render('./user/main',{data: req.app.locals.user, component: 'update'})
})

router.post('/:id',isAuth,(req,res)=>{
    User.findById(req.params.id,(err,fUser)=>{
        if(!err && fUser){
            fUser.username = req.body.username
            fUser.physique.height = req.body.height
            fUser.physique.weight = req.body.weight
            fUser.physique.age = req.body.age
            fUser.physique.bmi = req.body.weight/(req.body.height*req.body.height*0.3048*0.3048)
            fUser.save()
            res.redirect('/user')
        }else
            res.json({message: 'update failed', result: false})
    })
})

module.exports = router