import React, { useEffect } from "react";
//Materia UI
import { Grid } from "@mui/material";
import BreadCrumbs from "../components/BreadCrumbs";
import CatedrasContenedor from "../components/GestionCatedrasSuper/CatedrasContenedor";
import { GridBreadCrumbs } from "../components/Material UI - Componentes Modificados/ComponentesBreadCrumbs/ComponentesBreadCrumbs";
//Redux
import { useDispatch } from "react-redux";
import { actualizarTitulo } from "../store/slices/menuSlice";

export default function PaginaCatedras() {
  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();

  //Actualiza el titulo al montar la pagina
  useEffect(() => {
    dispatch(actualizarTitulo("Superadministrador"));
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
      nombreRuta: "Gestión cátedras",
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
        <CatedrasContenedor />
      </Grid>
    </Grid>
  );
}
