var mongoose = require('mongoose');
mongoose.connect('mongdb://127.0.0.1/node_demo');

var UserSchema = new mongoose.Schema({
	username: String,
	pwd: String,
	email: String,
});

UserSchema.statics.getUserBySignupInfo = function(username, email, callback){
	var cond = ['$or', {username: username}, {email: email}];
	this.find(cond, callback);
};

UserSchema.statics.addUser = function(user, callback){
	this.creat(user, callback);
};

UserSchema.statics.getUser= function(username, pwd, callback){
	this.findOne({username: username, pwd: pwd}, callback);
};

module.exports = mongoose.model('User', UserSchema);