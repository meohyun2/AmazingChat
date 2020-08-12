const fetch = require('node-fetch');

module.exports = {
  SignUpFetch : ({id,pwd,nickname})=>{
		console.log("호출되었음");
    const signUpURL = `https://amazingchatapi.run.goorm.io/auth/signUp`;
    return fetch(signUpURL,{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json;charset=utf-8'
      }, 
      body : JSON.stringify(
      {
        id:id,
        pwd:pwd,
				nickname:nickname
      }
      )
    })
    .then(res=>res.json())
		.then(json=>json)
    .catch((err)=>{
      console.log("에러발생했네요.. : "+err);
    })
  },
	
	SignInFetch : (id,pwd)=> {
		const signInURL = `https://amazingchatapi.run.goorm.io/auth/signIn`;
		return fetch(signInURL,{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json;charset=utf-8'
      }, 
      body : JSON.stringify(
      {
        id:id,
        pwd:pwd
      },
      ),
			credentials: 'include'
    })
    .then((res)=>{
			//세션id를 쿠키로 저장하자.
			return res.json();
    })
    .catch((err)=>{
      console.log("에러발생했네요.. : "+err);
    })
	},
	
	isSignedFetch : ()=> {
		const isSignedURL = `https://amazingchatapi.run.goorm.io/auth/isSigned`;
		return fetch(isSignedURL,{
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json;charset=utf-8'
      },
			credentials: 'include'
    })
    .then((res)=>{
			//세션id를 쿠키로 저장하자.
			console.log(res);
			return res.json();
    })
		.then((res)=>{return res;})
    .catch((err)=>{
      console.log("에러발생했네요.. : "+err);
    })
	},
	
	logoutFetch : ()=>{
		const logoutURL = `https://amazingchatapi.run.goorm.io/auth/logout`;
		return fetch(logoutURL,{
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json;charset=utf-8'
      },
			credentials: 'include'
    })
    .then((res)=>{
			return res.json();
    })
		.then((res)=>res)
    .catch((err)=>{
      console.log("에러발생했네요.. : "+err);
    })
	}
}