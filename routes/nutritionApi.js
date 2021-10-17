const router = require('express').Router()
const axios = require('axios') 
const isAuth = require('../middleware/isAuth')

const url = 'https://api.edamam.com/api/food-database/v2/parser?app_id=3d6626db&app_key=14e482a377e11d78eef54ec7109efcbc&ingr=2%20piece%20roti&nutrition-type=logging'

router.get('/',(req,res)=>{
    axios.get(`https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.app_id}&app_key=${process.env.app_key}&ingr=${req.query.q}&nutrition-type=logging`)
    .then(response=>{
        res.json(response.data)
    })
})

router.get('/isLoggedIn',isAuth,(req,res)=>{
    res.json({message: 'logged in', result: true})
})

module.exports = router