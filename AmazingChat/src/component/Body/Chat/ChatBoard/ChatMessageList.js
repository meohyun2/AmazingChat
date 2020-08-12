import React,{useRef,useState,useContext,useEffect} from 'react';
import {Container,ListGroup} from 'react-bootstrap';
import styled from 'styled-components';
import {SocketContext} from '../../../../store/socketContext';

const ChatFetch = require('../../../../fetch/ChatFetch');

const StyledListGroup = styled(ListGroup)`
	width : 100%;
	height : 600px;
	overflow : scroll;
	position: absolute;
`;

const ChatMessageList =()=> {
	
	const socket = useContext(SocketContext);
	const [ChatList,setChatList] = useState([]);
	
	// 스크롤 고정
	const messagesRef = useRef();
	useEffect(() => {
		messagesRef.current.scrollTop = 	messagesRef.current.scrollHeight;
	}, [ChatList]);
	
	// 초기 Did 마운트시 채팅 리스트 받아오기
	const getChatData=async()=> {
		const result = await ChatFetch.getAllChat();
		console.log(result);
		if(result.status === 200){
			// set state
			console.log(result.data);
			setChatList(result.data);
		}else{
			// alert Error for render
			alert('채팅창 불러오기 실패..');
		}
	}
	
	useEffect(()=>{
		// use fetch, set state
		getChatData();
	},[]);
	
	// 이후 채팅 연결시 채팅 리스트 받아오기
	socket.on("newMsg",(newMessage)=>{
		setChatList(ChatList.concat(newMessage));
	});
	
	// 귓속말 받게 되면 받아오기
	socket.on("sendingWhisper",(msg,nickname)=>{
		setChatList(ChatList.concat({msg:msg,sender:"<귓속말>"+nickname}));
	})
	
	return(
		<StyledListGroup ref={messagesRef}>
			{ChatList.map((item,i)=>{
				return(
					<ListGroup.Item key={i}>{item.sender+":"+ item.msg}</ListGroup.Item>
				)
			})}
		</StyledListGroup>
	)
}

export default ChatMessageList;