import React from 'react'
import { Grid } from '@mui/material'
import BreadCrumbs from '../components/BreadCrumbs'
import BuscarCatedras from '../components/Catedras/BuscarCatedras';
import DocentesCursadasContenedor from '../components/DocentesCursadasContenedor';

import { ThemeProvider } from '@mui/material';
import temaConfig from '../temaConfig.js';


export default function PaginaDocentesCursadasCuerpo(props) {
    return (


        
         <ThemeProvider theme={temaConfig}>
        <Grid
            container
            sx={{ml: {xs: "0", sm: "20px"} ,mt: "80px"}}
        >
             <Grid item xs={12}>
                {/* <BreadCrumbs/> */}
            </Grid>

           

            <Grid item xs={12}>
                 <DocentesCursadasContenedor cursada={props.cursada}/>
            </Grid>
        </Grid>
        </ThemeProvider>
        
    )
}
