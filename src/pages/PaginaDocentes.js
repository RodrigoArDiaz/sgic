import React from "react";
//mui
import { Grid } from "@mui/material";
//
import BreadCrumbs from "../components/BreadCrumbs";
import DocentesContenedor from "../components/GestionDocenteSuper/DocentesContenedor";

export default function PaginaDocentes() {
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
        <DocentesContenedor />
      </Grid>
    </Grid>
  );
}
