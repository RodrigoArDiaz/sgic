import React, { useEffect } from "react";
//MUI
import { Grid } from "@mui/material";
//
import BreadCrumbs from "../components/BreadCrumbs";
import { useDispatch } from "react-redux";
import { actualizarTitulo } from "../store/slices/menuSlice";
import { GridBreadCrumbs } from "../components/Material UI - Componentes Modificados/ComponentesBreadCrumbs/ComponentesBreadCrumbs";
import MisCursadasContenedor from "../components/Miscursadas/MisCursadasContenedor";

/*** Componente PaginaAlumnoMisCursadas ***/
export default function PaginaAlumnoMisCursadas() {
  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();

  //Actualiza el titulo al montar la pagina
  useEffect(() => {
    dispatch(actualizarTitulo(""));
  }, []);

  //Ruta para breadcrumbs
  const crumbs = [
    {
      nombreRuta: "Inicio",
      to: "/inicio/alumnos/mis_cursadas",
    },
    {
      nombreRuta: "Mis cursadas",
      to: "",
    },
  ];

  return (
    <Grid container rowSpacing={1}>
      <Grid item xs={12}>
        <GridBreadCrumbs>
          <BreadCrumbs crumbs={crumbs} />
        </GridBreadCrumbs>
      </Grid>

      <Grid item xs={12}>
        <MisCursadasContenedor />
      </Grid>
    </Grid>
  );
}
