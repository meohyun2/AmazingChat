var express = require('express');
var router = express.Router();
const util = require('../../utils/util');
const statusMessage = require('../../utils/statusMessage');
const statusCode = require('../../utils/statusCode');
const pool = require('../../db/pool');
const encrypt = require('../../utils/module/encrypt');
const userController = require('../../db/modelAPI/userController');

//파일 리스트 조회
router.get('/list',async(req,res)=>{
	console.log(req.sessionID);
	if(!req.session.isSigned){
		console.log("세션 인증 실패, 리다이렉션");
		res.status(400).send(util.successFalse(400,"인증실패."));
	}else{
		console.log('세션 인증 완료');
		res.status(statusCode.OK).send(util.successTrue(statusCode.OK,"성공"));
	}
});


module.exports = router;