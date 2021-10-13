const jwt = require('jsonwebtoken')
const User = require('../models/User')

const isAuth= async(req,res,next)=>{
    try{
        const token = req.cookies.ACCESS_TOKEN
        const user = await jwt.verify(token,process.env.JWT_SECRET)
        
        User.findOne({_id: user._id},(err,data)=>{
            if(!err && data){
                req.app.locals.user = data
                next()
            }else{
                console.log(err)
                res.json({message: 'Not authorised', result: false})
            }
        })
    }catch(e){
        console.log(e)
        res.json({message: 'Not authorised', result: false})
    }
}
module.exports = isAuth