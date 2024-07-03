import React, { useEffect, useState } from 'react'
import { Avatar,Box, Button, CardActionArea, CardActions  } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { getAdmin } from '../../api_helpers/api_helpers';
import { useParams } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';



const AdminProfile = () => {
  
  const {id} = useParams();

  const [data,setData] = useState(
    {
      id: "",
      email: "",
      addedTurfs: []
    }
  );

  useEffect(()=>{
    getAdmin(id)
    .then((res)=>{setData(res.adminDetails)})
    .catch((err)=>console.log(err))
  },[])


  console.log("admin data:",data);
  return (
    <div>

      <Box width={'100%'} paddingTop={10} display="flex" flexWrap="wrap">

        <Box display="flex" 
        flexDirection="column"
        alignItems="center" width={'15%'}>
        <Avatar><PersonIcon/></Avatar>
        <Typography margin={2} variant='h6'>{data.email}</Typography>
        </Box>
        
        <Box width={'80%'} display={'flex'} flexWrap="wrap">
{ data.addedTurfs.length !==0 &&
<>
  {data.addedTurfs.map((turf)=>(
    <Card sx={{margin:2,width:'270px', maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={turf.posterUrl}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {turf.turfName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {turf.location}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions >
              <Button sx={{margin:"auto",paddingBottom:3}} size="small" color="primary">
                View
              </Button>
            </CardActions>
        </Card>
  ))
  }
</>

}
       
          
    

          
        </Box>
      </Box>
    </div>
  )
}

export default AdminProfile
