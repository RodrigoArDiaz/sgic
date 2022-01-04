import React from 'react'
import { Grid } from '@mui/material'
import BreadCrumbs from '../components/BreadCrumbs'
import DocentesContenedor from '../components/DocentesContenedor';
import BuscarDocentes from '../components/BuscarDocentes';


export default function PaginaDocentes() {
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
                 <BuscarDocentes/>
            </Grid>

            <Grid item xs={12}>
                 <DocentesContenedor/>
            </Grid>
        </Grid>
    )
}
