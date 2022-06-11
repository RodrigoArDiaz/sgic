import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function OutlinedCard(props) {
  
  return (
    <Box sx={{ minWidth: 600, bgcolor: 'info.main',height: 50 }}>
      <Typography align="center" variant="h5" component="div">
        {props.fila.Practico}
      </Typography>
    </Box>
  );
}
