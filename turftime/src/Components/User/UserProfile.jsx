import React, { useEffect, useState } from 'react'
import { Box,Avatar, Typography } from '@mui/material'
import { getUser } from '../../api_helpers/api_helpers';
import { useParams } from 'react-router-dom';



const UserProfile = () => {
    const useId = localStorage.getItem("userId")
    const {id} = useParams();
    const [user,setUser] = useState(null);

    useEffect(()=>{
        getUser(id)
        .then((res)=>setUser(res.userWithTurfNames))
        .catch((err)=>console.log(err))
    },[useId])
    console.log("USer:",user)
  return (
    
      <Box  width="100%" display={'flex'} marginTop="100px" >

        {user &&<>
        <Box width="20%" 
        display="flex" 
        flexDirection="column"
        alignItems="center"
        >  

            <Avatar variant="rounded"> User name</Avatar>
            
            <Typography paddingTop={4}>
                    NAME :{user.name}
                </Typography>
                
                <Typography paddingTop={4}>
                    Email:{user.email}
                </Typography>

            </Box> 
    

    <Box width={'50%'}>
    <Typography textAlign={'center'}>BOOKINGS</Typography>
            {user.bookings.map((booking) => (
                <>
                
                <Box display={'flex'} justifyContent="space-between" margin={3} padding={3} sx={{ p: 3, border: '1px solid grey' }}>
                    <Typography  key={booking._id}> 
                        Turf Name: {booking.turfName}
                    </Typography>
                    <Typography >
                    Date: {new Date(booking.date).toLocaleDateString()}
                    </Typography>
                    <Typography >
                    Slot Time: {booking.slotNumber}
                    </Typography>
                </Box>
                </>
                ))}

    </Box>

    </>}
    </Box>

      
  )
}

export default UserProfile
