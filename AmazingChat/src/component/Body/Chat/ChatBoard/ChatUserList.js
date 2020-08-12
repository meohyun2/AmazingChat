import React,{useContext,useState,useEffect} from 'react';
import {ListGroup,Button} from 'react-bootstrap';
import styled from 'styled-components';
import {SocketContext} from '../../../../store/socketContext';
import {UserState} from '../../../../store/userContext';

const StyledListGroup = styled(ListGroup)`
	width : 100%;
	height : 600px;
	overflow : scroll;
`;

const ChatUserList =()=> {
	
	const [userState,setUserState] = useContext(UserState);
	const [userList,setUserList] = useState([]);
	const socket = useContext(SocketContext);
	
	socket.on('users',(users)=>{
		setUserList(users);
	})
	
	const onClickUser =(e)=>{
		setUserState({flag : true,userId : e.target.value});
	}
	
	return(
		<StyledListGroup>
			{userList.map((item,i)=>{
				return(
					<Button value={item.userId} onClick={onClickUser} variant="outline-primary" key={i}>{item.user}</Button>
				)
			})}
		</StyledListGroup>
	)
}

export default ChatUserList;