import React from 'react'
import {Card,CardMedia,Typography,CardContent,CardActions,Button} from '@mui/material'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TurfItems = ({id,imageUrl,turfName,description,location}) => {
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
      <Typography gutterBottom variant="h5" component="div">
        {turfName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
      <Typography variant="body" color="text.secondary">
        {location}
      </Typography>
    </CardContent>
    <CardActions>
      <Button LinkComponent={Link} to={`/booking/${id}`} sx={{margin:"auto",paddingBottom:3}} size="small">Book</Button>
    </CardActions>
  </Card>
  )
}

export default TurfItems;
