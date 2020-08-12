import React,{useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import {UserState} from '../../store/userContext';

const AuthRouter = (component:Component,render,...rest)=> {
	
	const [userContext,setUserContext] = useContext(UserState);
	
	return(
		<Route
      {...rest}
      render={(props) =>
        userContext ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
	)
}

export default AuthRouter;