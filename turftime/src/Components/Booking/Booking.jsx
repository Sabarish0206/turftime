import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { bookTurf, getTurf } from '../../api_helpers/api_helpers';
import TurfItems from '../Turf/TurfItems';

const Booking = () => {
  
  const turfId = useParams().id;

  const userId = localStorage.getItem("userId");

  const [data,setData] =useState({});
  const [isBooking,setIsBooking] = useState(false);

  useEffect(()=>{
    console.log("Turfid:",turfId);
    getTurf(turfId)
    .then((res)=>{setData(res.turf)})
    .then(console.log(data))
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


    <Box paddingTop={5} width={'100%'} display={'flex'}>

      <Box width={'30%'}>
        <TurfItems 
          id={data._id}
          turfName={data.turfName} 
          imageUrl={data.posterUrl}  
          description={data.description}
          location={data.location} 
          />
      </Box>

      <Box width={'70%'}>
        {data.slots &&
          data.slots.map((slot,index)=>(

            <Box display={'flex'} width={'70%'} margin={2} sx={{ p: 3, border: '1px solid grey' }}>

            <Typography marginRight={'auto'}>
            slot {index}
            </Typography>

            <Typography margin={'auto'}>
            {new Date(slot.date).toLocaleDateString()}
            </Typography>

            <Typography margin={'auto'}>
            {slot.time}
            </Typography>

            { !slot.isBooked ?
            <Button onClick={() => handleBooking(slot._id,slot.date,slot.time)} variant="outlined" disabled={isBooking}>Book</Button>
             :
            <Button variant="outlined" disabled>Booked</Button>
            }
            </Box>
          ))
        }
      </Box>
   
    </Box>
      
    </div>
  ) 
}

export default Booking
