const io = require('socket.io');
const chatModelApi = require('../db/modelAPI/chatController');
var checkUserDup=new Set();
var users = [];
module.exports = (io) => {
	io.on('connection',(socket) => {
		
		// 유저 리스트를 가져오는 이벤트
		socket.on('adduser', (user)=>{
			socket.user=user;
			console.log(user);
			if(!checkUserDup.has(user)){
				checkUserDup.add(user);
				users.push({user : user,userId : socket.id});
				io.emit('users', users);
			}
			
			console.log("현재 유저 : ",users);
			io.emit('users', users);
		});
		
		
		// 전체 메시지
		socket.on("chat",async(msg,nickname)=>{
			console.log(msg,nickname);
			const result = await chatModelApi.createChat(msg,nickname);
			console.log(result);
			if(!result){console.log('DB입력 오류 발생')}
			// 클라에게 내용 전송
			io.emit("newMsg",result);
		})
		
		// 연결 해제
		socket.on('disconnectUser', () => {
			checkUserDup.delete(socket.user);
			const idx = users.indexOf(socket.user);
			users.splice(idx,1);
			io.emit('users',users);
		});
		
		// // SocketID 알아내기
		// socket.on('getSocketID',(nickname)=>{
		// 	const result = users.find(user => user.user === nickname);
		// 	socket.emit('resSocketID',result.userId);
		// });
		
		// 귓속말 보내기
		socket.on('whisper',async(socketId,msg,nickname)=>{
			io.to(socketId).emit('sendingWhisper',msg,nickname); // 보낸이도 같이 전송합니다.
		})
	})
}