

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
import { BorrarCatedra } from './BorrarCatedra';
import { ModificarCatedra } from './ModificarCatedra';
import { ListarUsuarios } from './ListarUsuarios';
import { AgregarMaterias } from './AgregarMaterias';
import { AgregarUsuarios } from './AgregarUsuarios';

import  {ListarMaterias}  from './ListarMaterias/ListarMaterias';

//import Box from '@mui/material/Box';


//
export const BotonAcciones = (props) => {
  
    return(
  
      <Grid container justifyContent="space-between">
      <Grid item xs={12} sm="auto">
        <AgregarMaterias idcatedra={props.idcatedra} catedra={props.catedra}/>
      </Grid>
      
      <Grid item item xs={12} sm="auto">
        <ListarMaterias idcatedra={props.idcatedra} catedra={props.catedra}/>  
      </Grid>
      

      <Grid item item xs={12} sm="auto">
        <AgregarUsuarios idcatedra={props.idcatedra} catedra={props.catedra}/>
      </Grid>
      
      <Grid item item xs={12} sm="auto">
        <ListarUsuarios idcatedra={props.idcatedra} catedra={props.catedra}/>  
      </Grid>
      
      <Grid item item xs={12} sm="auto">
        <ModificarCatedra idcatedra={props.idcatedra} catedra={props.catedra} refrescar={props.refrescar} abrir={props.abrir}
        mensaje={props.mensaje} tipo={props.tipo}/>
      </Grid>
                  
      <Grid item item xs={12} sm="auto"> 
        <BorrarCatedra idcatedra={props.idcatedra} refrescar={props.refrescar} abrir={props.abrir}
        mensaje={props.mensaje} tipo={props.tipo} nombre={props.nombre}/>
      </Grid>
      
    </Grid>
    );
    
    
    
    }
  