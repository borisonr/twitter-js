var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Welcome to Twitter.js', tweets: tweets, showForm: true } );
});

router.get( '/users/:name', function (req, res) {
	var name = req.params.name;
	var list = tweetBank.find({name: name});
  	res.render('index', {title: 'Tweets by '+ name, tweets:list, showForm: false} );
	});

router.get( '/tweets/:id', function (req, res) {
	var id = req.params.id;
	var list = tweetBank.find({id: id});
  	res.render('index', {title: 'id', tweets:list, showForm: false} );
	});

router.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

module.exports = router;