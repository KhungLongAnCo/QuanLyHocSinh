var express = require('express');
var router = express.Router();
var db = require('../lowdb.js');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res){
	res.render('list', {
		users: db.get('users').value()
	});
})
router.get('/search', function(req, res){
	var q = req.query.q;
	var users = db.get('users').value();
	var searching = users.filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) >= 0;
	});
	res.render('list', {
		users: searching
	});
});
router.get('/create', function(req, res){
	res.render('create');
});
router.post('/create', function(req, res){
	var newUser = req.body;
	db.get('users')
	.push(newUser)
	.write()
	res.redirect('/users');
})

module.exports = router;