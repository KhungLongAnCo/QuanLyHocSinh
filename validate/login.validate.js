// var db = require('../lowdb.js');
var UserModel = require('../models/users.model.js');
module.exports.Login = function(req, res, next){
	var error = [];
	var user = req.body;
	UserModel.find().exec(function(err, users){
		var combine = users.filter(function(u){
			return u.email === user.email;
		});
		
		combine = combine[0];
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
			res.cookie('login', combine._id, {
				signed: true
			});
			res.redirect('/users');
			next();
		}

	});

		// console.log(user);
		// console.log(combine);
		
	// var combine = db.get('users').find({email: user.email}).value();
	
	
}