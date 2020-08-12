var express = require('express');
var router = express.Router();
const util = require('../../utils/util');
const statusMessage = require('../../utils/statusMessage');
const statusCode = require('../../utils/statusCode');
const pool = require('../../db/pool');
const encrypt = require('../../utils/module/encrypt');
const userController = require('../../db/modelAPI/userController');

//회원가입
router.post('/signUp',async(req,res)=>{
	const {id, nickname} = req.body;
	const {hashed,salt} = await encrypt.encrypt(req.body.pwd);
	const result = userController.createUser(id,hashed,salt,nickname)
	if(result){
		console.log("에러 없다.");
		res.status(statusCode.OK).send(util.successTrue(statusCode.OK,statusMessage.SIGNUP_SUCCESS));
	}else{
		console.log("에러 있다.");
		res.status(statusCode.BAD_REQUEST).send(util.successFalse(statusCode.BAD_REQUEST,statusMessage.SIGNUP_FAIL));
	}
});

// 로그인
router.post('/signIn',async(req,res)=>{
	const {id} = req.body;
	const {salt,nickname} = await userController.findMyInfo(id);
	if(!salt){res.status(statusCode.BAD_REQUEST).send(util.successFalse(statusCode.BAD_REQUEST, statusMessage.NOT_FIND_USER))}
	const {hashed} = await encrypt.encryptWithSalt(req.body.pwd,salt);
	if(!hashed){res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR, statusMessage.INTERNAL_SERVER_ERROR))}
	const result = await userController.signCheck(hashed);
	if(result){
		req.session.isSigned = true;
		req.session.nickname = nickname;
		console.log(req.session.isSigned);
		res.status(statusCode.OK).send(util.successTrue(statusCode.OK,statusMessage.LOGIN_SUCCESS));
	}else{
		res.status(statusCode.BAD_REQUEST).send(util.successFalse(statusCode.BAD_REQUEST,statusMessage.LOGIN_FAIL));
	}
});

//로그아웃
router.get('/logout', function(req, res){
		console.log("로그아웃 시키자.");
		if(req.session.isSigned){
				req.session.destroy((err)=>{
					if(err){
res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.successFalse(statusCode.INTERNAL_SERVER_ERROR,statusMessage.INTERNAL_SERVER_ERROR));
					}
					else{
					res.status(statusCode.OK).send(util.successTrue(statusCode.OK,statusMessage.SUCCESS));
					}
				})
		}
});

// 세션 인증 여부
router.get('/isSigned', function(req, res){
		if(req.session.isSigned){
res.status(statusCode.OK).send(util.successTrue(statusCode.OK,statusMessage.AUTHORIZED,req.session.nickname));
		}else{
res.status(statusCode.REDIRECT).send(util.successTrue(statusCode.REDIRECT,statusMessage.UNAUTHORIZED,'/'));
		}
});

module.exports = router;