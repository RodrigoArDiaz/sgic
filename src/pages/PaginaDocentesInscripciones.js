import React from 'react'
import { Grid } from '@mui/material'
import BreadCrumbs from '../components/BreadCrumbs'
import InscripcionesContenedor from '../components/Inscripciones/InscripcionesContenedor';
import BuscarInscripciones from '../components/Inscripciones/BuscarInscripciones';


export default function PaginaDocentesInscripciones() {
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
                 <BuscarInscripciones/>
            </Grid>

            <Grid item xs={12}>
                 <InscripcionesContenedor/>
            </Grid>
        </Grid>
    )
}
