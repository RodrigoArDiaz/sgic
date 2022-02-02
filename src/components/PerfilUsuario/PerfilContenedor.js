import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  CardContent,
  CardHeader,
  Divider,
  Paper,
  Tab,
  TabPanelUnstyled,
  Tabs,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";
import InformacionUsuario from "../InformacionUsuario";
import InformacionDeContactos from "../InformacionDeContactos";
import { CardMain } from "../Material UI - Componentes Modificados/Componentes Inscripciones/ComponentesInscripciones";
import { Box } from "@mui/system";
import TabsInformacionUsuario from "./TabsInformacionUsuario";

export default function PerfilContenedor() {
  return (
    <>
      <CardMain>
        <CardHeader
          title={<Typography variant="h5">Mi perfil</Typography>}
        ></CardHeader>
        <Divider></Divider>

        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TabsInformacionUsuario />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardMain>

      {/* <Paper
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
            <Typography variant="h6">Informacion De Contactos</Typography>
          </Grid>
        </Grid>

        <Grid container pt={2}>
          <InformacionDeContactos />
        </Grid>
      </Paper> */}
    </>
  );
}
