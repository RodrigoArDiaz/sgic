import React from "react";
import { CardContent, Paper, Typography } from "@mui/material";
import { Grid } from "@mui/material";
//import CatedraLista from '../CatedraLista';
import { CrearInscripcion } from "./CrearInscripcion";
//import { OrdenarExamen } from './OrdenarExamen';
import InscripcionesLista from "./InscripcionesLista";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import { blue } from "@mui/material/colors";
import BuscarInscripciones from "./BuscarInscripciones";

export default function InscripcionesContenedor() {
  return (
    <CardMainPage
      icon="co_present"
      title="Inscripciones"
      bgColorIcon={blue[500]}
    >
      <CardContent>
        <Grid container>
          <Grid container direction="row-reverse">
            {/* CrearPractico */}
            <Grid item xs={12} sm={6} md={2} lg={2} xl={2}>
              <Grid
                container
                paddingX={2}
                paddingY={1}
                justifyContent="flex-end"
              >
                <Grid item xs={12}>
                  <CrearInscripcion />
                </Grid>
              </Grid>
            </Grid>

            {/* Buscar practicos */}
            <Grid
              item
              xs={12}
              sm={12}
              md={10}
              lg={10}
              xl={10}
              // paddingY={1}
              paddingX={2}
            >
              <BuscarInscripciones />
            </Grid>
          </Grid>
          <Grid container pt={2}>
            <InscripcionesLista />
          </Grid>
        </Grid>
      </CardContent>
    </CardMainPage>
  );
}
