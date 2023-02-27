import * as React from "react";
//MUI
import { Grid } from "@mui/material";
import { InscribirAlumno } from "./InscribirAlumno";
//Redux
import { useSelector } from "react-redux";

/*** Componente BotonAcciones ***/
export const BotonAcciones = (props) => {
  //Recupero informacion de la cursada
  const { cursada } = useSelector((state) => state.cursada);

  return (
    <Grid container justifyContent="space-evenly">
      <Grid item xs={12} sm="auto">
        <InscribirAlumno
          refrescar={props.refrescar}
          abrir={props.abrir}
          mensaje={props.mensaje}
          tipo={props.tipo}
          idalumno={props.alumno.IdUsuario}
          idcursada={cursada.IdCursada}
        />
      </Grid>
    </Grid>
  );
};
