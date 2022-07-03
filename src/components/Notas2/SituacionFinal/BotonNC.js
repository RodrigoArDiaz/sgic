import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';

export default function ECVisual(props) {
  
function Transformar(param){
  if (param === 0) 
  {
    return '-';
}
  return param;
}


const style3 = {
  //Blancogris
    width: {xs: 50},
    
    //color:'red',
    backgroundColor: {xs:"#f5f5f5"},
    //border: "solid black 2px"
  }
  


const style2 = {
  //verde
    width: {xs: 50},
    
    //color:'red',
    backgroundColor: {xs:"#fdeae6"},
    //border: "solid black 2px"
  }
  
  
  
  const style1 = {
  // rojo
    width: {xs: 50},
    
    //color:'red',
    backgroundColor: {xs:"#e6fde9"},
    //border: "solid black 2px"
  }

  var estilo;
if(props.Cond===undefined){
estilo=style3;
}
  else if (props.Cond>0){
    estilo=style2;
  }
else{
  estilo=style1;
}


  return (
     
    <FormControl sx={{ m: 1, width: 51 }} variant="outlined">
          <OutlinedInput   sx={{...estilo, width: 50,
      height: 32}}
            id="outlined-adornment-weight"
            value={Transformar(props.Nota)}
            size="small"
            
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
                readOnly: true,
            }}
          />
          
        </FormControl>    


       
            
  );
}

