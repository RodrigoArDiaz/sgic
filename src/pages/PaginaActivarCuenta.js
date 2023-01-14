import React from "react";
import AuthWrapper from "../components/Sesiones/AuthWrapper";
import ActivarCuenta from "../components/Sesiones/ActivarCuenta";

const PaginaActivarCuenta = () => {
  return (
    <AuthWrapper childMaxWidthXs={0} maxWidthChildLg={0}>
      <ActivarCuenta />
    </AuthWrapper>
  );
};

export default PaginaActivarCuenta;
