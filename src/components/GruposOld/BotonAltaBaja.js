

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {AltaGrupo} from './AltaGrupo';
import {BajaGrupo} from './BajaGrupo';

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
    
      <Button  onClick={()=>manejador()}><AltaGrupo/></Button>
      


  );}


  if (salto==='2') 
  {
      return (
      
        
       

      <Button  onClick={()=>manejador()} > <BajaGrupo/>
        </Button>
      
    );}


 

}
