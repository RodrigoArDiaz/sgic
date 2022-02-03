import React from "react";
import { CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { CardMain } from "../Material UI - Componentes Modificados/Componentes Inscripciones/ComponentesInscripciones";
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
    </>
  );
}
