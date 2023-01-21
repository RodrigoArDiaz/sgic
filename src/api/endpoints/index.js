const rootUrl = "http://127.0.0.1:8000/api";

const endpoints = {
  activarCuenta: rootUrl + "/activarcuenta",
  cambiarPass: rootUrl + "/cambiarpass",

  //Gestionar cursadas (superadministrador)
  borrarCursada: rootUrl + "/borrarcursada",
};

export { endpoints };
