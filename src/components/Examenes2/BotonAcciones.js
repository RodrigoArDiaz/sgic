import * as React from "react";
import { Grid } from "@mui/material";
import { BorrarExamen } from "./BorrarExamen";
import { ModificarExamen } from "./ModificarExamen";

export const BotonAcciones = (props) => {
  return (
    <Grid container justifyContent="space-evenly">
      <Grid item xs={12} sm="auto">
        <ModificarExamen
          anio={props.anio}
          idcursada={props.idcursada}
          semestre={props.semestre}
          cursada={props.cursada}
          examen={props.examen}
          abrir={props.abrir}
          mensaje={props.mensaje}
          tipo={props.tipo}
          refrescar={props.refrescar}
          parametros={props.parametros}
        />
      </Grid>

      <Grid item xs={12} sm="auto">
        <BorrarExamen
          anio={props.Anio}
          idcursada={props.idcursada}
          semestre={props.semestre}
          cursada={props.cursada}
          examen={props.examen}
          refrescar={props.refrescar}
          abrir={props.abrir}
          mensaje={props.mensaje}
          tipo={props.tipo}
        />
      </Grid>
    </Grid>
  );
};
