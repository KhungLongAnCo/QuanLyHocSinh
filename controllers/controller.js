var db = require('../lowdb.js');
var shortid = require('shortid');
module.exports.list = function(req, res){
	res.render('list', {
		users: db.get('users').value()
	});
}
module.exports.search = function(req, res){
	var q = req.query.q;
	var users = db.get('users').value();
	var searching = users.filter(function(user){
		return user.MSV.toLowerCase().indexOf(q.toLowerCase()) >= 0;
	});
	res.render('list', {
		users: searching
	});
}
module.exports.view = function(req, res){
	var id = req.params.id;
	var user = db.get('users')
	.find({ id: id })
	.value();
	res.render('viewUser', {user});
}
module.exports.create = function(req, res){
	console.log(req.cookies);
	res.render('create');
}
module.exports.createPost = function(req, res){
	req.body.id = shortid.generate();
	db.get('users')
	.push(req.body)
	.write()
	res.redirect('/users');
}
