const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Item = require('../models/Item')
const bcrypt = require('bcrypt')
const isAuth = require('../middleware/isAuth')

//get specific item
router.get('/:id',(req,res)=>{
    Item.findById(req.params.id,(err,fItem)=>{
        if(!err && fItem)
            res.json(fItem)
        else
            res.json({message: 'Item not found', result: false})
    })
})

//get all items
router.get('/',(req,res)=>{
    Item.find({},(err,data)=>{
        if(!err && data)
            res.json(data)
        else
            res.json({message: 'Items not found', result: false})
    })
})

//create item
router.post('/create',isAuth,(req,res)=>{
    const data = {
        name: req.body.name,
        image: req.body.image,
        nutrients: {},
        calorie: req.body.calorie,
        owner: req.app.locals.user._id
    } 

    Item.create(data,(err,nItem)=>{
        if(!err && nItem)
            res.json(nItem)
        else
            res.json(false)
    })
})

//delete item
router.delete('/:id/delete',isAuth,(req,res)=>{
    Item.findById(req.params.id,(err,fItem)=>{
        if(fItem && req.app.locals.user._id.equals(fItem.owner._id)){
            fItem.delete()
            res.json({message:'deletion successful', result: true})
        }
        else
            res.json({message:'deletion unsuccessful', result: false})
    })
})

//like item
router.post('/:id/like',isAuth,async (req,res)=>{
    try{
        User.findById(req.app.locals.user._id,(err,fUser)=>{
            console.log(fUser)
            if(!err && fUser){
                Item.findOne({_id: req.params.id},async (err,fItem)=>{
                    fUser.favorite.push(fItem)
                    await fUser.save()
                    res.json(true)
            })}
            else
                res.json(false)
        })
    }catch{
        res.json({message: 'failed to like', result: false})
    } 
})

module.exports = router