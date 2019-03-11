
module.exports.bin = function(req, res, next){
	if(req.cookies.login){
		next();
		
	}
	else{
		res.redirect('/auth/login');
		return;
	}
}