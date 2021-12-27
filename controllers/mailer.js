const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
    },
    tls: {rejectUnauthorized: false}
})  

module.exports = transporter