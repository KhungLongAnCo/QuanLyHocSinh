var express = require('express');
var multer  = require('multer');
// var db = require('../lowdb.js');
var controllers = require('../controllers/controller.js');
var validateCreatePost = require('../validate/user.validate.js');
var cookieParser = require('cookie-parser');
var validateModifyUser = require('../validate/modify.validate.js');
var router = express.Router();
var upload = multer({ dest: './public/uploads/' });

router.use(cookieParser());

router.get('/', controllers.list);

router.get('/search', controllers.search);

router.get('/view/:_id', controllers.view);

router.get('/create', controllers.create);
router.post('/create',
	upload.single('avatar'),
	validateCreatePost.validate,
	controllers.createPost);

router.get('/remove:_id', controllers.removeUser);

router.get('/modify/:_id', controllers.modifyUser);

router.post('/modify/:_id',
validateModifyUser.modify,
 controllers.modifyUserPost);


module.exports = router;