import axios from 'axios';


async function signUp(signUpInfo){
    
    const body = signUpInfo
    const response = await axios('https://nzcsa-backend.herokuapp.com/api/auth/register', {
        headers: {
            "Content-type": "application/json"
          },
        data:body,
        method: 'POST' 
    })

    return response;
}

async function login(loginInfo){

    const response = await axios('https://nzcsa-backend.herokuapp.com/api/auth/login', {
        headers: {
            "Content-type": "application/json"
          },
        data:loginInfo,
        method: 'POST' 
        })
    return response;
}

async function forgetPassword(email){
    const body = {email:email};
    const response = await axios('https://nzcsa-backend.herokuapp.com/api/auth/forgotpassword', {
        headers: {
            "Content-type": "application/json"
          },
        data:body,
        method: 'POST' 
    })
    return response; 
}

async function resetPassword(pathname, password){
    const body = {password:password};
    const response = await axios(`https://nzcsa-backend.herokuapp.com/api/auth/${pathname}`,{
        headers: {
            "Content-type": "application/json"
          },
          data:body,
          method:"PUT"
    })
    return response;
}

async function signUpEvent(registerInfo){
    const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };
    const response = await axios.post('https://nzcsa-backend.herokuapp.com/api/private/sign-up-event',
        registerInfo,
        config);

    return response;
}

export {
    signUp,
    login,
    forgetPassword,
    resetPassword,
    signUpEvent,
}