var db = require('../lowdb.js');
module.exports.Login = function(req, res, next){
	var error = [];
	var user = req.body;
	// console.log(user);
	var combine = db.get('users').find({email: user.email}).value();
	console.log(combine);
	if(!combine){
		error.push('ko có tài khoản này');
		res.render('login', {error: error, value: user});
		return;
	}
	if(parseInt(combine.password) != user.password){
		error.push('Mat khau sai');
		res.render('login', {error: error, value: user});
		return;
	}
	if(combine.password === user.password){
		res.cookie('login', 12345);
		res.redirect('/users');
		next();
	}
	

}