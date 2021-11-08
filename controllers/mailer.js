const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'nitaawasthi88@gmail.com',
        pass: '1234nita1234'
    }
})  

module.exports = transporter