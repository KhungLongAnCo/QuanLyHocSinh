var express = require("express");
var app = express();
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync');
var bodyParser = require('body-parser');

var adapter = new FileSync('db.json')
var db = low(adapter)

// Set some defaults
db.defaults({users: [] })
.write();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/', function(req, res){
	res.render('index');
});

app.get('/users', function(req, res){
	res.render('list', {
		users: db.get('users').value()
	});
})
app.get('/users/search', function(req, res){
	var q = req.query.q;
	var users = db.get('users').value();
	var searching = users.filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) >= 0;
	});
	res.render('list', {
		users: searching
	});
});
app.get('/users/create', function(req, res){
	res.render('create');
});
app.post('/users/create', function(req, res){
	var newUser = req.body;
	db.get('users')
	.push(newUser)
	.write()
	res.render('list', {
		users: db.get('users').value()
	});
	res.redirect('/users');
})

app.listen(3000, function(){
	console.log('server running port 3000');
});