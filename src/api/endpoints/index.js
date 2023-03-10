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
  //**Practicos
  buscarPracticos: rootUrl + "/buscarpracticos",
  crearPractico: rootUrl + "/crearpractico",
  consultarNomPractico: rootUrl + "/consultarnompractico",
  bajaPractico: rootUrl + "/bajapractico",
  altaPractico: rootUrl + "/altapractico",
  modificarPractico: rootUrl + "/modificarpractico",
  borrarPractico: rootUrl + "/borrarpractico",
  //**Examenes
  buscarExamenes: rootUrl + "/buscarexamenes",
  listarParametros: rootUrl + "/listarparametros",
  crearExamen: rootUrl + "/crearexamen",
  consultarNomExamen: rootUrl + "/consultarnomexamen",
  listarExamenes: rootUrl + "/listarexamenes",
  bajaExamen: rootUrl + "/bajaexamen",
  altaExamen: rootUrl + "/altaexamen",
  modificarExamen: rootUrl + "/modificarexamen",
  borrarExamen: rootUrl + "/borrarexamen",
  //**Grupos
  buscarGrupos: rootUrl + "/buscargrupos",
  crearGrupo: rootUrl + "/creargrupo",
  consultarNomGrupo: rootUrl + "/consultarnomgrupo",
  bajaGrupo: rootUrl + "/bajagrupo",
  altaGrupo: rootUrl + "/altagrupo",
  listarIntegrantes: rootUrl + "/listarintegrantes",
  borrarAlumnoGrupo: rootUrl + "/borraralumnogrupo",
  listarNoIntegrantes: rootUrl + "/listarnointegrantes",
  inscribirEnGrupo: rootUrl + "/inscribirengrupo",
  modificarGrupo: rootUrl + "/modificargrupo",
  consultarNomGrupo: rootUrl + "/consultarnomgrupo",
  borrarGrupo: rootUrl + "/borrargrupo",
  //**Inscripciones
  buscarInscriptos: rootUrl + "/buscarinscriptos",
  exportarPdf: rootUrl + "/exportarpdf",
  exportarExcel: rootUrl + "/exportarexcel",
  cuadricula: rootUrl + "/cuadricula",
  buscarNoInscriptos: rootUrl + "/buscarnoinscriptos",
  inscribirAlumno: rootUrl + "/inscribiralumno",
  modificarInscripcion: rootUrl + "/modificarinscripcion",
  borrarInscripcion: rootUrl + "/borrarinscripcion",
  //**Notas
  buscarNotasPracticos: rootUrl + "/buscarnotaspracticos",
  buscarECPracticos: rootUrl + "/buscarecpracticos",
  modificarECPra: rootUrl + "/modificarecpra",
  modificarNotaPractico: rootUrl + "/modificarnotapractico",

  buscarNotasExamenes: rootUrl + "/buscarnotasexamenes",
  buscarECExamenes: rootUrl + "/buscarecexamenes",
  modificarECEx: rootUrl + "/modificarecex",
  modificarNotaExamen: rootUrl + "/modificarnotaexamen",
  buscarSituacionFinal: rootUrl + "/buscarsituacionfinal",
  modificarEstadoInscripto: rootUrl + "/modificarestadoinscripto",

  //Gestionar cursadas (administrador)
  borrarCursada: rootUrl + "/borrarcursada",

  //
  buscarCatedras: rootUrl + "/buscarcatedras",
};

export { endpoints };
