import * as React from "react";
//MUI
import { Grid } from "@mui/material";
//
import { BorrarGrupo } from "./BorrarGrupo";
import { ModificarGrupo } from "./ModificarGrupo";
import { ListarIntegrantes } from "./ListarIntegrantes";
import { InscribirEnGrupo } from "./InscribirEnGrupo";

/*** Componente BotonAcciones***/
export const BotonAcciones = (props) => {
  return (
    <Grid container justifyContent="space-evenly">
      <Grid item xs={12} sm="auto">
        <ListarIntegrantes
          anio={props.anio}
          idcursada={props.idcursada}
          semestre={props.semestre}
          cursada={props.cursada}
          grupo={props.grupo}
        />
      </Grid>

      <Grid item xs={12} sm="auto">
        <InscribirEnGrupo
          anio={props.anio}
          idcursada={props.idcursada}
          semestre={props.semestre}
          Materia={props.Materia}
          cursada={props.cursada}
          grupo={props.grupo}
        />
      </Grid>

      <Grid item xs={12} sm="auto">
        <ModificarGrupo
          anio={props.anio}
          idcursada={props.idcursada}
          semestre={props.semestre}
          cursada={props.cursada}
          grupo={props.grupo}
          abrir={props.abrir}
          mensaje={props.mensaje}
          tipo={props.tipo}
          refrescar={props.refrescar}
        />
      </Grid>

      <Grid item xs={12} sm="auto">
        <BorrarGrupo
          anio={props.Anio}
          idcursada={props.idcursada}
          semestre={props.semestre}
          cursada={props.cursada}
          grupo={props.grupo}
          refrescar={props.refrescar}
          abrir={props.abrir}
          mensaje={props.mensaje}
          tipo={props.tipo}
        />
      </Grid>
    </Grid>
  );
};
