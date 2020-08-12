import React from 'react';
import {Switch,Route,useRouteMatch} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Chat from './Chat/Chat';
import File from './File/File';

const Body =()=> {
	
	const { path, url } = useRouteMatch();
	console.log(path);
	return(
		<div>
			<Switch>
				<Route path={`${url}/chat`}>
					<Container><Chat/></Container>
				</Route>
				<Route path={`${url}/fileList`}>
					<Container><File/></Container>
				</Route>
			</Switch>
		</div>
	)
}

export default Body;