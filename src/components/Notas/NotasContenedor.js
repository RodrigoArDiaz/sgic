import React from 'react';
import {Paper, Typography } from '@mui/material';
import { Grid } from '@mui/material';
//import CatedraLista from '../CatedraLista';
//import { CrearInscripcion } from './CrearInscripcion';
//import { OrdenarExamen } from './OrdenarExamen';
import NotasPracticos from './NotasPracticos';
import NotasExamenes from './NotasExamenes';
import SituacionFinal from './SituacionFinal';
import Button from '@mui/material/Button';


export default function NotasContenedor() {
    
    
  const [salto, setSalto] = React.useState('1');


function Modulo(props) {
  
  if (props.cambio ==='1') {
    

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
                        Notas - Prácticos
                    </Typography>
                </Grid>
            </Grid>

            <Grid
              container
              pt={2}
              justifyContent="flex-start" container spacing={45}
            >
                <Grid item xs={4} >
                <Button variant="contained" disabled>Prácticos</Button>
                </Grid> 

                <Grid item xs={4} >
                <Button variant="contained" onClick={() => setSalto('2')}>Exámenes</Button>
                </Grid> 

                <Grid item xs={4} >
                <Button variant="contained" onClick={() => setSalto('3')}>Situación Final</Button>
                </Grid> 



            </Grid>

            <Grid
              container
              pt={2}
            >
                 <NotasPracticos />
            </Grid>
      </Paper>
    );






  }
  if (props.cambio ==='2') {
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
                        Notas - Exámenes
                    </Typography>
                </Grid>
            </Grid>

            <Grid
              container
              pt={2}
              justifyContent="flex-start" container spacing={45}
            >
                <Grid item xs={4} >
                <Button variant="contained" onClick={() => setSalto('1')}>Prácticos</Button>
                </Grid> 

                <Grid item xs={4} >
                <Button variant="contained" disabled>Exámenes</Button>
                </Grid> 

                <Grid item xs={4} >
                <Button variant="contained" onClick={() => setSalto('3')}>Situación Final</Button>
                </Grid> 



            </Grid>

            <Grid
              container
              pt={2}
            >
                 <NotasExamenes />
            </Grid>
      </Paper>
    );




  }
  if (props.cambio ==='3') {
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
                        Notas - Situación Final
                    </Typography>
                </Grid>
            </Grid>

            <Grid
              container
              pt={2}
              justifyContent="flex-start" container spacing={45}
            >
                <Grid item xs={4} >
                <Button variant="contained" onClick={() => setSalto('1')}>Prácticos</Button>
                </Grid> 

                <Grid item xs={4} >
                <Button variant="contained" onClick={() => setSalto('2')}>Exámenes</Button>
                </Grid> 

                <Grid item xs={4} >
                <Button variant="contained" disabled>Situación Final</Button>
                </Grid> 



            </Grid>

            <Grid
              container
              pt={2}
            >
                 <SituacionFinal />
            </Grid>
      </Paper>
    );



  }
     
}


    
    
    
    return (

        
                <Modulo cambio={salto} />
        
    )
}
