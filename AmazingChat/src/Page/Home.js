import React,{useEffect,useContext} from 'react';
import {UserState} from '../store/userContext';
import Header from '../component/Header/Header';
import Body from '../component/Body/Body';
import {useHistory} from 'react-router-dom';

const authFetch = require('../fetch/Auth');

const Home =()=>{
	
	const history = useHistory();
	
	const checkAuth =async()=> {
		const result = await authFetch.isSignedFetch();
		console.log(result);
		if(result.status===302){
			// redirect
			history.push('/');
		}
	};
	
	useEffect(()=>{
		checkAuth();
	},[]);
	
	return(
		<div>
			<Header/>
			<Body/>
			<h1>채팅과 파일 공유를 이용하세요.</h1>
		</div>
	)
}

export default Home;