import React from "react";
// import FormularioIniciarSesionU from "../components/FormularioIniciarSesion";
import FormularioIniciarSesionUnificado from "../components/Sesiones/FormularioIniciarSesionUnificado";

const PaginaInicioSesion = ({ mostrarRegistrarse, tipo }) => {
  return (
    <>
      <FormularioIniciarSesionUnificado
        mostrarRegistrarse={mostrarRegistrarse}
        tipo={tipo}
      />
    </>
  );
};

export default PaginaInicioSesion;
