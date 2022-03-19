import * as React from "react";
import { AgregarMateriaCatedra } from "../AgregarMateriaCatedra";

export const BotonAcciones = (props) => {
  return (
    <AgregarMateriaCatedra
      idcatedra={props.idcatedra}
      catedra={props.catedra}
      idusuario={props.idusuario}
      refrescar={props.refrescar}
      abrir={props.abrir}
      mensaje={props.mensaje}
      tipo={props.tipo}
      materia={props.materia}
      plan={props.plan}
      carrera={props.carrera}
      nombremateria={props.nombremateria}
    />
  );
};
