import React,{useContext} from 'react';
import {Nav,Navbar,Container,Button} from 'react-bootstrap';
import {useHistory,Switch,Link,Router,Route,useRouteMatch} from 'react-router-dom';
import styled from 'styled-components';
import {SocketContext} from '../../store/socketContext';
const AuthFetch = require('../../fetch/Auth');

const Header =()=> {
	
	const socket = useContext(SocketContext);
	const history = useHistory();
	const { path, url } = useRouteMatch();
	console.log(path,url);
	const LogoutBtnAction =async()=> {
		// 세션을 삭제하고, 리다이렉션
		const result = await AuthFetch.logoutFetch();
		if(result){
			socket.emit('disconnectUser');
			console.log(result);
			alert('로그아웃 됩니다.');
			history.push('/');
		}else{
			console.log("뭐지에러,,");
		}
	}
	
	return(
		<div>
			<Navbar bg="dark" variant="dark">
			<a href="https://amazingchat.run.goorm.io/"><Navbar.Brand><h1>Amazing Chat</h1></Navbar.Brand></a>
			<Nav className="mr-auto">
				<Nav.Link href={`${url}/chat`}>채팅하기</Nav.Link>
      	<Nav.Link href={`${url}/fileList`}>파일공유</Nav.Link>
			</Nav>
				<Button onClick ={LogoutBtnAction} variant="primary">로그아웃</Button>
  		</Navbar>
		</div>
	)
}

export default Header;