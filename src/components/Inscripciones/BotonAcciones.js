import * as React from "react";
//MUI
import { Grid } from "@mui/material";
import { BorrarInscripcion } from "./BorrarInscripcion";
//Redux
import { useSelector } from "react-redux";
import VerInformacionContacto from "./Contactos/VerInformacionContacto";

/*** Componente BotonAcciones ***/
export const BotonAcciones = (props) => {
  //Recupero informacion de la cursada
  const { cursada } = useSelector((state) => state.cursada);

  return (
    <Grid container justifyContent="space-evenly">
      <Grid item xs={12} sm="auto">
        <VerInformacionContacto
          alumno={props.alumno}
          idAlumno={props.alumno.IdUsuario}
        />
      </Grid>

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
