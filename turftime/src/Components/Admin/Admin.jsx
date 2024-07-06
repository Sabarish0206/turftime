import React, { useState } from 'react'
import AuthForm from '../Auth/AuthForm'
import { sendAdminAuthRequest} from '../../api_helpers/api_helpers';
import { useDispatch } from 'react-redux';
import { adminActions } from '../../Store';
import { Box,Alert,AlertTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const [isAdminCorrect,setIsAdminCorrect] = useState(true);
  const onResponse = ((data)=>{
    console.log("Admin after Db request (admin.jsx):",data);
    dispatch(adminActions.login());
    localStorage.setItem("adminId",data.id);
    localStorage.setItem("token",data.token);
    navigate('/')
  })
  
  const getData = (data)=>{
    sendAdminAuthRequest(data.input,data.signup)
    .then((res)=>{
      if(res===undefined){
        setIsAdminCorrect(false);
      }else{
        onResponse(res)
      }})
    .catch((err)=>{console.log(err)})
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true}/>
{
      !isAdminCorrect &&
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

export default Admin
