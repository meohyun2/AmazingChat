const mongoose = require('mongoose');

// 기본 유저 스키마
const userSchema = new mongoose.Schema({
	userIdx : mongoose.Schema.Types.ObjectId,
	id : {type : String, required : true, unique : true},
	pwd : {type : String, required : true},
	salt : {type : String, required : true},
	nickname : {type : String, required : true, unique : true}
});

userSchema.set('collection', 'user'); 

module.exports = mongoose.model('User', userSchema);