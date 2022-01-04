import React from 'react'
import { Grid } from '@mui/material'
import BreadCrumbs from '../components/BreadCrumbs'
import BuscarCatedras from '../components/BuscarCatedras';
import CatedrasContenedor from '../components/CatedrasContenedor';


export default function PaginaCatedras() {
    return (
        <Grid
            container
            sx={{ml: {xs: "0", sm: "20px"} ,mt: "80px"}}
        >
             <Grid item xs={12}>
                {/* <BreadCrumbs/> */}
            </Grid>

            <Grid item xs={12} sm={10} md={10} lg={5}>
                 <BuscarCatedras/>
            </Grid>

            <Grid item xs={12}>
                 <CatedrasContenedor/>
            </Grid>
        </Grid>
    )
}
