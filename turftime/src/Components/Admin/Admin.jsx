import React from 'react'
import AuthForm from '../Auth/AuthForm'
import { sendAdminAuthRequest} from '../../api_helpers/api_helpers';

const Admin = () => {
  const getData = (data)=>{
    console.log("Admin",data);
    sendAdminAuthRequest(data.input,data.signup)
    .then((data)=>{console.log("Response from admin auth :",data)})
    .catch((err)=>{console.log(err)})
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true}/>
    </div>
  )
}

export default Admin
