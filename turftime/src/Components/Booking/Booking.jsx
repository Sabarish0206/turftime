import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { bookTurf, getTurf } from '../../api_helpers/api_helpers';
import TurfItems from '../Turf/TurfItems';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const navigate = useNavigate();
  const turfId = useParams().id;
    const isUserLogedIn =useSelector((state)=>state.user.isLogedIn);
  const userId = localStorage.getItem("userId");

  const [data,setData] =useState({});
  const [isBooking,setIsBooking] = useState(false);

  useEffect(()=>{
    getTurf(turfId)
    .then((res)=>{setData(res.turf)})
    .catch((err)=>{console.log(err);})
  },[turfId])

  const handleBooking = async (slotId, date,time) => {
    try {
      await bookTurf(turfId, slotId, userId, date,time)
      .then(
      setData((prevData) => {
        const updatedSlots = prevData.slots.map((slot) => {
          if (slot._id === slotId) {
            return { ...slot, isBooked: true };
          }
          return slot;
        });
        return { ...prevData, slots: updatedSlots };
      }))
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
    <Box paddingTop={8} width={'100%'}>
      <Typography textAlign={'center'} >
        Booking page
      </Typography>
    </Box>


    <Box marginLeft={3} paddingTop={5} display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }}>

      <Box width={'auto'} display={'flex'} justifyContent="center" height={'5%'}>
        <TurfItems 
          id={data._id}
          turfName={data.turfName} 
          imageUrl={data.posterUrl}  
          description={data.description}
          location={data.location} 
          />
      </Box>

      <Box width={{xs:'100%',sm:'70%'}} margin={{xs:'auto'}}>
        {data.slots &&
          data.slots.map((slot,index)=>(

            <Box display={'flex'} justifyContent="center" width={{ xs: 'auto', sm: '70%' }} margin={2 } sx={{p: 3, border: '1px solid grey', borderRadius:5,
              ":hover":{boxShadow:"10px 10px 20px  #ccc",}}} >

            <Typography marginRight={'auto'}>
            slot {index}
            </Typography>

            <Typography margin={'auto'}>
            {new Date(slot.date).toLocaleDateString()}
            </Typography>

            <Typography margin={'auto'}>
            {slot.time}
            </Typography>

            
      {(!isUserLogedIn && !slot.isBooked) && (
        <Button variant="outlined" onClick={()=>navigate('/auth')}>
          Login to Book
        </Button>
      )}

      {(isUserLogedIn && !slot.isBooked) && (
        <Button onClick={() => handleBooking(slot._id, slot.date, slot.time)} variant="outlined" disabled={isBooking}>
          Book
        </Button>)
      }

      {(isUserLogedIn && slot.isBooked) && (
        <Button variant="outlined" disabled>
          Booked
        </Button>)
      }

      {(!isUserLogedIn && slot.isBooked) &&(
        <Button variant="outlined" disabled>
          Booked
        </Button>)
      }
            
      </Box>))
    }
      </Box>
   
    </Box>
      
    </div>
  ) 
}

export default Booking
