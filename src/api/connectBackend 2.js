import axios from 'axios';


async function signUp(signUpInfo){
    
    const body = signUpInfo
    const response = await axios('/api/auth/register', {
        headers: {
            "Content-type": "application/json"
          },
        data:body,
        method: 'POST' 
    }).catch(err => console.log(err));

    return response;
}

async function login(loginInfo){

    const response = await axios('/api/auth/login', {
        headers: {
            "Content-type": "application/json"
          },
        data:loginInfo,
        method: 'POST' 
    }).catch(err => console.log(err));
    return response;
}

async function forgetPassword(email){
    const body = {email:email};
    const response = await axios('/api/auth/forgotpassword', {
        headers: {
            "Content-type": "application/json"
          },
        data:body,
        method: 'POST' 
    }).catch(err => console.log(err));
    return response; 
}

async function resetPassword(pathname, password){
    const body = {password:password};
    const response = await axios(`/api/auth/${pathname}`,{
        headers: {
            "Content-type": "application/json"
          },
          data:body,
          method:"PUT"
    }).catch(err => console.log(err));

}

export {
    signUp,
    login,
    forgetPassword,
    resetPassword
}