const router = require('express').Router()
const isAuth = require('../middleware/isAuth')
const upload = require('../middleware/upload')
const { default: axios } = require('axios')
const { profileUpdate, photoUpdate } = require('../controllers/user')

//adding daily meal
router.post('/daily',isAuth,(req,res)=>{
    console.log(req.body)
    let q=''
    req.body.breakfast.forEach(i=>{
        q=q+i+','
    })
    q = q.slice(0,q.length-1)
    console.log(q)
    axios.get(`https://api.nal.usda.gov/fdc/v1/foods/?api_key=OCp7jWX2fx2sGB5aN82ZPsIQh0HbNuxIjkj14Nuf&fdcIds=${q}`)
    .then(d=>{
        console.log(d.data)
    })
})

// main dashboard
router.get('/',isAuth,(req,res)=>{
    res.render('./user/main',{data: req.app.locals.user, component: 'profile'})
})

router.get('/bmi',isAuth,(req,res)=>{
    res.render('./user/main',{data: req.app.locals.user, component: 'bmi'})
})

router.get('/diet',isAuth,(req,res)=>{
    res.render('./user/main',{data: req.app.locals.user, component: 'diet'})
})

router.get('/foodwiki',isAuth,(req,res)=>{
    res.render('./user/main',{data: req.app.locals.user, component: 'foodwiki'})
})

//updating user
router.get('/:id/update',isAuth,(req,res)=>{
    res.render('./user/main',{data: req.app.locals.user, component: 'update'})
})

router.put('/:id',isAuth,profileUpdate)

//profile photo
router.get('/:id/photo',isAuth,(req,res)=>{
    res.render('./user/main',{data: req.app.locals.user, component: 'avatar', info: req.flash('info')})
})

router.put('/:id/photo',isAuth,upload.single('file'),photoUpdate)


module.exports = router