import { rootUrl } from "../rootUrl";

// const rootUrl = "http://127.0.0.1:8000/api";

const endpoints = {
  activarCuenta: rootUrl + "/activarcuenta",
  cambiarPass: rootUrl + "/cambiarpass",

  //Gestionar cursadas (superadministrador)
  borrarCursada: rootUrl + "/borrarcursada",

  //Gestion notas
  listarIntegrantes: rootUrl + "/listarintegrantes",
  //
  modificarecpra: rootUrl + "/modificarecpra",
};

export { endpoints };
