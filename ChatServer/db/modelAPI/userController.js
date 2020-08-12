const userModel = require('../models/userModel');

const userController = {
	createUser : async(id,pwd,salt,nickname)=>{
		const result = await userModel.create({
			id : id,
			pwd : pwd,
			salt : salt,
			nickname : nickname
		});
		
		return result;
	},
	
	findMyInfo : async(id)=>{
		const result = await userModel.find().where('id').equals(id).select('salt nickname');
		console.log(result[0]);
		return result[0];
	},
	
	signCheck : async(hashed)=>{
		const result = await userModel.find().where('pwd').equals(hashed).select(' nickname');
		return result;
	},
}

module.exports=userController;