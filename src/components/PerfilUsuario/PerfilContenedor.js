import React from "react";
//MUI
import {
  Box,
  CardContent,
  CardHeader,
  Divider,
  Icon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Grid } from "@mui/material";
//
import { CardMain } from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";
import TabsInformacionUsuario from "./TabsInformacionUsuario";
import InformacionDeContactos from "./InformacionContactos";
import InformacionUsuario from "./InformacionUsuario";
import { useTheme } from "@emotion/react";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";

export default function PerfilContenedor() {
  //
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <CardMainPage
        title="Mi perfil"
        icon="manage_accounts"
        bgColorIcon={"secondary.light400"}
      >
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
      </CardMainPage>
    </>
  );
}
