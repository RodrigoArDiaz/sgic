import React from "react";
//MUI
import {
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Grid } from "@mui/material";
//
import { CardMain } from "../Material UI - Componentes Modificados/Componentes Inscripciones/ComponentesInscripciones";
import TabsInformacionUsuario from "./TabsInformacionUsuario";
import InformacionDeContactos from "./InformacionContactos";
import InformacionUsuario from "./InformacionUsuario";
import { useTheme } from "@emotion/react";

export default function PerfilContenedor() {
  //
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

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
              <Grid container spacing={3}>
                {!esXs ? (
                  <Grid item xs={12}>
                    <TabsInformacionUsuario />
                  </Grid>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <InformacionUsuario />
                    </Grid>
                    <Grid item xs={12}>
                      <InformacionDeContactos />
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardMain>
    </>
  );
}
