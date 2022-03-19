import * as React from "react";
//MUI
import { Grid } from "@mui/material";
//
import { BorrarMateria } from "./BorrarMateria";

export const BotonAcciones = (props) => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm="auto">
        <BorrarMateria
          idcatedra={props.idcatedra}
          catedra={props.catedra}
          idusuario={props.idusuario}
          refrescar={props.refrescar}
          abrir={props.abrir}
          mensaje={props.mensaje}
          tipo={props.tipo}
          materia={props.materia}
          nombremateria={props.nombremateria}
        />
      </Grid>
    </Grid>
  );
};
