import { Box, Button, Typography} from '@mui/material'
import React from 'react'
import TurfItems from './Turf/TurfItems'

const Homepage = () => {
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
        {[1,2,3,4].map((item)=><TurfItems key={item}/>)}
          
        </Box>

        <Box display={"flex"} padding={5} margin={"auto"}>
          <Button variant='outlined' sx={{margin:"auto",color:"#2b2d42"}}>
              View All Movies
          </Button>
        </Box>

      </Box>
    </div>
  )
}

export default Homepage
