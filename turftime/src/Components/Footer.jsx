import React from 'react';
import { Box, Typography, Link, IconButton,Divider } from '@mui/material';
import { Facebook, Instagram, YouTube, LinkedIn, Twitter } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box  marginTop={3} component="footer" sx={{ color: 'black', textAlign: 'center' }}>
    <Divider textAlign="center">
      <Box sx={{ display: 'flex', justifyContent: 'center'}}>
      <a href="https://www.instagram.com/sabari0602_" target="_blank" rel="noopener noreferrer">
      <IconButton sx={{padding:2}} aria-label="Instagram">
        <Instagram/>
      </IconButton>
      </a>
      <Divider orientation="vertical" variant="middle" flexItem />
      <a href="https://www.linkedin.com/in/sabarish-m-5b266b264" target="_blank" rel="noopener noreferrer">
      <IconButton sx={{padding:2}} aria-label="LinkedIn">
        <LinkedIn />
      </IconButton>
      </a>
      <Divider orientation="vertical" variant="middle" flexItem />
      <IconButton sx={{padding:2}} aria-label="Twitter">
        <Twitter />
      </IconButton>
      <Divider orientation="vertical" variant="middle" flexItem />
      <IconButton sx={{padding:2}} aria-label="Facebook">
        <Facebook />
      </IconButton>
      </Box>
      </Divider>
      <Typography variant="overline" display="block">
        TurfTime
      </Typography>
      <Typography variant="caption" display="block" color="textSecondary">
        Created by Sabarish M
      </Typography>
    </Box>
  );
};

export default Footer;
