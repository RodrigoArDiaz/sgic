import React from "react";
import { Paper, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import InformacionUsuario from "./InformacionUsuario";
import InformacionDeContactos from "./InformacionDeContactos";

export default function PerfilContenedor() {
  return (
    <>
      <Paper
        component="div"
        sx={{
          p: "4px 4px",
          // display: 'flex',
          alignItems: "center",
          width: "95%",
          mt: "10px",
          px: 2,
          // minHeight: "75vh",
        }}
        elevation={3}
      >
        <Grid container pt={1}>
          <Grid item xs={12}>
            <Typography variant="h5">Mi perfil</Typography>
          </Grid>
        </Grid>

        <Grid container pt={2}>
          <InformacionUsuario />
        </Grid>
      </Paper>

      <Paper
        component="div"
        sx={{
          p: "4px 4px",
          // display: 'flex',
          alignItems: "center",
          width: "95%",
          mt: "10px",
          px: 2,
          pb: 3,
          // minHeight: "75vh",
        }}
        elevation={3}
      >
        <Grid container pt={1}>
          <Grid item xs={12}>
            <Typography variant="h5">Informacion De Contactos</Typography>
          </Grid>
        </Grid>

        <Grid container pt={2}>
          <InformacionDeContactos />
        </Grid>
      </Paper>
    </>
  );
}
