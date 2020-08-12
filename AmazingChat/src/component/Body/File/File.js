import React,{useEffect} from 'react';
const FileFetch = require('../../../fetch/File');

const File =()=> {
	
	const Fetch =()=> {
		FileFetch.getFileListFetch()
	}
	
	useEffect(()=>{
		Fetch();
	},[])
	
	return(
		<div>
			<h1>파일 바디 렌더링</h1>
		</div>
	)
}

export default File;