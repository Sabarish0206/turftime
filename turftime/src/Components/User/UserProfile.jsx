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
      <Box  width="100%" 
       marginTop="100px" >

      <Box width="50%" 
       display="flex" 
       flexDirection="column"
       alignItems="center"
       >  

            <Avatar variant="rounded"> User name</Avatar>
          {user &&<> 
          <Typography paddingTop={4}>
                NAME :{user.name}
            </Typography>
            
             <Typography paddingTop={4}>
                Email:{user.email}
            </Typography>


            {user.bookings.map((booking) => (
                <>
                    <Typography paddingTop={4} key={booking._id}> 
                        Turf Name: {booking.turfName}
                    </Typography>
                    <Typography paddingTop={4}>
                    Date: {new Date(booking.date).toLocaleDateString()}
                    </Typography>
                    <Typography paddingTop={4}>
                    Slot Time: {booking.slotNumber}
                    </Typography>
                    </>
                ))}

            </> 
            }
            </Box>
            
      </Box>
  )
}

export default UserProfile
