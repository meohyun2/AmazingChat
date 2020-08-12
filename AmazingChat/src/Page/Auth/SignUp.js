import React,{useState} from 'react';
import {Container,Button,Form} from 'react-bootstrap'
import styled from 'styled-components';
import {useHistory} from 'react-router-dom'

const User = require('../../fetch/Auth');

const initialState = {
	id : '',
	pwd : '',
	pwdCheck : '',
	nickname : '',
}

const SignUp =()=>{
	const[userInfo,setUserInfo]=useState(initialState);
	const history = useHistory();
	
	const onChangeFormDate =(e)=>{
		const { id , value } = e.target; // 우선 e.target 에서 name 과 value 를 추출
		setUserInfo({
			...userInfo,
			[id] : value
		})
	}
	
	const SignUpBtnAction =async(e)=>{
		e.preventDefault();
		if(userInfo.pwd!==userInfo.pwdCheck){
			alert("비밀번호가 일치하지 않습니다. 다시 입력하세요.");
		}else{
			const {status} = await User.SignUpFetch(userInfo);	
			if(status===200){
				alert('회원가입 성공, 로그인 해주세요.');
				history.goBack();
			}else{
				alert('회원가입 실패');
			}
		}
	}
	
	return(
		<SignUpContainer>
			<h1>회원가입 하세요.</h1>
			<Form>
				<Form.Group controlId="id">
					<Form.Label>아이디</Form.Label>
					<Form.Control onChange={onChangeFormDate} type="id" placeholder="아이디를 입력하세요.(15자 내)" />
				</Form.Group>
				<Form.Group controlId="pwd">
					<Form.Label>비밀번호</Form.Label>
					<Form.Control onChange={onChangeFormDate} type="password" placeholder="비밀번호를 입력하세요(15자 내)" />
				</Form.Group>
				<Form.Group controlId="pwdCheck">
					<Form.Label>비밀번호 확인</Form.Label>
					<Form.Control onChange={onChangeFormDate} type="password" placeholder="비밀번호를 동일하게 입력하세요." />
				</Form.Group>
				<Form.Group controlId="nickname">
					<Form.Label>별명</Form.Label>
					<Form.Control onChange={onChangeFormDate} type="nickname" placeholder="별명을 입력하세요" />
				</Form.Group>
				<Button onClick={SignUpBtnAction} block={true} type="submit" variant="success">회원가입</Button>
			</Form>
		</SignUpContainer>
	)
}

const SignUpContainer = styled(Container)`
	margin-top:20%;
`;

export default SignUp;