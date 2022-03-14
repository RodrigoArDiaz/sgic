import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import BreadCrumbs from "../components/BreadCrumbs";
import AlumnosContenedor from "../../src/components/SuperAlumnos/AlumnosContenedor";
import { useDispatch } from "react-redux";
import { actualizarTitulo } from "../store/slices/menuSlice";
import { estilosBreadCrumbs } from "../styles/EstilosPaginas";

export default function PaginaAlumnos() {
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

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <Grid container sx={estilosBreadCrumbs}>
          <BreadCrumbs />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <AlumnosContenedor />
      </Grid>
    </Grid>
  );
}

/* 
 <Grid 
                item xs={12} sm={12} md={12} lg={11}
            >
                 <BuscarAlumnos/>
            </Grid>

*/
