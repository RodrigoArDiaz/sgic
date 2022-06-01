

import * as React from 'react';
//import Button from '@mui/material/Button';
/*import Stack from '@mui/material/Stack';
import {ModificarGrupo} from './ModificarGrupo';
import {ListarIntegrantes} from './ListarIntegrantes';
import {InscribirEnGrupo} from './InscribirEnGrupo';
import {BorrarGrupo} from './BorrarGrupo';
import { Button } from '@mui/material';*/
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
//import SnackBar from './SnackBar'
//import Stack from '@mui/material/Stack';
//import { Tooltip } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { Tooltip } from '@mui/material';
 

import {  Grid } from '@mui/material';
import { BorrarGrupo } from './BorrarGrupo';
import { ModificarGrupo } from './ModificarGrupo';
//import { ListarUsuarios } from './ListarUsuarios';
import { ListarIntegrantes}  from './ListarIntegrantes';
//import { AgregarUsuarios } from './AgregarUsuarios';

import  {InscribirEnGrupo}  from './InscribirEnGrupo';

//import Box from '@mui/material/Box';
 

//
export const BotonAcciones = (props) => {
  
    return(
  
      <Grid container justifyContent="space-between">
      <Grid item xs={12} sm="auto">
        <ModificarGrupo anio={props.anio} idcursada={props.idcursada} semestre={props.semestre} 
        cursada={props.cursada}
      grupo={props.grupo}
abrir={props.abrir}
        mensaje={props.mensaje} tipo={props.tipo}  refrescar={props.refrescar}/>

      </Grid>
      
      
      <Grid item xs={12} sm="auto">
        <ListarIntegrantes anio={props.anio} idcursada={props.idcursada} semestre={props.semestre} 
        cursada={props.cursada} 
        grupo={props.grupo}    />  
</Grid>
      
<Grid item xs={12} sm="auto">
        <InscribirEnGrupo anio={props.anio} idcursada={props.idcursada} semestre={props.semestre} 
        Materia={props.Materia}
        cursada={props.cursada} 
        grupo={props.grupo}


       />
      </Grid>



      <Grid item xs={12} sm="auto"> 
        <BorrarGrupo anio={props.Anio} idcursada={props.idcursada} semestre={props.semestre} 
       cursada={props.cursada} idgrupo={props.grupo.IdGrupo}
        
        refrescar={props.refrescar} abrir={props.abrir}
        mensaje={props.mensaje} tipo={props.tipo} />
      </Grid>
      
    </Grid>
    );
    
    
    
    }
  /*
<Grid item xs={12} sm="auto">
        <ListarIntegrantes anio={props.anio} idcursada={props.idcursada} semestre={props.semestre} 
        cursada={props.cursada} refrescar={props.refrescar} abrir={props.abrir}
        mensaje={props.mensaje} tipo={props.tipo}
        grupo={props.grupo}
    
        





  <Grid item xs={12} sm="auto">
        <InscribirEnGrupo anio={props.anio} idcursada={props.idcursada} semestre={props.semestre} 
        Materia={props.Materia}
        cursada={props.cursada} 
        grupo={props.grupo}


        refrescar={props.refrescar} abrir={props.abrir}
        mensaje={props.mensaje} tipo={props.tipo}/>
      </Grid>
    

        />  
 

      </Grid>

  */
   