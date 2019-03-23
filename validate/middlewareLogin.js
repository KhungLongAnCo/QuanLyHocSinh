
var userModel = require('../models/users.model.js');

module.exports.bin = async function(req, res, next){
	// var user = db.get('users').find({id: req.signedCookies.login}).value();
	var users = await userModel.find();
	
		var user = users.filter(function(u){
			return u._id === req.signedCookies.login;
		})
		if(!req.signedCookies.login){
			res.redirect('/auth/login');
			return;
		}
		if(!user){
			res.redirect('/auth/login');
			return;
		}
		// res.locals.user = user;

		next();	

	

}