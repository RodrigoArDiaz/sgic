import * as React from "react";
//MUI
import { Grid } from "@mui/material";
//
import { BorrarRolUsuario } from "../BorrarRolUsuario";
import { ModificarRolUsuario } from "../ModificarRolUsuario";

export const BotonAcciones = (props) => {
  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={12} sm="auto">
        <ModificarRolUsuario
          idcatedra={props.idcatedra}
          catedra={props.catedra}
          idusuario={props.idusuario}
          refrescar={props.refrescar}
          abrir={props.abrir}
          mensaje={props.mensaje}
          tipo={props.tipo}
        />
      </Grid>

      <Grid item xs={12} sm="auto">
        <BorrarRolUsuario
          idcatedra={props.idcatedra}
          catedra={props.catedra}
          idusuario={props.idusuario}
          refrescar={props.refrescar}
          abrir={props.abrir}
          mensaje={props.mensaje}
          tipo={props.tipo}
        />
      </Grid>
    </Grid>
  );
};
