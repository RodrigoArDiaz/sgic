import React from "react";
import { Grid } from "@mui/material";
import BreadCrumbs from "../components/BreadCrumbs";

import AlumnosContenedor from "../components/AlumnosContenedor";
import BuscarAlumnos from "../components/BuscarAlumnos";

export default function PaginaAlumnos() {
  return (
    <Grid container sx={{ ml: { xs: "0", sm: "20px" }, mt: "80px" }}>
      <Grid item xs={12}>
        {/* <BreadCrumbs/> */}
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={11}>
        <BuscarAlumnos />
      </Grid>

      <Grid item xs={12}>
        <AlumnosContenedor />
      </Grid>
    </Grid>
  );
}
