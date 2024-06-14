import { Box, Button, Typography} from '@mui/material';
import React, { useEffect, useState } from 'react';
import TurfItems from './Turf/TurfItems';
import { Link } from "react-router-dom";
import { getAllTurfs } from '../api_helpers/api_helpers';

const Homepage = () => {
  const [turf,setTurf] = useState([]);
 useEffect(()=>{
    getAllTurfs()
    .then((res)=>setTurf(res.turf))
    .catch((err)=>console.log(err))
  },[])
  console.log("Homepage:",turf)
  return (
    <div>
    
      Homepage
      <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={"50px"} >
        
        <Box textAlign={"center"} width={"100%"} height={"40vh"}>
            <img width={"80%"} height={"100%"} margin={"auto"}
            src="https://static.vecteezy.com/system/resources/thumbnails/006/981/368/small_2x/artificial-turf-of-soccer-football-field-photo.jpg"
            alt="turf" />
        </Box>

        <Box padding={5} margin={"auto"}>
          <Typography variant='h4' textAlign={"center"}>TURF ' S</Typography>
        </Box>

        <Box display="flex" 
             width="80%" 
             justifyContent="center" 
             flexWrap={"wrap"}
             margin={"auto"}
        > 
        {turf.slice(0,2).map((item,index)=> 
        <TurfItems 
        id={item.id} 
        turfName={item.turfName} 
        imageUrl={item.posterUrl} 
        description={item.description} 
        key={index}
        location={item.location} />)}
          
        </Box>

        <Box display={"flex"} padding={5} margin={"auto"}>
          <Button  
           color="secondary" 
           variant='outlined'
           sx={{margin:"auto",color:"#2b2d42"}}
           LinkComponent={Link} to="/turf"
          >
              View All Turfs
          </Button>
        </Box>

      </Box>
    </div>
  )
}

export default Homepage
