// Application Dependencies
var express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
// const superagent = require('superagent');

// app setup
const app = module.exports = express();
const PORT = 3002;

// middleware
app.use(cors());
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(PORT, ()=>{console.log(`app is running on ${PORT}`)});


// app.post('/api/send-email', (req, res) => {
//     console.log(req.body);
//     console.log('hi');
    
// })
app.post('/sendEmail', sendEmail);

function sendEmail(req,res){
    console.log(req.body);
    
}

