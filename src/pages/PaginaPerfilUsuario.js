import React from "react";
import { Grid } from "@mui/material";
import Breadcrumbs from "../components/BreadCrumbs";
import PerfilContenedor from "../components/PerfilUsuario/PerfilContenedor";
import Card2 from "../components/Card2";

export default function PaginaPerfilUsuario() {
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
          <Breadcrumbs />
        </Grid>
      </Grid>
      {/* <Card2></Card2> */}
      <Grid item xs={12}>
        <PerfilContenedor />
      </Grid>
    </Grid>
  );
}
