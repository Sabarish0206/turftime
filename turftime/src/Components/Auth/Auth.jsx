import React, { useState,useEffect } from 'react'
import AuthForm from './AuthForm';
import { sendUserAuthRequest } from '../../api_helpers/api_helpers';
import { userActions } from '../../Store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box,Alert,AlertTitle } from '@mui/material';


const Auth = () => {
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const [isAuthCorrect,setIsAuthCorrect]=useState(true)


  const onResponse = (data,isSignUp) =>{
    console.log("Auth after user auth DB request(Auth.jsx):",data);
    if(data!==undefined){
    if(!isSignUp){
    console.log("isSignup:",isSignUp)
    dispatch(userActions.login({name: data.name, id: data.id}));
    }
    localStorage.setItem("userId",data.id);
    navigate('/')
  }
  }


  const getData = (data)=>{
    sendUserAuthRequest(data.input,data.signup)
    .then((res)=>{console.log("Res:",res);
      if(res===undefined){
        setIsAuthCorrect(false);
      }else{
        onResponse(res,data.signup)
      }})
    .catch((err)=>{setIsAuthCorrect(false)})
  };


  return (
    
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
      {
          !isAuthCorrect &&
          <>
            <Box width={'100'} paddingTop={10}>
              <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Enter the correct email id and password.</Alert>
            </Box>
            
          </>
      }
    </div>
  )
}

export default Auth;
