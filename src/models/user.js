var mongoose = require('../mongoose_helper').mongoose;

var UserSchema = new mongoose.Schema({
	username: String,
	pwd: String,
	email: String
});

UserSchema.statics.getUserBySignupInfo = function(username, email, callback){
	var cond = { $or:[{username: username}, {email: email}]};
	this.find(cond, callback);
};

UserSchema.statics.addUser = function(user, callback){
	this.create(user, callback);
};

UserSchema.statics.getUser = function(username, pwd, callback){
	this.findOne({username: username, pwd: pwd}, callback);
};

module.exports = mongoose.model('User', UserSchema);