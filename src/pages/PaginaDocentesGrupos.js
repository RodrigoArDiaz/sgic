import React from 'react'
import { Grid } from '@mui/material'
import BreadCrumbs from '../components/BreadCrumbs'
import GruposContenedor from '../components/Grupos/GruposContenedor';
import BuscarGrupos from '../components/Grupos/BuscarGrupos';


export default function PaginaDocentesGrupos() {
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
                 <BuscarGrupos/>
            </Grid>

            <Grid item xs={12}>
                 <GruposContenedor/>
            </Grid>
        </Grid>
    )
}
