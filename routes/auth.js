const router = require('express').Router()
const isAuth = require('../middleware/isAuth')
const { logout, login, register } = require('../controllers/auth')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const transporter = require('../controllers/mailer')

router.get('/',(req,res)=>{
    res.send('Home')
})

router.get('/login',(req,res)=>{
    res.redirect(`${process.env.FRNT+'login'}`)
})

router.get('/logout',logout)

router.post('/login',login)

router.post('/register',register)

router.get('/secret',(req,res)=>{
    res.render('error')
})

//reset password
router.get('/forget-pass',(req,res)=>{
    res.render('./auth/forget',{info: req.flash('info')})
})

router.post('/forget-pass',(req,res)=>{
    let {email} = req.body
    User.findOne({email},async (err,fUser)=>{
        if(!err && fUser){
            let link = `http://localhost:8080/forget-pass/${fUser._id}/`
            let token = await jwt.sign({_id: fUser._id},process.env.RESET_SECRET,{expiresIn: '60m'})
            link = link + token

            // req.flash('info','Reset link has been sent to your email address')
            // res.send(link)
            res.redirect('/forget-pass')
            let mailOptions={
                from: 'noreplytestuser01@gmail.com',
                to: fUser.email,
                subject: 'Password Reset Link',
                text: 'Follow the link: '+link
            }
            transporter.sendMail(mailOptions,(err,data)=>{
                if(!err){
                    res.send(link)
                }
                else{
                    console.log(err)
                    res.send('not send')
                }
            })
        }
    })
})

router.get('/forget-pass/:id/:key',(req,res)=>{
    User.findById(req.params.id,async(err,fUser)=>{
        if(!err && fUser){
            try{
                await jwt.verify(req.params.key,process.env.RESET_SECRET)
                res.render('./auth/newpass',{link: `/forget-pass/${req.params.id}/${req.params.key}`})
            }catch{
                res.send('cannot change')
            }

        }else{
            res.send('cannot change')
        }
    })
})

router.put('/forget-pass/:id/:key',(req,res)=>{
    let {password,cpassword} = req.body
    
    if(cpassword!==password)
        res.redirect('back')

    else
        User.findById(req.params.id,async(err,fUser)=>{
            if(!err && fUser){
                try{
                    await jwt.verify(req.params.key,process.env.RESET_SECRET)
                    let hash = await bcrypt.hash(password,10)
                    fUser.password = hash
                    fUser.save()

                    // req.flash('info','Password has been successfully reset')
                    res.redirect('/login')
                }catch{
                    res.send('cannot change')
                }

            }else{
                res.send('cannot change')
            }
        })
})

module.exports = router