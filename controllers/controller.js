var db = require('../lowdb.js');

module.exports.list = function(req, res){
	res.render('list', {
		users: db.get('users').value()
	});
}

module.exports.search = function(req, res){
	var q = req.query.q;
	var users = db.get('users').value();
	var searching = users.filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) >= 0;
	});
	res.render('list', {
		users: searching
	});
}
module.exports.create = function(req, res){
	res.render('create');
}
module.exports.createPost = function(req, res){
	var newUser = req.body;
	db.get('users')
	.push(newUser)
	.write()
	res.redirect('/users');
}