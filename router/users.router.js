var express = require('express');
var multer  = require('multer');
var db = require('../lowdb.js');
var controllers = require('../controllers/controller.js');
var validateCreatePost = require('../validate/user.validate.js');
var cookieParser = require('cookie-parser');
var router = express.Router();
var upload = multer({ dest: './public/uploads/' });
router.use(cookieParser());

router.get('/', controllers.list);
router.get('/search', controllers.search);
router.get('/view/:name', controllers.view);

router.get('/create', controllers.create);

router.post('/create',
	upload.single('avatar'),
	validateCreatePost.validate,
	controllers.createPost);

module.exports = router;