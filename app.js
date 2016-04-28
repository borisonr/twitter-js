var express = require( 'express' );
var bodyParser = require('body-parser');
var fs = require('fs');
var swig = require('swig');
var routes = require('./routes/');
var socketio = require('socket.io');
var morgan = require('morgan');
var path = require('path');

var app = express();
var server = app.listen(3000);
var io = socketio.listen(server);

swig.setDefaults({ cache: false });
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname,'/public')));

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(routes(io));