var express = require( 'express' );
var http = require('http');
var fs = require('fs');
var app = express();
var server = http.createServer();

server.on('request', app);

app.get('/', function (req, res) {
    res.send('hello world');
});

server.listen(3000, function () {
    console.log('Server listening');
});