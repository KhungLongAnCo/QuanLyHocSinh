var express = require('express');
var router = express.Router();
var db = require('../lowdb.js');
var bodyParser = require('body-parser');
var controllers = require('../controllers/controller.js');
var validateCreatePost = require('../validate/user.validate.js');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', controllers.list);
router.get('/search', controllers.search);
router.get('/view/:id', controllers.view);

router.get('/create', controllers.create);
// router.get('/remove/:remove', controllers.remove);
router.post('/create', validateCreatePost.validate, controllers.createPost);

module.exports = router;