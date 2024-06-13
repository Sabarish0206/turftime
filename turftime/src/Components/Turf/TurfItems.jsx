import React from 'react'
import {Card,CardMedia,Typography,CardContent,CardActions,Button} from '@mui/material'

function TurfItems() {
  return (
    <Card sx={{ width: 250,height:360,borderRadius:5,
    ":hover":{
        boxShadow:"10px 10px 20px #ccc",
    },margin:2
     }}>
    <CardMedia
      sx={{ height: 140 }}
      image=""
      title="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Lizard
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography>
    </CardContent>
    <CardActions>
      <Button sx={{margin:"auto"}} size="small">Share</Button>
    </CardActions>
  </Card>
  )
}

export default TurfItems;
