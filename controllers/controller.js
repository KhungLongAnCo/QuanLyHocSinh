var db = require('../lowdb.js');
var shortid = require('shortid');
var User = require('../models/users.model.js');
module.exports.list = function(req, res){
	User.find()
	User.find().exec(function(err, user){
		res.render('list', {
			users: user
		})
	})
}
module.exports.search = function(req, res){
	var q = req.query.q;
	User.find().exec(function(err, users){

		var searching = users.filter(function(user){
			return user.MSV.toLowerCase().indexOf(q.toLowerCase()) >= 0;
		});

		res.render('list', {
			users: searching
		});

	})
	
}
module.exports.view = function(req, res){
	var name = req.params.name;
	console.log(name);
	// var user = db.get('users')
	// .find({ id: id })
	// .value();
	User.find().exec(function(err, user){
		var user = user.filter(function(u){
			return u.name == name;
		});
		console.log(user);
		res.render('viewUser', {users:user});
	});
	
}
module.exports.create = function(req, res){
	res.render('create');
}
module.exports.createPost = function(req, res){
	req.body.id = shortid.generate();
	req.body.avatar = req.file.path.split('\\').slice(1).join('/');
	db.get('users')
	.push(req.body)
	.write()
	res.redirect('/users');
}
