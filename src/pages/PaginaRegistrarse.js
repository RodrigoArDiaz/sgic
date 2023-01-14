import React from "react";
import FormularioRegistro from "../components/Sesiones/FormularioRegistro";
import { ThemeProvider } from "@mui/material";
import temaConfig from "../temaConfig.js";
import AuthWrapper from "../components/Sesiones/AuthWrapper";
const PaginaRegistrarse = () => {
  return (
    <>
      <AuthWrapper childMaxWidthXs={300} maxWidthChildLg={475}>
        <FormularioRegistro />
      </AuthWrapper>
    </>
  );
};

export default PaginaRegistrarse;
