import React from 'react';
import { Box, Typography, Link, IconButton,Divider } from '@mui/material';
import { Facebook, Instagram, YouTube, LinkedIn, Twitter } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box  marginTop={3} component="footer" sx={{position: 'relative', 
        bottom: 0,  px: 2, color: 'black', textAlign: 'center' }}>
    <Divider textAlign="center">
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
      <IconButton sx={{padding:2}} aria-label="Facebook">
        <Facebook />
      </IconButton>
      <Divider orientation="vertical" variant="middle" flexItem />
      <IconButton sx={{padding:2}} aria-label="Twitter">
        <Twitter />
      </IconButton>
      <Divider orientation="vertical" variant="middle" flexItem />
      <IconButton sx={{padding:2}} aria-label="Instagram">
        <Instagram/>
      </IconButton>
      <Divider orientation="vertical" variant="middle" flexItem />
      <IconButton sx={{padding:2}} aria-label="LinkedIn">
        <LinkedIn />
      </IconButton>
      </Box>
      </Divider>
      <Typography variant="h5" component="div" sx={{ mb: 1 }}>
        TurfTime
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
        Created by Sabarish M
      </Typography>
    </Box>
  );
};

export default Footer;
