const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const cors = require('cors');
const nodemailer = require('nodemailer');

// app setup
const app = module.exports = express();
const PORT = process.env.PORT || 3002;
require('dotenv').config();

// middleware
app.use(express.static(path.join(__dirname, 'frontend/build'))); //added this
app.use(cors());
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/sendEmail', sendEmail);

function sendEmail(req,res){
    let data = req.body;
    
   for(var key in req.body){
       if(req.body.hasOwnProperty(key)){
           console.log(req.body[key]);

           let output = `
            <h2>Thank You For Using The Secret Santa Helper</h2>
            <h3>${req.body[key].name} you will be shopping for ${req.body[key].person}</h3>
           `;

           let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'thesecretsantamatcher@gmail.com', // generated ethereal user
                pass: process.env.EMAILPASS // generated ethereal password
            },
            tls:{
                rejectUnauthorized: false
            }
        });
    
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Secret Santa Helper" <thesecretsantamatcher@gmail.com>', // sender address
            to: req.body[key].email, // list of receivers
            subject: 'YOUR PERSON', // Subject line
            text: `Hi, ${req.body[key].name} you will be shopping for ${req.body[key].person}`, // plain text body
            html: output // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
       }
   }
}



const port = process.env.PORT || 3002;
app.listen(port);

console.log('App is listening on port ' + port);