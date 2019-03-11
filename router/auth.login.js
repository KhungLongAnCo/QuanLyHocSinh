var express = require('express');
var router = express.Router();
var db = require('../lowdb.js');
var loginValidate = require('../validate/login.validate.js');


router.get('/login', function(req, res){
	res.render('login');
})
router.post('/login', loginValidate.Login, function(req, res){
	
})
// router.get('/login', function(req, res){
// 	res.clearCookie('login');
// })

module.exports = router;