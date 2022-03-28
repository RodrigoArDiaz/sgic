import React from "react";
import { CardContent, Paper, Typography } from "@mui/material";
import { Grid } from "@mui/material";
//import CatedraLista from '../CatedraLista';
import { CrearExamen } from "./CrearExamen";
import { OrdenarExamen } from "./OrdenarExamen";
import ExamenesLista from "./ExamenesLista";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import { blue } from "@mui/material/colors";
import BuscarExamenes from "./BuscarExamenes";

export default function PracticosContenedor() {
  return (
    <CardMainPage icon="assignment" title="Exámenes" bgColorIcon={blue[500]}>
      <CardContent>
        <Grid container>
          <Grid container direction="row-reverse">
            {/* CrearExamen */}
            <Grid item xs={12} sm={6} md={2} lg={1.5} xl={1}>
              <Grid
                container
                paddingX={2}
                paddingY={1}
                justifyContent="flex-end"
              >
                <Grid item xs={12}>
                  <CrearExamen />
                </Grid>
              </Grid>
            </Grid>
            {/* <CrearDocente /> */}
            <Grid item xs={12} sm={6} md={2} lg={1.5} xl={1}>
              <Grid
                container
                paddingX={2}
                paddingY={1}
                justifyContent="flex-end"
              >
                <Grid item xs={12}>
                  <OrdenarExamen />
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
              <BuscarExamenes />
            </Grid>
          </Grid>

          <Grid container pt={2}>
            <ExamenesLista />
          </Grid>
        </Grid>
      </CardContent>
    </CardMainPage>
  );
}
