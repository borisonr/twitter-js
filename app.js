var express = require( 'express' );
var http = require('http');
var fs = require('fs');
var swig = require('swig');
var routes = require('./routes/');

var app = express();
var server = http.createServer();

swig.setDefaults({ cache: false });

server.on('request', app);

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');



app.use(function (req, res, next) {
	console.log(req.method, req.path, res.statusCode);
    next();
})

app.use('/', routes);

server.listen(3000, function () {
    console.log('Server listening');
});