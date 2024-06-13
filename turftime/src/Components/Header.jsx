import React, { useEffect, useState } from "react";
import {AppBar, Toolbar, Autocomplete, TextField, Tab, Tabs} from "@mui/material";
import GrassTwoToneIcon from '@mui/icons-material/GrassTwoTone';
import { Box }from "@mui/system";
import { getAllTurfs } from "../api_helpers/api_helpers";

const Header = ()=>{
    const [value,setValue] = useState(0);
    const [turf,setTurf] = useState([]);
    useEffect(()=>{
    getAllTurfs()
    .then((data)=>setTurf(data.turf))
    .catch((err)=>console.log(err));
    },[]);
    return (
    <div>
        <AppBar sx={{bgcolor:"#2b2d42"}}>
            <Toolbar>
                <Box width={"20%"} marginRight={"auto"}>
                    <GrassTwoToneIcon/>
                </Box>
                
                <Box width={"30%"} margin="auto" >
                    <Autocomplete 
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

                <Box paddingLeft={"40px"} marginLeft={"auto"}>
                    <Tabs textColor="white" 
                    indicatorColor="secondary" 
                    value={value} 
                    onChange={(e,val)=>{setValue(val)}}>
                        <Tab  label="Signup"/>
                        <Tab label="Turf"/>
                        <Tab  label="Admin"/>
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    </div>
    )
}

export default Header;