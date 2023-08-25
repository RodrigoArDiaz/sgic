import React, { useEffect } from "react";
//MUI
import { Grid } from "@mui/material";
//
import Breadcrumbs from "../components/BreadCrumbs";
import { GridBreadCrumbs } from "../components/Material UI - Componentes Modificados/ComponentesBreadCrumbs/ComponentesBreadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import { actualizarTitulo } from "../store/slices/menuSlice";
import MisNotasContenedor from "../components/Alumnos/MisNotas/MisNotasContenedor";

//Ruta para breadcrumbs
const crumbs = [
  {
    nombreRuta: "Inicio",
    to: "/inicio/alumnos/mis_cursadas",
  },
  {
    nombreRuta: "Mis Notas",
    to: "",
  },
];

/*** Componente PaginaAlumnosMisNotas ***/
export default function PaginaAlumnosMisNotas() {
  //
  const { materia } = useSelector((state) => state.materia);
  const { cursada } = useSelector((state) => state.cursada);

  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();

  //Actualiza el titulo al montar la pagina
  useEffect(() => {
    dispatch(
      actualizarTitulo(
        materia + " - " + cursada.Anio + " - Semestre " + cursada.Semestre
      )
    );
  }, []);

  //Actualiza el titulo al desmontar la pagina
  useEffect(() => {
    return () => {
      dispatch(actualizarTitulo(""));
    };
  }, []);

  return (
    <Grid container rowSpacing={1}>
      <Grid item xs={12}>
        <GridBreadCrumbs>
          <Breadcrumbs crumbs={crumbs} />
        </GridBreadCrumbs>
      </Grid>

      <Grid item xs={12}>
        <MisNotasContenedor />
      </Grid>
    </Grid>
  );
}
