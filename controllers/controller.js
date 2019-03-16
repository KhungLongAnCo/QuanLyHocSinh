// var db = require('../lowdb.js');
var shortid = require('shortid');
var usersModel = require('../models/users.model.js');
module.exports.list = function(req, res){
	usersModel.find().exec(function(err, user){
		res.render('list', {
			users: user
		})
	})
}
module.exports.search = function(req, res){
	var q = req.query.q;
	usersModel.find().exec(function(err, users){
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
	usersModel.find().exec(function(err, user){
		var user = user.filter(function(u){
			return u.name == name;
		});
		console.log(user);
		res.render('viewUser', {user :user[0]});
	});
	
}
module.exports.create = function(req, res){
	res.render('create');
}
module.exports.createPost = function(req, res){
	req.body.id = shortid.generate();
	// req.body.avatar = req.body.file.path.split('\\').slice(1).join('/')
	usersModel.create(req.body);
	res.redirect('/users');
}
module.exports.removeUser = function(req, res){
	var name = req.params.name;
	usersModel.remove({name: name}).exec(function(err, result){
		res.redirect('/users');
	})
}
