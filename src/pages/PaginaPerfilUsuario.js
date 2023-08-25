import React, { useEffect } from "react";
//MUI
import { Grid } from "@mui/material";
import PerfilContenedor from "../components/PerfilUsuario/PerfilContenedor";
import { useDispatch } from "react-redux";
import { actualizarTitulo } from "../store/slices/menuSlice";

/*** Componente PaginaPerfilUsuario ***/
export default function PaginaPerfilUsuario() {
  //
  // const { materia } = useSelector((state) => state.materia);
  // const { cursada } = useSelector((state) => state.cursada);

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
      <PerfilContenedor />
    </Grid>
  );
}
