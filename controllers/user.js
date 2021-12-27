const User = require('../models/User')

const profileUpdate = (req,res)=>{
    User.findById(req.params.id,(err,fUser)=>{
        if(!err && fUser){
            console.log(req.body)
            fUser.username = req.body.username
            fUser.physique.height = req.body.height
            fUser.physique.weight = req.body.weight
            fUser.physique.age = req.body.age
            fUser.physique.bmi = req.body.weight/(req.body.height*req.body.height*0.3048*0.3048)
            fUser.save()
            // res.redirect('/user')
            res.json({result: true})
        }else
            res.json({message: 'update failed', result: false})
    })
}

const photoUpdate = (req,res)=>{
    if(!req.file){
        req.flash('info','Please select a file')
        // res.redirect('back')
        res.json({result: false, message: 'Please select a file'})

    }else if(req.file.mimetype!=='image/jpeg'){
        req.flash('info','Invalid file format, please select a .jpeg file')
        // res.redirect('back')
        res.json({result: false, message: 'Invalid file format, please select a .jpeg file'})

    }else if(req.file.size>1000000){
        req.flash('info','File size exceeded the limit')
        // res.redirect('back')
        res.json({result: false, message: "File size exceeded the limit"})

    }else
        User.findById(req.params.id,(err,fUser)=>{
            if(!err && fUser && req.file){
                fUser.image = req.file.buffer.toString('base64');
                fUser.image.contentType = req.file.mimetype
                fUser.save()
                // res.redirect('/user')
                res.json({result: true, image: fUser.image})
            }else{
                req.flash('info','Unable to change the image')
                // res.redirect('back')
                res.json({result: false, message: "Unable to change the image"})
            }
        })
}

module.exports = {profileUpdate,photoUpdate}