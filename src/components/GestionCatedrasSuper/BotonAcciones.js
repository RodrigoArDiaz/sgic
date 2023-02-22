import * as React from "react";
//MUI
import { Grid } from "@mui/material";
//Componentes propiosa
import { BorrarCatedra } from "./BorrarCatedra";
import { ModificarCatedra } from "./ModificarCatedra";
import { ListarUsuarios } from "./ListarUsuarios";
import { AgregarMaterias } from "./AgregarMaterias";
import { AgregarUsuarios } from "./AgregarUsuarios";
import { ListarMaterias } from "./ListarMaterias/ListarMaterias";

/*** Componente BotonAcciones ***/
export const BotonAcciones = (props) => {
  return (
    <Grid container justifyContent="space-evenly">
      <Grid item xs={12} sm="auto" display="flex" alignItems="center">
        <AgregarMaterias idcatedra={props.idcatedra} catedra={props.catedra} />
      </Grid>

      <Grid item xs={12} sm="auto" display="flex" alignItems="center">
        <ListarMaterias idcatedra={props.idcatedra} catedra={props.catedra} />
      </Grid>

      <Grid item xs={12} sm="auto" display="flex" alignItems="center">
        <AgregarUsuarios idcatedra={props.idcatedra} catedra={props.catedra} />
      </Grid>

      <Grid item xs={12} sm="auto" display="flex" alignItems="center">
        <ListarUsuarios idcatedra={props.idcatedra} catedra={props.catedra} />
      </Grid>

      <Grid item xs={12} sm="auto" display="flex" alignItems="center">
        <ModificarCatedra
          idcatedra={props.idcatedra}
          catedra={props.catedra}
          refrescar={props.refrescar}
          abrir={props.abrir}
          mensaje={props.mensaje}
          tipo={props.tipo}
        />
      </Grid>

      <Grid item xs={12} sm="auto" display="flex" alignItems="center">
        <BorrarCatedra
          idcatedra={props.idcatedra}
          refrescar={props.refrescar}
          abrir={props.abrir}
          mensaje={props.mensaje}
          tipo={props.tipo}
          nombre={props.nombre}
        />
      </Grid>
    </Grid>
  );
};
