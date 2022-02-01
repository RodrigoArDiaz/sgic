import React from "react";
import { Card, Grid } from "@mui/material";
import Breadcrumbs from "../components/BreadCrumbs";
import ListaCursadasInscripcion from "../components/ListaCursadasInscripcion";

export default function PaginaInscripcionesCursadas() {
  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <Grid container sx={{ backgroundColor: "#fff", borderRadius: "10px" }}>
          <Breadcrumbs />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        {/* <Grid
          container
          sx={{ backgroundColor: "#fff", borderRadius: "10px" }}
          component={Card}
        > */}
        <ListaCursadasInscripcion />
        {/* </Grid> */}
      </Grid>
    </Grid>
  );
}
