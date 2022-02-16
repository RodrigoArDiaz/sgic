import React from "react";
import { Grid } from "@mui/material";
//MUI
import BreadCrumbs from "../components/BreadCrumbs";
import AlumnosContenedor from "../components/GestionAlumnosSuper/AlumnosContenedor";

export default function PaginaAlumnos() {
  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <Grid
          container
          sx={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            border: "1px solid",
            borderColor: "secondary.light100",
          }}
        >
          <BreadCrumbs />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <AlumnosContenedor />
      </Grid>
    </Grid>
  );
}
