var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');




module.exports = function routerFunc(io){

	router.get('/', function (req, res) {
	  var tweets = tweetBank.list();
	  res.render( 'index', { title: 'Welcome to Twitter.js', tweets: tweets, showForm: true } );
	});

	router.get( '/users/:name', function (req, res) {
		var name = req.params.name;
		var list = tweetBank.find({name: name});
	  	res.render('index', {title: 'Tweets by '+ name, tweets:list, showForm: true, } );
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
	  var id = Math.floor(Math.random()*500000).toString();
	  io.sockets.emit('new_tweet', {name: name, text: text, id: id});
	});

return router;
};




