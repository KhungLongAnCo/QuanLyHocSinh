var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var db = require('./lowdb.js');
var userRouter = require("./router/users.router.js");


app.set('view engine', 'pug');
app.set('views', 'views');

app.use("/users", userRouter);

app.get('/', function(req, res){
	res.render('index');
});




app.listen(3000, function(){
	console.log('server running port 3000');
});