var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
// var tweetBank = require('../tweetBank');


/*

*/

module.exports = function routerFunc(io, client){

	router.get('/', function (req, res) {
		client.query('SELECT * FROM tweets INNER JOIN users ON tweets.userid = users.id', function (err, result) {
  		var tweets = result.rows;
	  	res.render( 'index', { title: 'Welcome to Twitter.js', tweets: tweets, showForm: true } );
	})
	});

	router.get( '/users/:name', function (req, res) {
		var name = req.params.name;
		client.query('SELECT * FROM tweets INNER JOIN users ON tweets.userid = users.id WHERE users.name = $1', [name], function(err, result){
		var list = result.rows;
	  	res.render('index', {title: 'Tweets by '+ name, tweets:list, showForm: true, } );
		})
		});

	router.get( '/tweets/:id', function (req, res) {
		var id = req.params.id;
		client.query('SELECT * FROM tweets INNER JOIN users ON tweets.userid = users.id WHERE users.id = $1', [id], function(err, result){
		var list = result.rows;
	  	res.render('index', {title: 'id', tweets:list, showForm: false} );
		})
		});

	router.post('/tweets', function(req, res) {
	  var name = req.body.name;
	  var text = req.body.text;
	  var userid;
	  var image;
	  client.query('SELECT * FROM users WHERE name = $1', [name], function(err, result){
	  	console.log(typeof result.rows);
	  	if (result.rows[0]){
	  		image = result.rows[0].pictureurl;
	  	}
	  	else {
	  		console.log('everywhere');
	  		image = 'http://i.imgur.com/Ru6KUIm.jpg';
	  		client.query('INSERT INTO users (name, pictureurl) VALUES ($1, $2)', [name, image],
	  			function(err, result){});	
	  	}
	  	client.query('SELECT * FROM users WHERE name = $1', [name], function(err, result){
	  		userid = result.rows[0].id;
	  		client.query('INSERT INTO tweets (userid, content) VALUES ($1, $2)', [userid, text], function(err, result){
	  			client.query('SELECT * FROM tweets WHERE content = $1', [text], function(err, result){
	  				console.log(result.rows);
	  				var tweetid = result.rows[0].id;
	    			io.sockets.emit('new_tweet', {name: name, text: text, id: tweetid, pictureurl: image});
	    			res.redirect('/');
	  			});
	  		});
	  	});
	  });
	 
	});

return router;
};


