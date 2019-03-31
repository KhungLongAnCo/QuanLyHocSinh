
var usersModel = require('../models/users.model.js');
module.exports.list = async function(req, res){
	var user = await usersModel.find();
	user = user.filter(function(u){
		return u.email != 'luankoy2k@gmail.com';
	});
		res.render('list', {
			users: user
		})
}
module.exports.search = async function(req, res){
	var q = req.query.q;
	var users = await usersModel.find();
	users = users.filter(function(u){
		return u.email != 'luankoy2k@gmail.com';
	});
	var searching = users.filter(function(user){
		return user.MSV.toLowerCase().indexOf(q.toLowerCase()) >= 0;
	});	
		res.render('list', {
			users: searching
		});

	
}
module.exports.view = async function(req, res){
	var _id = req.params._id;
	var list = await usersModel.find();
	var user = list.filter(function(u){
		return u._id == _id;
	})
	res.render('viewUser', {user: user[0]});
	
}
module.exports.create = function(req, res){
	res.render('create');
}
module.exports.createPost = function(req, res){
	// req.body.avatar = req.body.file.path.split('\\').slice(1).join('/')
	usersModel.create(req.body);
	res.redirect('/users');
}
module.exports.removeUser = function(req, res){
	var _id = req.params._id;
	usersModel.remove({_id: _id}).exec(function(err, result){
		res.redirect('/users');
	})
}
module.exports.modifyUser = async function(req, res){
	var _id = req.params._id;
	var user = await usersModel.find();
	user = user.filter(function(u){
		return u._id == _id;
	});
	res.render('modifyUser', {user :user[0]});
}

module.exports.modifyUserPost = async function(req, res){
	var modifyUser = req.body;
	var _id = req.params._id;
	var user = await usersModel.find();
	user = user.filter(function(u){
		return u._id == _id;
	});
	usersModel.update(user[0], modifyUser).exec(function(err, result){	
	});
	
	res.redirect('/users/view/' + _id);
}