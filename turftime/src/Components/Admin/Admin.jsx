import React from 'react'
import AuthForm from '../Auth/AuthForm'
import { sendAdminAuthRequest} from '../../api_helpers/api_helpers';
import { useDispatch } from 'react-redux';
import { adminActions } from '../../Store';

const Admin = () => {
  const dispatch = useDispatch();
  const onResponse = ((data)=>{
    console.log("Admin after Db request (admin.jsx):",data);
    dispatch(adminActions.login());
    localStorage.setItem("adminId",data.id);
    localStorage.setItem("token",data.token)
  })
  
  const getData = (data)=>{
    sendAdminAuthRequest(data.input,data.signup)
    .then(onResponse)
    .catch((err)=>{console.log(err)})
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true}/>
    </div>
  )
}

export default Admin
