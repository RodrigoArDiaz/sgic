

import * as React from 'react';
//import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {ModificarGrupo} from './ModificarGrupo';
import {ListarIntegrantes} from './ListarIntegrantes';
import {InscribirEnGrupo} from './InscribirEnGrupo';
import {BorrarGrupo} from './BorrarGrupo';
import { Button } from '@mui/material';
export const BotonAcciones = (props) => {


       

  const [salto, setSalto] = React.useState('1'); 

  function manejo(){
      
  if (salto ==='1'){setSalto('2'); 
}
  if (salto ==='2'){setSalto('1');}
  }

if (salto==='1'){
    return (


    <Stack direction="row">
      <Button  ><ModificarGrupo/></Button>
      <Button  ><BorrarGrupo cambio={()=>{manejo()}}/></Button>
      <Button  ><InscribirEnGrupo/></Button>
      <Button  ><ListarIntegrantes/></Button>




    </Stack>
  );
    }
    else{

      return (


        <Stack direction="row">
    <Button   variant="outlined" disabled color="primary" ><ModificarGrupo/></Button>
    <Button   variant="outlined" disabled color="primary" ><BorrarGrupo /></Button>
    <Button   variant="outlined" disabled color="primary" ><InscribirEnGrupo/></Button>
    <Button   variant="outlined" disabled color="primary" ><ListarIntegrantes/></Button>
        </Stack>
      );
    
    }




}
