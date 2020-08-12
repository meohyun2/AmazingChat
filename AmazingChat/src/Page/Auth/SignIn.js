import React,{useState,useContext,useEffect} from 'react';
import styled from 'styled-components';
import {Container,Button,Form} from 'react-bootstrap';
import {useHistory,Redirect} from 'react-router-dom';
import {UserState} from '../../store/userContext';

const User = require('../../fetch/Auth');

const SignIn =()=> {
	
	const [userState,setUserState] = useContext(UserState);
	const[id,setId] = useState();
	const[pwd,setPwd] = useState();
	const history = useHistory();
	
	const SignUpBtnAction =()=> {
		history.push("/signUp");
	}
	
	const authSubmit =async(event)=> {
		event.preventDefault();
		const {status} = await User.SignInFetch(id,pwd);
		if(status===200){
			alert('로그인 성공');
			setUserState(true);
			history.push('/home');
		}else{
			alert('로그인 실패');
		}
	}
	
	const onChangeId =(event)=>{
		setId(event.target.value);
	}
	const onChangePwd =(event)=>{
		setPwd(event.target.value);
	}
	
	return(
		<StyledContainer fluid>
			<h1>로그인 하세요</h1>
			<Form onSubmit ={authSubmit}>
				<Form.Group controlId="formId">
					<Form.Label>ID</Form.Label>
					<Form.Control onChange={onChangeId}type="id" placeholder="아이디를 입력하세요." />
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control onChange={onChangePwd}type="password" placeholder="Password" />
				</Form.Group>
				<Form.Group controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="Check me out" />
				</Form.Group>
				<Button block="true" variant="primary" type="submit">
					Sign In
				</Button>
				<Button onClick={SignUpBtnAction} block="true" variant="success">
					Sign Up
				</Button>
			</Form>
		</StyledContainer>
	)
}

const StyledContainer = styled(Container)`
	margin-top : 10%;
	display:flex;
	flex-direction:column;
	align-items:center;
	justity-content:center;
`;

export default SignIn;