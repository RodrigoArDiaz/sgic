import React from "react";
import {
  CardContent,
  CardHeader,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";
// import CatedraLista from '../Catedras/CatedraLista';
import { CrearPractico } from "./CrearPractico";
import { OrdenarPractico } from "./OrdenarPractico";
import PracticosLista from "./PracticosLista";
import { CardMain } from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";
import BuscarPracticos from "./BuscarPracticos";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import { blue, orange, red } from "@mui/material/colors";

export default function PracticosContenedor() {
  return (
    <CardMainPage icon="article" title="Prácticos" bgColorIcon={blue[500]}>
      <CardContent>
        <Grid container>
          <Grid container direction="row-reverse">
            {/* CrearPractico */}
            <Grid item xs={12} sm={6} md={2} lg={1.5} xl={1}>
              <Grid
                container
                paddingX={2}
                // paddingY={1}
                paddingBottom={1}
                justifyContent="flex-end"
              >
                <Grid item xs={12}>
                  <CrearPractico />
                </Grid>
              </Grid>
            </Grid>
            {/* <CrearDocente /> */}
            <Grid item xs={12} sm={6} md={2} lg={1.5} xl={1}>
              <Grid
                container
                paddingX={2}
                // paddingY={1}
                paddingBottom={1}
                justifyContent="flex-end"
              >
                <Grid item xs={12}>
                  <OrdenarPractico />
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
              // paddingY={1}
              paddingBottom={1}
              paddingX={2}
            >
              <BuscarPracticos />
            </Grid>
          </Grid>

          <Grid container pt={2}>
            <PracticosLista />
          </Grid>
        </Grid>
      </CardContent>
    </CardMainPage>
  );
}
