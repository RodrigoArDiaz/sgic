import React from "react";
import ActivarCuenta from "../components/Sesiones/ActivarCuenta";
import AuthWrapperTransparente from "../components/Sesiones/AuthWrapperTransparente";

const PaginaActivarCuenta = () => {
  return (
    <AuthWrapperTransparente childMaxWidthXs={0} maxWidthChildLg={0}>
      <ActivarCuenta />
    </AuthWrapperTransparente>
  );
};

export default PaginaActivarCuenta;
