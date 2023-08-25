import * as React from "react";
//MUI
import { Grid } from "@mui/material";
import { BorrarParametro } from "./BorrarParametro";
import { ModificarParametro } from "./ModificarParametro";

/*** Componente BotonAcciones ***/
export const BotonAcciones = (props) => {
  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={12} sm="auto">
        <ModificarParametro
          idcursada={props.idcursada}
          parametro={props.parametro}
          refrescar={props.refrescar}
          abrir={props.abrir}
          mensaje={props.mensaje}
          tipo={props.tipo}
          semestre={props.semestre}
          Materia={props.Materia}
          anio={props.anio}
        />
      </Grid>

      <Grid item xs={12} sm="auto">
        <BorrarParametro
          parametro={props.parametro}
          refrescar={props.refrescar}
          abrir={props.abrir}
          mensaje={props.mensaje}
          tipo={props.tipo}
          idcursada={props.idcursada}
          materia={props.materia}
          nombremateria={props.nombremateria}
        />
      </Grid>
    </Grid>
  );
};
