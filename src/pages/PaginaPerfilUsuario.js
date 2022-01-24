import React from "react";
import { Grid } from "@mui/material";
import BreadCrumbs from "../components/BreadCrumbs";
import DocentesContenedor from "../components/DocentesContenedor";
import BuscarDocentes from "../components/BuscarDocentes";
import AlumnosContenedor from "../components/AlumnosContenedor";
import BuscarAlumnos from "../components/BuscarAlumnos";
import PerfilContenedor from "../components/PerfilContenedor";

export default function PaginaPerfilUsuario() {
  return (
    <Grid container sx={{ ml: { xs: "0", sm: "20px" }, mt: "80px" }}>
      <Grid item xs={12}>
        {/* <BreadCrumbs/> */}
      </Grid>

      <Grid item xs={12}>
        <PerfilContenedor />
      </Grid>
    </Grid>
  );
}
