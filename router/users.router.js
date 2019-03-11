var express = require('express');
var router = express.Router();
var db = require('../lowdb.js');
var controllers = require('../controllers/controller.js');
var validateCreatePost = require('../validate/user.validate.js');
var cookieParser = require('cookie-parser');


router.use(cookieParser());

router.get('/', controllers.list);
router.get('/search', controllers.search);
router.get('/view/:id', controllers.view);

router.get('/create', controllers.create);

router.post('/create', validateCreatePost.validate, controllers.createPost);

module.exports = router;