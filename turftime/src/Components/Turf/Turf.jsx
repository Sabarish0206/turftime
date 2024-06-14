import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import TurfItems from './TurfItems';
import { getAllTurfs } from '../../api_helpers/api_helpers';

const Turf = () => {
  const [turf,setTurf] = useState([]);
  useEffect(()=>{
    getAllTurfs()
    .then((data)=>{setTurf(data.turf)})
    .catch((err)=>console.log(err))
  },[])
  console.log("Turf:",turf);
  return (
    
      <Box width="100%" height="100%" marginTop="80px" > 
      <Typography margin="auto" width="90%" variant='h4' textAlign="center" padding={1} bgcolor="#000000" color="white">
        All Turf
      </Typography>

      <Box display="flex" width="100%" margin="auto" marginTop={3} justifyContent="center" flexWrap="wrap" >
      {turf.map((item,index)=>{
        return <TurfItems 
        id={item.id} 
        turfName={item.turfName} 
        imageUrl={item.posterUrl} 
        description={item.description}
        key={index}
        location={item.location} 
        />}
       ) }
      </Box>

      </Box>
  )
}

export default Turf;
