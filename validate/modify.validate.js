module.exports.modify = function(req, res, next){
	var usersModel = require('../models/users.model.js');
	var error = [];
	var reglarPhone = /^([0-9]{9,10})$/;
	var reglarMSV = /^([0-9a-zA-Z]{4,10})$/;
	var user = req.body;
	var _id = req.params._id;
	if(!_id){
		res.redirect('/users');
	}
	if(!user.name){
		error.push('Không được để tên trống');		
	}
	if(!reglarMSV.test(user.MSV)){
		error.push('Mã Sinh viên phải có 4 kí tự trở lên và dưới 10!!!')
	}
	if(!reglarPhone.test(parseInt(user.phone))){	
		if(!user.phone){
			error.push('Số điện thoại sinh viên vẫn trống');
		}
		else{
			error.push('Số điện thoại sai cú pháp !!!');
		}
	}	
	if(!user.MSV){
		error.push('Mã sinh viên vẫn trống');
	}
	if(error.length){
		res.render('modifyUser.pug', {errors: error, user:user});
		return;
	}
	next();
}