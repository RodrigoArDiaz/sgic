import * as React from "react";
import { Grid } from "@mui/material";
import { BorrarInscripcion } from "./BorrarInscripcion";
//Redux
import { useSelector } from "react-redux";

export const BotonAcciones = (props) => {
  //Recupero informacion de la cursada
  const { cursada } = useSelector((state) => state.cursada);

  return (
    <Grid container justifyContent="space-evenly">
      <Grid item xs={12} sm="auto">
        <BorrarInscripcion
          refrescar={props.refrescar}
          abrir={props.abrir}
          mensaje={props.mensaje}
          tipo={props.tipo}
          idalumno={props.alumno.IdUsuario}
          // idcursada={props.cursada.IdCursada}
          idcursada={cursada.IdCursada}
        />
      </Grid>
    </Grid>
  );
};
