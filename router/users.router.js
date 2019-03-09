var express = require('express');
var router = express.Router();
var db = require('../lowdb.js');
var bodyParser = require('body-parser');
var controllers = require('../controllers/controller.js');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', controllers.list);
router.get('/search', controllers.search);
router.get('/create', controllers.create);
router.post('/create', controllers.createPost);

module.exports = router;