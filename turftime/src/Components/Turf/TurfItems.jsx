import React from 'react'
import {Card,CardMedia,Typography,CardContent,CardActions,Button} from '@mui/material'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Block } from '@mui/icons-material';

const TurfItems = ({id,imageUrl,turfName,description,location,price}) => {
  return (
    <Card sx={{ width: 270,height:"auto",borderRadius:5,
    ":hover":{
        boxShadow:"10px 10px 20px #ccc",
    },margin:2
     }}>
    <CardMedia
      sx={{ height: 140 }}
      image={imageUrl}
      title="green iguana"
    />
    <CardContent>
     
      <Typography variant="h5" component="div" gutterBottom>
        {turfName}
      </Typography>
        <Typography variant="subtitle1" color="text.secondary">
        {description}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
        {location}
        </Typography>
      <Typography  variant="subtitle1" display={'block'} color="text.secondary" gutterBottom>
        Price:₹{price}
      </Typography>
     
      
    </CardContent>
    <CardActions>
      <Button LinkComponent={Link} to={`/booking/${id}`} sx={{margin:"auto",paddingBottom:3}} size="small">Book</Button>
    </CardActions>
  </Card>
  )
}

export default TurfItems;
