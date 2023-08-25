import React, { useEffect } from "react";
//MUI
import { Grid } from "@mui/material";
//
import BreadCrumbs from "../components/BreadCrumbs";
import ExamenesContenedor from "../components/Examenes/ExamenesContenedor";
import { GridBreadCrumbs } from "../components/Material UI - Componentes Modificados/ComponentesBreadCrumbs/ComponentesBreadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import { actualizarTitulo } from "../store/slices/menuSlice";

/*** Componente PaginaDocentesExamenes***/
export default function PaginaDocentesExamenes() {
  //
  const { materia } = useSelector((state) => state.materia);
  const { cursada } = useSelector((state) => state.cursada);

  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();

  //Actualiza el titulo al montar la pagina
  useEffect(() => {
    dispatch(actualizarTitulo(materia + " - " + cursada.Anio));
  }, []);

  //Actualiza el titulo al desmontar la pagina
  useEffect(() => {
    return () => {
      dispatch(actualizarTitulo(""));
    };
  }, []);

  //Ruta para breadcrumbs
  const crumbs = [
    {
      nombreRuta: "Inicio",
      to: "/inicio/docentes/ingreso",
    },
    {
      nombreRuta: "Exámenes",
      to: "",
    },
  ];

  return (
    <Grid container rowSpacing={1}>
      <Grid item xs={12}>
        <GridBreadCrumbs container>
          <BreadCrumbs crumbs={crumbs} />
        </GridBreadCrumbs>
      </Grid>

      <Grid item xs={12}>
        <ExamenesContenedor />
      </Grid>
    </Grid>
  );
}
