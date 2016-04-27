var express = require( 'express' );
var http = require('http');
var fs = require('fs');
var swig = require('swig');

var app = express();
var server = http.createServer();

swig.setDefaults({ cache: false });

server.on('request', app);

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/special/', function (req, res, next) {
	console.log("you reached a special area");
    next();
})

app.use(function (req, res, next) {
	console.log(req.method, req.path);
    next();
})

app.get('/', function (req, res) {
    var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
	res.render( 'index', {title: 'Hall of Fame', people: people} );
});

app.get('/news', function (req, res) {
    res.send('news');
});


server.listen(3000, function () {
    console.log('Server listening');
});