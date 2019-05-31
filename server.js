

const express = require('express');
const path = require('path');
var cors = require('cors');
const app = express();
/*

app.use(cors);
// Serve static files....

var corsOptions = {
    origin: 'https://lit-eyrie-15561.herokuapp.com/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}*/
app.use(express.static(__dirname + '/dist/istore'));

// Send all requests to index.html
app.get('/*',function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/istore/index.html'));
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);

