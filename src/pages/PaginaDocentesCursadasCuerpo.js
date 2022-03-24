import React from "react";
//MUI
import { Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material";
//Componentes
import DocentesCursadasContenedor from "../components/DocentesCursadasContenedor";

export default function PaginaDocentesCursadasCuerpo(props) {
  return (
    <ThemeProvider>
      <Grid container sx={{ ml: { xs: "0", sm: "20px" }, mt: "80px" }}>
        <Grid item xs={12}>
          {/* <BreadCrumbs/> */}
        </Grid>

        <Grid item xs={12}>
          <DocentesCursadasContenedor cursada={props.cursada} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
