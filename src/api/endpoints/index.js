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
  buscarMateriasCat: rootUrl + "/buscarmateriascat",
  buscarCursadas: rootUrl + "/buscarcursadas",

  //Docentes
  listarCatUs: rootUrl + "/listarcatus",
  crearCursada: rootUrl + "/crearcursada",
  consultarAnioSem: rootUrl + "/consultaraniosem",
  agregarParametro: rootUrl + "/agregarparametro",
  consultarTipoParam: rootUrl + "/consultartipoparam",
  consultarPnt: rootUrl + "/consultarpnt",
  listarParametros: rootUrl + "/listarparametros",
  modificarParametro: rootUrl + "/modificarparametro",
  consultarTipoParam: rootUrl + "/consultartipoparam",
  borrarParametro: rootUrl + "/borrarparametro",
  clonarCursada: rootUrl + "/clonarcursada",
  consultarPntCur: rootUrl + "/consultarpntcur",
  modificarCursada: rootUrl + "/modificarcursada",
  altaCursada: rootUrl + "/altacursada",
  bajaCursada: rootUrl + "/bajacursada",
  abrirInscripcion: rootUrl + "/abririnscripcion",
  //**Cursada
  infoCursada: rootUrl + "/infocursada",

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
