import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import styled from 'styled-components';
import ChatMessageList from './ChatBoard/ChatMessageList';
import ChatUserList from './ChatBoard/ChatUserList';
import ChatInput from './ChatBoard/ChatInput';
const io = require('socket.io-client');

const StyledContainer = styled(Container)`
	marginTop : 100px;
`;

const ChatBoard =()=> {
	var chatServerURL = "https://amazingchatapi.run.goorm.io/socket.io";
	var allowedOrigins = "https://amazingchat.run.goorm.io";
	
	return(
		<StyledContainer fluid>
			<Row>
					<Col sm={8}><ChatMessageList/></Col>
					<Col sm={4}><ChatUserList/></Col>
			</Row>
			<ChatInput/>
		</StyledContainer>
	)
}

export default ChatBoard;