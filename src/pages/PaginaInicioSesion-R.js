import React from "react";
import FormularioIniciarSesion from "../components/FormularioIniciarSesion";

const PaginaInicioSesion = ({ mostrarRegistrarse, tipo }) => {
  return (
    <>
      <FormularioIniciarSesion
        mostrarRegistrarse={mostrarRegistrarse}
        tipo={tipo}
      />
    </>
  );
};

export default PaginaInicioSesion;
