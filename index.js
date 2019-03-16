var express = require("express");

var app = express();
var bodyParser = require('body-parser');
var userRouter = require("./router/users.router.js");
var authRouter = require('./router/auth.login.js');
var validateLogin = require('./validate/middlewareLogin.js');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/expressManager');



app.use(express.static('public'));
app.use(cookieParser('doilabekho'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', 'views');
app.use("/users", 
	validateLogin.bin,
	userRouter
	);
app.use('/auth', authRouter);


app.get('/', function(req, res){
	res.render('index');
});

app.listen(3000, function(){
	console.log('server running port 3000');
});