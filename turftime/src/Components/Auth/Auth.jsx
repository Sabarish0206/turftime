import React from 'react'
import AuthForm from './AuthForm';
import { sendUserAuthRequest } from '../../api_helpers/api_helpers';
import { userActions } from '../../Store';
import { useDispatch } from 'react-redux';

const Auth = () => {
  const dispatch =useDispatch();
  const onResponse = (data,isSignUp) =>{
    console.log("Auth after user auth DB request(Auth.jsx):",data);
    if(!isSignUp){
    console.log("isSignup:",isSignUp)
    dispatch(userActions.login({name: data.name, id: data.id}));
    }
    localStorage.setItem("userId",data.id);
  }
  const getData = (data)=>{
    sendUserAuthRequest(data.input,data.signup)
    .then((res)=>onResponse(res,data.signup))
    .catch((err)=>console.log(err));
    
  };
  return (
    
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  )
}

export default Auth;
