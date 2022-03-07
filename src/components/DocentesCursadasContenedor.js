import React from 'react';
import {Paper, Typography } from '@mui/material';
import { Grid } from '@mui/material';
//import CatedraLista from './CatedraLista';
import { ExportarInfoAlumnos } from './ExportarInfoAlumnos';
import { ClonarCursada } from './ClonarCursada';
import { GenerarCuadricula } from './GenerarCuadricula';

export default function DocentesCursadasContenedor(props) {
    return (
        <Paper
            component="div"
            sx={{ 
                    p: '4px 4px', 
                    // display: 'flex',
                    alignItems: 'center',
                    width:"95%",
                    mt: "10px",
                    px: 2,
                    pb:3,
                    // minHeight: "75vh",
                }}
            elevation={3}
            >



            <Grid container pt={1} >
                <Grid item xs={12}>
                    <Typography variant='h5'>
                        Información de la cursada
                    </Typography>
                </Grid>
            </Grid>

                      

            <Grid
              container
              pt={2} rowSpacing={1}
            >
               <Typography variant='h8'>
                        Estado: {props.cursada.Estado}
                    </Typography>
            </Grid>

            <Grid  rowSpacing={1}
              
            >
               <Typography variant='h8'>
                        Permite grupos: {props.cursada.TieneGrupos}
                    </Typography>
            </Grid>
            
<Grid rowSpacing={1}>
            <Typography variant='h8'>
                        Cantidad de inscriptos:
                    </Typography>
            </Grid>


            <Grid rowSpacing={1}>
            <Typography variant='h8'>
                        Cantidad de prácticos :
                    </Typography>
            </Grid>



            <Grid rowSpacing={1}>
            <Typography variant='h8'>
                        Cantidad de exámenes:
                    </Typography>
            </Grid>


            <Grid rowSpacing={1}>
            <Typography variant='h8'>
                        Cantidad de grupos:
                    </Typography>
            </Grid>

            <Grid
              container
              pt={3}
              justifyContent="flex-start" container spacing={1}
            >
                <Grid item xs={4} >
                    <ExportarInfoAlumnos/>
                </Grid> 

                <Grid item xs={4} >
                    <GenerarCuadricula/>
                </Grid> 

                <Grid item xs={4} >
                    <ClonarCursada/>
                </Grid> 


            </Grid>


      </Paper>
    )
}
