import React from 'react'
import { Grid } from '@mui/material'
import BreadCrumbs from '../components/BreadCrumbs'
import PracticosContenedor from '../components/Practicos/PracticosContenedor';
import BuscarPracticos from '../components/Practicos/BuscarPracticos';


export default function PaginaDocentesPracticos() {
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
                 <BuscarPracticos/>
            </Grid>

            <Grid item xs={12}>
                 <PracticosContenedor/>
            </Grid>
        </Grid>
    )
}
