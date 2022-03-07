import React from 'react'
import { Grid } from '@mui/material'
import BreadCrumbs from '../components/BreadCrumbs'
import BuscarCatedras from '../components/Catedras/BuscarCatedras';
import CatedrasContenedor from '../components/Catedras/CatedrasContenedor';

import { ThemeProvider } from '@mui/material';
import temaConfig from '../temaConfig.js';


export default function PaginaCatedras() {
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
                 <CatedrasContenedor/>
            </Grid>
        </Grid>
        </ThemeProvider>
        
    )
}
