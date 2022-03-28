import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import BreadCrumbs from "../components/BreadCrumbs";
import ExamenesContenedor from "../components/Examenes/ExamenesContenedor";
import BuscarExamenes from "../components/Examenes/BuscarExamenes";
import { GridBreadCrumbs } from "../components/Material UI - Componentes Modificados/ComponentesBreadCrumbs/ComponentesBreadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import { actualizarTitulo } from "../store/slices/menuSlice";

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

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <GridBreadCrumbs container>
          <BreadCrumbs />
        </GridBreadCrumbs>
      </Grid>
      {/* <Grid item xs={12} sm={12} md={10} lg={10}>
        <BuscarExamenes />
      </Grid> */}

      <Grid item xs={12}>
        <ExamenesContenedor />
      </Grid>
    </Grid>
  );
}
