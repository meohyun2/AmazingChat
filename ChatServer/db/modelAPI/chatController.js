const chatModel = require('../models/chatModel');

const userController = {
	createChat : async(msg,sender)=>{
		const result = await chatModel.create({
			msg : msg,
			sender : sender
		});
		
		return result;
	},
	
	getAllChat : async()=>{
		const result = await chatModel.find().limit(50);
		return result;
	}
}

module.exports=userController;