var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name: String,
	phone: String,
	MSV: String,
	avatar: String,
	id: String,
	email: String,
	password: String,
	note: String
});

var users = mongoose.model("users", userSchema);

module.exports = users;