var express = require( 'express' );
var http = require('http');
var fs = require('fs');
var swig = require('swig');

var app = express();
var server = http.createServer();


server.on('request', app);

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/special/', function (req, res, next) {
	console.log("you reached a special area");
    next();
})

app.use(function (req, res, next) {
	console.log(req.method, req.path, res.status().statusCode);
    next();
})

app.get('/', function (req, res) {
    res.send('hello world');
});

app.get('/news', function (req, res) {
    res.send('news');
});

swig.renderFile(__dirname + '/views/index.html', locals, function (err, output) {
    console.log(output);
});


server.listen(3000, function () {
    console.log('Server listening');
});