const fetch = require('node-fetch');

module.exports = {
	getAllChat : ()=> {
		const serverURL = `https://amazingchatapi.run.goorm.io/chat/chatList`;
		return fetch(serverURL,{
			method : 'GET',
			headers : {
        'Content-Type' : 'application/json;charset=utf-8'
      },
			credentials: 'include'
		})
		.then((res)=>res.json())
		.then((res)=>res)
		.catch((err)=>{console.log(err)});
	}
}