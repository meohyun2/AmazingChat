var express = require('express');
var router = express.Router();
const util = require('../../utils/util');
const statusMessage = require('../../utils/statusMessage');
const statusCode = require('../../utils/statusCode');
const pool = require('../../db/pool');
const encrypt = require('../../utils/module/encrypt');
const chatController = require('../../db/modelAPI/chatController');

//채팅 기록 불러오기
router.get('/chatList',async(req,res)=>{
	const result = await chatController.getAllChat();
	if(result){
		console.log("에러 없다.");
		res.status(statusCode.OK).send(util.successTrue(statusCode.OK,statusMessage.SUCCESS,result));
	}else{
		console.log("에러 있다.");
		res.status(statusCode.BAD_REQUEST).send(util.successFalse(statusCode.BAD_REQUEST,statusMessage.SIGNUP_FAIL));
	}
});

module.exports = router;
