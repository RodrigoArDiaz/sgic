import * as React from "react";
import { Grid } from "@mui/material";
import { BorrarAlumno } from "./BorrarAlumno";
import { ModificarAlumno } from "./ModificarAlumno";

//
export const BotonAcciones = (props) => {
  return (
    <Grid container justifyContent="space-around">
      <Grid item xs={12} sm="auto">
        <ModificarAlumno
          alumno={props.alumno}
          refrescar={props.refrescar}
          abrir={props.abrir}
          mensaje={props.mensaje}
          tipo={props.tipo}
        />
      </Grid>

      <Grid item xs={12} sm="auto">
        <BorrarAlumno
          refrescar={props.refrescar}
          abrir={props.abrir}
          mensaje={props.mensaje}
          tipo={props.tipo}
          idalumno={props.alumno.IdUsuario}
        />
      </Grid>
    </Grid>
  );
};
