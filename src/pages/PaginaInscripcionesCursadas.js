import React from "react";
import { Grid } from "@mui/material";
import Breadcrumbs from "../components/BreadCrumbs";
import { GridBreadCrumbs } from "../components/Material UI - Componentes Modificados/ComponentesBreadCrumbs/ComponentesBreadCrumbs";
import CursadasInscripcionContenedor from "../components/InscripcionCursadas/CursadasInscripcionContenedor";

//Ruta para breadcrumbs
const crumbs = [
  {
    nombreRuta: "Inicio",
    to: "/inicio/alumnos/mis_cursadas",
  },
  {
    nombreRuta: "Inscripción a cursadas",
    to: "",
  },
];

export default function PaginaInscripcionesCursadas() {
  return (
    <Grid container rowSpacing={1}>
      <Grid item xs={12}>
        <GridBreadCrumbs>
          <Breadcrumbs crumbs={crumbs} />
        </GridBreadCrumbs>
      </Grid>

      <Grid item xs={12}>
        <CursadasInscripcionContenedor />
      </Grid>
    </Grid>
  );
}
