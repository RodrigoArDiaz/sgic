import React, { useEffect } from "react";
//MUI
import { Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { actualizarTitulo } from "../store/slices/menuSlice";
//Componentes
import DocentesCursadasContenedor from "../components/DocentesCursadasContenedor";
import { GridBreadCrumbs } from "../components/Material UI - Componentes Modificados/ComponentesBreadCrumbs/ComponentesBreadCrumbs";
import BreadCrumbs from "../components/BreadCrumbs";

export default function PaginaDocentesCursadasCuerpo(props) {
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
    <Grid container rowSpacing={3} columnSpacing={2}>
      <Grid item xs={12}>
        <GridBreadCrumbs container>
          <BreadCrumbs />
        </GridBreadCrumbs>
      </Grid>

      <Grid item xs={12} md={6}>
        <DocentesCursadasContenedor />
      </Grid>
    </Grid>
  );
}
