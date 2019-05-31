//Install express server
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();


var corsOptions = {
    origin: 'https://lit-eyrie-15561.herokuapp.com/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/iStore'));

app.get('/*', cors(corsOptions),function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/iStore/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 3000);