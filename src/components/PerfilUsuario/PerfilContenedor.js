import React from "react";
//MUI
import { Grid } from "@mui/material";
//Componentes propios
import TabsInformacionUsuario from "./TabsInformacionUsuario";
import InformacionUsuario from "./InformacionUsuario";

export default function PerfilContenedor() {
  return (
    <>
      <Grid item xs={12} sm={12} md={4} lg={3.5}>
        <InformacionUsuario />
      </Grid>

      <Grid item xs={12} sm={12} md={8} lg={8}>
        <TabsInformacionUsuario />
      </Grid>
    </>
  );
}
