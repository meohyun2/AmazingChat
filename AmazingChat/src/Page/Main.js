import React,{useContext,useEffect,useState} from 'react';
import SignIn from './Auth/SignIn';
import Home from './Home';
import {UserState,UserStateProvider} from '../store/userContext';
import {Route,useHistory} from 'react-router-dom';
const AuthFetch = require('../fetch/Auth');


const Main=()=>{
	
	const [authFlag,setAuthFlag]=useState(false);
	const history = useHistory();
	
	const setSigned =async()=> {
		const signFlag = await AuthFetch.isSignedFetch();
		console.log(signFlag);
		if(signFlag.status === 200){
			history.push('/home');
		}else{
			history.push('/signin');
		}
	}
	
	useEffect(()=>{
		setSigned();
	},[authFlag])
	
	return(
		<>
		</>
	)
}

export default Main;