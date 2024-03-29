import React, { useEffect } from "react";
//MUI
import { Grid } from "@mui/material";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { actualizarTitulo } from "../store/slices/menuSlice";
//Componentes propios
import DocentesCursadasContenedor from "../components/Cursadas/Opciones/DocentesCursadasContenedor";

/*** Componente PaginaDocentesCursadasCuerpo***/
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
        <DocentesCursadasContenedor />
      </Grid>
    </Grid>
  );
}
