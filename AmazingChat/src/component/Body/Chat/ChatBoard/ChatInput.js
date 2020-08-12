import React,{useRef,useState,useEffect,useContext} from 'react';
import {InputGroup,FormControl,Button,Form} from 'react-bootstrap';
import {SocketContext} from '../../../../store/socketContext';
import {UserState} from '../../../../store/userContext';

const AuthFetch = require('../../../../fetch/Auth');

const initialState = {
	msg : '',
}


const ChatInput =(props)=> {
	
	const [userState,setUserState] = useContext(UserState);
	const [Message,setMessage] = useState(initialState);
	const inputRef = useRef();
	const socket = useContext(SocketContext);
	
	// 메시지 전송
	const msgSendEvent =async(e)=>{
		e.preventDefault();
		const result = await AuthFetch.isSignedFetch();
		if(userState.flag&&result){
			// 귓속말 flag true
			alert('귓속말을 보냅니다.');
			socket.emit('whisper',userState.userId,Message.msg,result.data);
			setUserState({...userState,["flag"]:false});
		}else{
			alert('메시지를 입력합니다.');
			socket.emit("chat",Message.msg,result.data);
		}
		inputRef.current.value=''
	}
	
	// 메시지 상태 변화
	const onChangeInputData =(e)=>{
		const { id , value } = e.target; // 우선 e.target 에서 name 과 value 를 추출
		setMessage({
			[id] : value
		});
	}
	
	return(
		<Form onSubmit = {msgSendEvent}>
			<InputGroup>
				<FormControl
					ref={inputRef}
					placeholder="메시지를 입력하세요."
					aria-label="메시지를 입력하세요."
					aria-describedby="basic-addon2"
					id="msg"
					onChange ={onChangeInputData}
				/>
				{()=> userState.flag ? <p>귓속말</p>:<></>}
				<InputGroup.Append>
					<Button variant="outline-secondary"> 전송 </Button>
				</InputGroup.Append>
			</InputGroup>
		</Form>
	)
}

export default ChatInput;