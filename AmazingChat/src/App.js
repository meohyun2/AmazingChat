import React,{useContext} from 'react';
import Main from './Page/Main'
import {UserStateProvider} from './store/userContext'; 
import {SocketContextProvider} from './store/socketContext'; 
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignIn from './Page/Auth/SignIn';
import SignUp from './Page/Auth/SignUp';
import Home from './Page/Home';

const App=()=>{
	
	return(
		<SocketContextProvider>
			<UserStateProvider>
				<Router>
					<Switch>
						<Route path="/" exact={true} component={Main}/>
						<Route path="/home" component={Home}/>
						<Route path="/signin" component={SignIn}/>
						<Route path="/signup" component={SignUp}/>
					</Switch>
				</Router>
			</UserStateProvider>	
		</SocketContextProvider>
	)
}

export default App;
