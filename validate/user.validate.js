module.exports.validate = async function(req, res, next){
	var usersModel = require('../models/users.model.js');
	var newUser = req.body;
	var error = [];
	var reglarPhone = /^([0-9]{9,10})$/;
	var reglarMSV = /^([0-9a-zA-Z]{4,10})$/;
	var test = await usersModel.find();
	var testMSV = await test.filter(function(u){
			return u.MSV === newUser.MSV;
	})
	// if(testMSV){
	// 	error.push('Đã tồn tại Mã sinh viên này');
	// }
	if(!newUser.name){
		error.push('Không được để tên trống');		
	}
	if(!reglarMSV.test(newUser.MSV)){
		error.push('Mã Sinh viên phải có 4 kí tự trở lên và dưới 10!!!')
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

	next();
}