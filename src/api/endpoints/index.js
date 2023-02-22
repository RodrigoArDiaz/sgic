import { rootUrl } from "../rootUrl";

const endpoints = {
  //Sesion
  acceso: rootUrl + "/acceso",
  activarCuenta: rootUrl + "/activarcuenta",
  cambiarPass: rootUrl + "/cambiarpass",
  registroAlumno: rootUrl + "/registroalumno",
  registroConsultarus: rootUrl + "/consultarus",
  registroConsultarmail: rootUrl + "/consultarmail",
  registroConsultadni: rootUrl + "/consultardni",
  registroConsultarlib: rootUrl + "/consultarlib",
  registroResetPass: rootUrl + "/resetpass",

  //Superadministrador
  //**Catedras
  crearCatedra: rootUrl + "/crearcatedra",
  consultarNomCat: rootUrl + "/consultarnomcat",
  bajaCatedra: rootUrl + "/bajacatedra",
  altaCatedra: rootUrl + "/altacatedra",
  buscarMaterias: rootUrl + "/buscarmaterias",
  agregarMateria: rootUrl + "/agregarmateria",
  listarMaterias: rootUrl + "/listarmaterias",
  borrarMateria: rootUrl + "/borrarmateria",
  buscarUsNoCat: rootUrl + "/buscarusnocat",
  consultarUsCat: rootUrl + "/consultaruscat",
  agregarUsCat: rootUrl + "/agregaruscat",
  listarUsCat: rootUrl + "/listaruscat",
  modificarUsCat: rootUrl + "/modificaruscat",
  borrarUsCat: rootUrl + "/borraruscat",
  modificarCatedra: rootUrl + "/modificarcatedra",
  consultarNomCat: rootUrl + "/consultarnomcat",
  borrarCatedra: rootUrl + "/borrarcatedra",
  //**Alumnos
  buscarAlumnos: rootUrl + "/buscaralumnos",
  bajaAlumno: rootUrl + "/bajaalumno",
  altaAlumno: rootUrl + "/altaalumno",
  modificarAlumno: rootUrl + "/modificaralumno",
  borrarAlumno: rootUrl + "/borraralumno",

  //Gestionar cursadas (superadministrador)

  borrarCursada: rootUrl + "/borrarcursada",

  //
  buscarCatedras: rootUrl + "/buscarcatedras",

  //Gestion notas
  listarIntegrantes: rootUrl + "/listarintegrantes",
  //
  modificarecpra: rootUrl + "/modificarecpra",
};

export { endpoints };
