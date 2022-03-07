import React from 'react';
import {Paper, Typography } from '@mui/material';
import { Grid } from '@mui/material';
//import CatedraLista from '../CatedraLista';
import { CrearExamen } from './CrearExamen';
import { OrdenarExamen } from './OrdenarExamen';
import ExamenesLista from './ExamenesLista';

export default function PracticosContenedor() {
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

            <Grid container pt={1}>
                <Grid item xs={12}>
                    <Typography variant='h5'>
                        Exámenes
                    </Typography>
                </Grid>
            </Grid>

            <Grid
              container
              pt={2}
              justifyContent="flex-end" spacing={1}
            >
                <Grid item xs={6} sm={4} md={3} lg={2}>
                    <CrearExamen/>
                </Grid> 

                <Grid item xs={6} sm={4} md={3} lg={2}>
                    <OrdenarExamen/>
                </Grid> 
            </Grid>

            <Grid
              container
              pt={2}
            >
                <ExamenesLista/>
            </Grid>
      </Paper>
    )
}
