var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync');
var bodyParser = require('body-parser');

var adapter = new FileSync('db.json')
var db = low(adapter)

// Set some defaults
db.defaults({users: [] })
.write();

module.exports = db;