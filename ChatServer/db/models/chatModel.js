const mongoose = require('mongoose');

// 채팅 스키마
const chatSchema = new mongoose.Schema({
	idx : mongoose.Schema.Types.ObjectId,
	date : {type : Date, default:Date.now, required : true},
	msg : {type : String, required : true},
	sender : {type : String, required : true}
});

chatSchema.set('collection', 'chat'); 

module.exports = mongoose.model('Chat', chatSchema);