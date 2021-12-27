const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const login = (req,res)=>{
    const {email,password} = req.body;

    User.findOne({email},async(err,fUser)=>{
        if(!err && fUser && await bcrypt.compare(password,fUser.password)){
            const token = await jwt.sign({_id:fUser._id},process.env.JWT_SECRET)
            res.cookie("ACCESS_TOKEN",token,{
                httpOnly: true
            });
            res.json({result: true,user: fUser})
        }else{
            res.json({result:false, message:'Incorrect login id or password'})
        }
    })
}

const register = async(req,res)=>{
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
                // res.redirect('/user')
                res.json({result:true,user: nUser});
            }else{
                console.log(err)
                res.json({result:false, message: 'some error occurred'})
            }
        })
    }
}

const logout = (req,res)=>{
    res.cookie('ACCESS_TOKEN','',{
        maxAge: 1
    })
    // res.redirect('/login')
    res.json({result: true})
}

module.exports = {login,register,logout}