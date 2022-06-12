

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export const BotonInscripcion = (props) => {


    const [salto, setSalto] = React.useState(props.cambio); 

    function manejador(){
        
    if (salto ==='1'){setSalto('2');
}
    if (salto ==='2'){setSalto('1');}




}

if (salto==='1') 
{
    return (
    <Stack direction="row">
      <Button variant="outlined" onClick={()=>manejador()}>Inscribir</Button>
     
    </Stack>
  );}


  if (salto==='2') 
  {
      return (
      <Stack direction="row" >
        
        <Button variant="outlined" disabled >
          Inscripto
        </Button>
        
      </Stack>
    );}


 

}
