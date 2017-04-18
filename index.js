var express = require('express')
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || '8200',
    ip = process.env.IP || '127.0.0.1',
    path = require('path'),
    fs = require('fs'),
    https = require('https');

var routes = require('./routes/index.js');
var oneDay = 86400000;

// Config application
app.use(bodyParser.json());

// Set CORS headers: allow all origins, methods,
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.status(200).send();
    }
    else {
    //move on
      next();
    }
});
app.use('/api', routes);
// --------- End Config application


var options = {
    //ca: [fs.readFileSync( "C:\\ProgramData\\Qlik\\Sense\\Repository\\Exported Certificates\\.Local Certificates\\root.pem" )],
    key: fs.readFileSync( "C:\\ProgramData\\Qlik\\Sense\\Repository\\Exported Certificates\\.Local Certificates\\server_key.pem" ),
    cert: fs.readFileSync( "C:\\ProgramData\\Qlik\\Sense\\Repository\\Exported Certificates\\.Local Certificates\\server.pem" ),
};

var server = https.createServer( options, app );
server.listen( port, ip, function() {
   console.log('HTTP Server running on '+ip+', listening on port ' + port );
} );