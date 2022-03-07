

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
import { BorrarCursada } from './BorrarCursada';
import { ModificarCursada } from './ModificarCursada';
//import { ListarUsuarios } from './ListarUsuarios';
import { AgregarParametro } from './AgregarParametro';
//import { AgregarUsuarios } from './AgregarUsuarios';

import  {ListarParametros}  from './ListarMaterias/ListarParametros';

//import Box from '@mui/material/Box';


//
export const BotonAcciones = (props) => {
  
    return(
  
      <Grid container justifyContent="space-between">
      <Grid item xs={12} sm="auto">
        <AgregarParametro anio={props.anio} idcursada={props.idcursada} semestre={props.semestre} 
        Materia={props.Materia}/>
      </Grid>
      
      <Grid item item xs={12} sm="auto">
        <ListarParametros anio={props.anio} idcursada={props.idcursada} semestre={props.semestre} 
        Materia={props.Materia}/>  
      </Grid>
      

      
      <Grid item item xs={12} sm="auto">
        <ModificarCursada anio={props.anio} idcursada={props.idcursada} semestre={props.semestre} 
        Materia={props.Materia} 
        
        refrescar={props.refrescar} abrir={props.abrir}
        mensaje={props.mensaje} tipo={props.tipo}/>
      </Grid>
                  
      <Grid item item xs={12} sm="auto"> 
        <BorrarCursada anio={props.Anio} idcursada={props.idcursada} semestre={props.semestre} 
        Materia={props.Materia} 
        
        refrescar={props.refrescar} abrir={props.abrir}
        mensaje={props.mensaje} tipo={props.tipo} />
      </Grid>
      
    </Grid>
    );
    
    
    
    }
  