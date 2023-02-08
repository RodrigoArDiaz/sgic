import React, { useEffect } from "react";
//mui
import { Grid } from "@mui/material";
//
import BreadCrumbs from "../components/BreadCrumbs";
import DocentesContenedor from "../components/GestionDocenteSuper/DocentesContenedor";
import { useDispatch } from "react-redux";
import { actualizarTitulo } from "../store/slices/menuSlice";
import { estilosBreadCrumbs } from "../styles/EstilosPaginas";
import { GridBreadCrumbs } from "../components/Material UI - Componentes Modificados/ComponentesBreadCrumbs/ComponentesBreadCrumbs";

export default function PaginaDocentes() {
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
      nombreRuta: "Gestión docentes",
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
        <DocentesContenedor />
      </Grid>
    </Grid>
  );
}
