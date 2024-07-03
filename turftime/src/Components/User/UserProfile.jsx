import React, { useEffect, useState } from 'react'
import { Box,Avatar, Typography } from '@mui/material'
import { getUser } from '../../api_helpers/api_helpers';
import { useParams } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

const UserProfile = () => {
    const userId = localStorage.getItem("userId")
    const {id} = useParams();
    const [user,setUser] = useState(null);

    useEffect(()=>{
        getUser(id)
        .then((res)=>setUser(res.userWithTurfNames))
        .catch((err)=>console.log(err))
    },[userId])
    console.log("USer:",user)
  return (
    
      <Box  width="100%" display={'flex'} marginTop="100px" >

        {user &&<>
        <Box width="20%" 
        display="flex" 
        flexDirection="column"
        alignItems="center"
        >  
        <Avatar variant="rounded"> <PersonIcon/></Avatar>

        <Box textAlign={'center'} alignItems="center">
            <Typography textTransform={'capitalize'} variant='h6' paddingTop={2}>
                 {user.name}
                </Typography>
                
                <Typography textTransform={'lowercase'} variant='subtitle2' paddingTop={1}>
                    {user.email}
                </Typography>
        </Box>
            </Box> 
    
{user.bookings.length !==0 ?
    <Box width={'70%'}> 
    <Typography textAlign={'center'}>BOOKINGS</Typography>
            {user.bookings.map((booking) => (
                <>
                
                <Box display={'flex'} justifyContent="space-between" margin={3} sx={{p: 3, border: '1px solid grey', borderRadius:5,
              ":hover":{boxShadow:"10px 10px 20px  #ccc",}}}>
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
     : <Box width={'70%'}>
             <Typography textAlign={'center'}>No Bookings created</Typography>
        </Box>
        }
    </>}
    </Box>

      
  )
}

export default UserProfile
