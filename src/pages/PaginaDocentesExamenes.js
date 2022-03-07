import React from 'react'
import { Grid } from '@mui/material'
import BreadCrumbs from '../components/BreadCrumbs'
import ExamenesContenedor from '../components/Examenes/ExamenesContenedor';
import BuscarExamenes from '../components/Examenes/BuscarExamenes';


export default function PaginaDocentesExamenes() {
    return (
        <Grid
            container
            sx={{ml: {xs: "0", sm: "20px"} ,mt: "80px"}}
        >
             <Grid item xs={12}>
                {/* <BreadCrumbs/> */}
            </Grid>

            <Grid 
                item xs={12} sm={12} md={10} lg={10}
            >
                 <BuscarExamenes/>
            </Grid>

            <Grid item xs={12}>
                 <ExamenesContenedor/>
            </Grid>
        </Grid>
    )
}
