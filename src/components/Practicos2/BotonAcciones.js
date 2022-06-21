import * as React from "react";
import { Grid } from "@mui/material";
import { BorrarPractico } from "./BorrarPractico";
import { ModificarPractico } from "./ModificarPractico";

export const BotonAcciones = (props) => {
  return (
    <Grid container justifyContent="space-evenly">
      <Grid item xs={12} sm="auto">
        <ModificarPractico
          anio={props.anio}
          idcursada={props.idcursada}
          semestre={props.semestre}
          cursada={props.cursada}
          practico={props.practico}
          abrir={props.abrir}
          mensaje={props.mensaje}
          tipo={props.tipo}
          refrescar={props.refrescar}
        />
      </Grid>

      <Grid item xs={12} sm="auto">
        <BorrarPractico
          anio={props.Anio}
          idcursada={props.idcursada}
          semestre={props.semestre}
          cursada={props.cursada}
          practico={props.practico}
          refrescar={props.refrescar}
          abrir={props.abrir}
          mensaje={props.mensaje}
          tipo={props.tipo}
        />
      </Grid>
    </Grid>
  );
};
