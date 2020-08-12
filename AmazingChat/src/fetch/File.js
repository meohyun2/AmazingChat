const fetch = require('node-fetch');

module.exports = {
  getFileListFetch : ()=>{
		const fileListURL = `https://amazingchatapi.run.goorm.io/file/list`;
    return fetch(fileListURL,{
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json;charset=utf-8'
      },
			credentials: 'include'
    })
		.then((res)=>res.json())
		.then((res)=>{console.log(res)})
		.catch((err)=>console.log(err));
	}
}