import React from "react";
import { Grid } from "@mui/material";
import Breadcrumbs from "../components/BreadCrumbs";
import PerfilContenedor from "../components/PerfilUsuario/PerfilContenedor";

export default function PaginaPerfilUsuario() {
  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <Grid container sx={{ backgroundColor: "#fff", borderRadius: "10px" }}>
          <Breadcrumbs />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <PerfilContenedor />
      </Grid>
    </Grid>
  );
}
