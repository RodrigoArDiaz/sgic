import React from 'react'
import { Grid } from '@mui/material'
import BreadCrumbs from '../components/BreadCrumbs'
import NotasContenedor from '../components/Notas/NotasContenedor';
import BuscarInscripciones from '../components/Notas/BuscarInscripciones';


export default function PaginaDocentesNotas() {
    return (
        <Grid
            container
            sx={{ml: {xs: "0", sm: "20px"} ,mt: "80px"}}
        >
             <Grid item xs={12}>
                {/* <BreadCrumbs/> */}
            </Grid>

            <Grid 
                item xs={12} 
            >
                 <BuscarInscripciones/>
            </Grid>

            <Grid item xs={12}>
                 <NotasContenedor/>
            </Grid>
        </Grid>
    )
}
