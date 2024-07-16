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

    const [value,setValue] = useState(null);

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


    const tabs = [
        { label: "Turf", to: "/turf" },
        ...(!isUserLogedIn && !isAdminLogedIn ? [
          { label: "Auth", to: "/auth" },
          { label: "Admin", to: "/admin" },
        ] : []),
        ...(isUserLogedIn ? [
          { label: "Profile", to: `/user/${userId}` },
          { label: "LogOut", to: "/", onClick: () => {logOut(false);
            setValue(0);
          } },
        ] : []),
        ...(isAdminLogedIn ? [
          { label: "Profile", to: `/admin/${adminId}` },
          { label: "AddTurf", to: "/admin/add" },
          { label: "LogOut", to: "/", onClick: () => {logOut(true);
            setValue(0);
          } },
        ] : []),
      ];

    return (
    <div>
        <AppBar sx={{bgcolor:"#2b2d42"}}>
            <Toolbar>
                <Box width={"20%"} marginRight={"auto"}>
                    <IconButton onClick={()=>{setValue(null)}} LinkComponent={Link} to="/" sx={{color:"white"}}>
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
                    value={value} 
                    onChange={(e,val)=>{setValue(val)}}
                    >

                        {tabs.map((tab, index) => (
                                <Tab
                                    key={tab.label}
                                    LinkComponent={Link}
                                    to={tab.to}
                                    label={tab.label}
                                    onClick={tab.onClick}
                                />
                                ))}
                    </Tabs>

                </Box>
            </Toolbar>
        </AppBar>
    </div>
    )
}

export default Header;