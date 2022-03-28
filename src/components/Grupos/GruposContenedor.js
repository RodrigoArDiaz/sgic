import React from "react";
import { CardContent, Paper, Typography } from "@mui/material";
import { Grid } from "@mui/material";
//import CatedraLista from '../CatedraLista';
import { CrearGrupo } from "./CrearGrupo";
//import { InscribirEnGrupo } from './InscribirEnGrupo';
import GruposLista from "./GruposLista";
import { CardMain } from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";
import { blue } from "@mui/material/colors";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import BuscarGrupos from "./BuscarGrupos";

export default function GruposContenedor() {
  return (
    <CardMainPage icon="group" title="Grupos" bgColorIcon={blue[500]}>
      <CardContent>
        <Grid container>
          <Grid container direction="row-reverse">
            {/* CrearPractico */}
            <Grid item xs={12} sm={6} md={2} lg={1.5} xl={1}>
              <Grid
                container
                paddingX={2}
                paddingY={1}
                justifyContent="flex-end"
              >
                <Grid item xs={12}>
                  <CrearGrupo />
                </Grid>
              </Grid>
            </Grid>

            {/* Buscar practicos */}
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={9}
              xl={10}
              paddingY={1}
              paddingX={2}
            >
              <BuscarGrupos />
            </Grid>
          </Grid>

          <Grid container pt={2}>
            <GruposLista />
          </Grid>
        </Grid>
      </CardContent>
    </CardMainPage>
  );
}
