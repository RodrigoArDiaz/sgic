import * as React from 'react';
import {  Grid } from '@mui/material';
import { BorrarCursada } from './BorrarCursada';
import { ModificarCursada } from './ModificarCursada';
import { AgregarParametro } from './AgregarParametro';
import  {ListarParametros}  from './ListarParametros/ListarParametros';
import  {ClonarCursada}  from './Opciones/ClonarCursada';

export const BotonAcciones = (props) => {
  
    return(
  
      <Grid container justifyContent="space-between">
      <Grid item xs={12} sm="auto">
        <AgregarParametro anio={props.anio} idcursada={props.idcursada} semestre={props.semestre} 
        Materia={props.Materia}

abrir={props.abrir}
        mensaje={props.mensaje} tipo={props.tipo}/>

      </Grid>
      
      <Grid item xs={12} sm="auto">
        <ListarParametros anio={props.anio} idcursada={props.idcursada} semestre={props.semestre} 
        Materia={props.Materia}/>  
      </Grid>
      

      <Grid item xs={12} sm="auto">
        <ClonarCursada anio={props.anio} idcursada={props.idcursada} semestre={props.semestre} 
        Materia={props.Materia}
        cursada={props.cursada} 
      idmateria={props.idmateria}  
        refrescar={props.refrescar} abrir={props.abrir}
        mensaje={props.mensaje} tipo={props.tipo}/>
      </Grid>

      <Grid item xs={12} sm="auto">
        <ModificarCursada anio={props.anio} idcursada={props.idcursada} semestre={props.semestre} 
        Materia={props.Materia}
        cursada={props.cursada} 
      idmateria={props.idmateria}  
        refrescar={props.refrescar} abrir={props.abrir}
        mensaje={props.mensaje} tipo={props.tipo}/>
      </Grid>
                  
      <Grid item xs={12} sm="auto"> 
        <BorrarCursada anio={props.Anio} idcursada={props.idcursada} semestre={props.semestre} 
        Materia={props.Materia} 
        
        refrescar={props.refrescar} abrir={props.abrir}
        mensaje={props.mensaje} tipo={props.tipo} />
      </Grid>
      
    </Grid>
    );
    
    
    
    }
  