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
  return (
    
      <Box  width="100%" display={'flex'} marginTop="100px"  flexDirection={{ xs: 'column', sm: 'row' }}>

        {user &&<>
        <Box margin={{xs:'auto',sm:1}} textAlign={'center'} width="20%" display="flex" flexDirection="column" alignItems="center">  
        <Avatar variant="rounded"> <PersonIcon/></Avatar>
         <Box textAlign={'center'} alignItems="center">
            <Typography textTransform={'capitalize'} variant='h6' paddingTop={2}>
                 {user.name}
                </Typography>
                
                <Typography textTransform={'lowercase'} variant='button' paddingTop={1} paddingBottom={2} gutterBottom>
                    {user.email}
                </Typography>
        </Box>
            </Box> 
    
{user.bookings.length !==0 ?
    <Box width={{xs:'auto',sm:'70%'}} margin={{xs:'auto'}}> 
    <Typography marginTop={1} variant="h6" textAlign={'center'}>MY BOOKINGS</Typography>
            {user.bookings.map((booking) => (
                <>
                
                <Box display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" margin={3} sx={{p: 3, border: '1px solid grey', borderRadius:5,
              ":hover":{boxShadow:"10px 10px 20px  #ccc",}}}>
                    <Typography margin={1}  key={booking._id}> 
                        Turf Name: {booking.turfName}
                    </Typography>
                    <Typography margin={1} >
                    Date: {new Date(booking.date).toLocaleDateString()}
                    </Typography>
                    <Typography margin={1} >
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
