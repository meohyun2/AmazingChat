import React,{useContext,useState,useEffect} from 'react';
import ChatBoard from './ChatBoard';
import styled from 'styled-components';
import {Container,Button} from 'react-bootstrap';
import {SocketContext} from '../../../store/socketContext';
const AuthFetch = require('../../../fetch/Auth');
const StyledChatBoard = styled(ChatBoard)`
	width : 100%;
	height : 100%;
	margin : 100px;
`;

const StyledContainer = styled(Container)`
	width : 100%;
	height : 100%;
	display : flex;
	margin-top : 20px;
	flex-direction : column;
	align-items : center;
`;

const Chat =()=> {
	
	const [chatFlag,setChatFlag]=useState(false);
	const socket = useContext(SocketContext);
	const enterBtnListener =async()=> {
		const result = await AuthFetch.isSignedFetch();
		if(result.status===200)setChatFlag(true);
		else alert('인증되지 않았다.');
		socket.emit('adduser',result.data);
	}
	
	return(
		<StyledContainer fluid>
			{chatFlag ? <StyledChatBoard/> : <Button onClick={enterBtnListener} variant="primary">채팅으로 들어오세요!</Button>}
		</StyledContainer>
	)
	 
}

export default Chat;