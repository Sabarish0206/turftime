import React, { useEffect, useState } from "react";
import {AppBar, Toolbar, Autocomplete, TextField, Tab, Tabs, IconButton,useMediaQuery, useTheme} from "@mui/material";
import GrassTwoToneIcon from '@mui/icons-material/GrassTwoTone';
import { Box }from "@mui/system";
import { getAllTurfs } from "../api_helpers/api_helpers";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../Store";

const Header = ()=>{

    const isAdminLogedIn =useSelector((state)=>state.admin.isLogedIn);
    const isUserLogedIn =useSelector((state)=>state.user.isLogedIn);

    const userId = localStorage.getItem("userId");
    const adminId = localStorage.getItem("adminId");

    const dispatch = useDispatch();

    const [value,setValue] = useState(0);

    const [turf,setTurf] = useState([]);

    useEffect(()=>{
    getAllTurfs()
    .then((data)=>setTurf(data.turf))
    .catch((err)=>console.log(err));
    },[]);

    const logOut = (isAdmin)=>{
        isAdmin ? dispatch(adminActions.logout()) : dispatch(userActions.logout())
    }

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
    <div>
        <AppBar sx={{bgcolor:"#2b2d42"}}>
            <Toolbar>
                <Box width={"20%"} marginRight={"auto"}>
                    <IconButton LinkComponent={Link} to="/" sx={{color:"white"}}>
                        <GrassTwoToneIcon/>
                    </IconButton>
                </Box>
                { !isSmallScreen &&
                <Box width={"30%"} margin="auto" >
                    <Autocomplete 
                        disabled={isSmallScreen}
                        id="free-solo-demo"
                        search
                        options={turf.map((option) => option.turfName)}
                        renderInput={(params) =>
                        <TextField sx={{input:{color:"white"}}} 
                        variant="standard" {...params} 
                        placeholder="Search" 
                        />}
                    />
                </Box>
                }
                <Box paddingLeft={"40px"} marginLeft={"auto"}>
                    <Tabs textColor="white" 
                    indicatorColor="secondary" 
                    //value={} 
                    onChange={(e,val)=>{setValue(val)}}
                >


                        <Tab LinkComponent={Link} to="/turf"  label="Turf"/>

                        {!isUserLogedIn && !isAdminLogedIn &&
                        <>
                            <Tab LinkComponent={Link} to="/auth"  label="Auth"/>
                            <Tab LinkComponent={Link} to="/admin" label="Admin"/>
                        </>}
                        {isUserLogedIn &&
                        <>
                    <Tab LinkComponent={Link} to={`/user/${userId}`}  label="Profile"/>
                        <Tab  onClick={()=>{logOut(false)}} LinkComponent={Link} to="/" label="LogOut"/>
                        </>
                        }
                        {
                            isAdminLogedIn && 
                            <>
                            <Tab LinkComponent={Link} to={`/admin/${adminId}`}  label="Profile"/>
                            <Tab LinkComponent={Link} to="/admin/add"  label="AddTurf"/>
                            <Tab onClick={()=>{logOut(true)}} LinkComponent={Link} to="/" label="LogOut"/>
                            </>
                        }
                        
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    </div>
    )
}

export default Header;