import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Breadcrumbs from "../components/BreadCrumbs";
import PerfilContenedor from "../components/PerfilUsuario/PerfilContenedor";
import Card2 from "../components/Card2";
import { useDispatch, useSelector } from "react-redux";
import { actualizarTitulo } from "../store/slices/menuSlice";

export default function PaginaPerfilUsuario() {
  //
  const { materia } = useSelector((state) => state.materia);
  const { cursada } = useSelector((state) => state.cursada);

  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();

  //Actualiza el titulo al montar la pagina
  useEffect(() => {
    dispatch(actualizarTitulo("Mi perfil"));
  }, []);

  //Actualiza el titulo al desmontar la pagina
  useEffect(() => {
    return () => {
      dispatch(actualizarTitulo(""));
    };
  }, []);

  return (
    <Grid container rowSpacing={3} columnSpacing={3}>
      {/* <Grid item xs={12}>
        <Grid
          container
          sx={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            border: "1px solid",
            borderColor: "secondary.light100",
          }}
        >
          <Breadcrumbs />
        </Grid>
      </Grid> */}
      {/* <Card2></Card2> */}
      {/* <Grid item xs={12}> */}
      <PerfilContenedor />
      {/* </Grid> */}
    </Grid>
  );
}
