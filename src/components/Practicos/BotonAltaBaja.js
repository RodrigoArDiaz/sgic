

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {AltaPractico} from './AltaPractico';
import {BajaPractico} from './BajaPractico';

export const BotonAltaBaja = (props) => {


    const [salto, setSalto] = React.useState(props.cambio); 

    function manejador(){
        
    if (salto ==='1'){setSalto('2'); 
}
    if (salto ==='2'){setSalto('1');}




}

if (salto==='1') 
{
    return (
    
      <Button  onClick={()=>manejador()}><AltaPractico/></Button>
      


  );}


  if (salto==='2') 
  {
      return (
      
        
       

      <Button  onClick={()=>manejador()} > <BajaPractico/>
        </Button>
      
    );}


 

}
