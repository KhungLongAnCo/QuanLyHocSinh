
var db = require('../lowdb.js');

module.exports.bin = function(req, res, next){
	var user = db.get('users').find({id: req.signedCookies.login}).value();
	console.log(user);
	if(!req.signedCookies.login){
		res.redirect('/auth/login');
		return;
	}
	if(!user){
		res.redirect('/auth/login');
		return;
	}
	res.locals.user = user;

	next();	

}