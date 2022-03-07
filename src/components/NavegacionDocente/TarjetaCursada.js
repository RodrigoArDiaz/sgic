import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";




export default function OutlinedCard(props) {
  
  const navegar = useNavigate();
  return (
    <Box sx={{ minWidth: 600 }}>
      <Card variant="outlined">
      
      <React.Fragment>
    <CardContent>
      
      <Typography sx={{ mb: 1.5 }} align="center" variant="h5" component="div">
        {props.fila}
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
      
          Año: {props.anio}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Semestre: {props.sem}
        </Typography>
        
        
      </Typography>
       </CardContent>
    <CardActions sx={{align: "center"}}>
    <Button size="small" onClick={()=>{
      
       localStorage.jsoncursada=JSON.stringify(props.cur);
       //console.log(JSON.parse(localStorage.jsoncursada));
       navegar("/docentes/cursadas");
    }}>
        Ingresar</Button>
    </CardActions>
  </React.Fragment>
      
      </Card>
    </Box>
  );
}