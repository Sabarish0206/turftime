import { Dialog, Typography,Box,TextField,Button, IconButton } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React, { useState } from 'react'

const AuthForm = ({onSubmit,isAdmin}) => {
    const [input,setInput] = useState({
        name:"",
        email:"",
        password:""
    })
    const [isSignup,setIsSignup] = useState(false);


    const handleChange = (e)=>{
        setInput((prevInput)=>({
            ...prevInput,
            [e.target.name]: e.target.value,
        }));
    };

    const [open,setOpen]= useState(true)

    const close=()=>{
        setOpen(!open);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        onSubmit({input, signup: isAdmin ? false :isSignup});
        setInput({
            name:"",
            email:"",
            password:""
        })
       };

  return (
    <Box>
    <Dialog PaperProps={{style:{borderRadius:20}}} open={open}>
    <Box sx={{ml:"auto",padding:1}}><IconButton onClick={close}><CloseRoundedIcon/></IconButton></Box>
    
    <Typography variant='h4'  textAlign="center" paddingBottom="30px">
    {isSignup?"SIGNUP":"LOGIN"}
    </Typography>
    <Box  paddingBottom="70px" paddingRight="70px" paddingLeft="70px"
        component="form" onSubmit={handleSubmit}
        sx={{textAlign:"center", display: 'flex', flexDirection: 'column', gap: 2, margin: 'auto',paddingBottom:"10%",width:"auto"}}
    >
{isSignup && <>
    <TextField
    variant='standard'
    label="Username"
    value={input.name}
    onChange={handleChange}
    name="name"
    fullWidth
    />
    </>
}
  <TextField
    variant='standard'
    label="Email"
    name="email"
    type="email"
    value={input.email}
    onChange={handleChange}
    fullWidth
  />
  <TextField
    value={input.password}
    onChange={handleChange}
    variant='standard'
    label="Password"
    name="password"
    type="password"



    fullWidth
  />
    <Button type="submit" variant="contained" color="primary">
    {isSignup?"SIGNUP":"LOGIN"}
  </Button>

 {!isAdmin && <Button onClick={()=>setIsSignup(!isSignup)} variant="text" color="primary">
    Switch to {isSignup?"Login":"Signup"}
  </Button>}
 
  
</Box>
  </Dialog>
  </Box>
      
  )
}

export default AuthForm
