module.exports.validate = function(req, res, next){
	var newUser = req.body;
	var error = [];
	var reglarPhone = /^([0-9]{10,11})$/;
	if(!newUser.name){
		error.push('Không được để tên trống');		
	}
	if(!reglarPhone.test(parseInt(newUser.phone))){	
	if(!newUser.phone){
		error.push('Số điện thoại sinh viên vẫn trống');
	}
	else{
		error.push('Số điện thoại sai cú pháp !!!');
	}
	}	
	if(!newUser.MSV){
		error.push('Mã sinh viên vẫn trống');
	}
	if(error.length){
		res.render('create', {errors: error, value: newUser});
		return;
	}
	res.locals.lol = 'lol'
	next();
}