/*****************************************
 *  Lista de items para superadministrador
 */

//Lista antes de seleccionar cátedra
const listaItemsMenuSuper = [
  {
    key: "Inicio",
    itemText: "Inicio",
    to: "",
    icono: "",
    dividerTop: false,
    dividerBottom: false,
    esSublist: true,
    sublist: [],
    esTitle: true,
  },
  {
    key: "mis_cátedras",
    itemText: "Mis cátedras",
    // to: "docentes/mis_cátedras",
    to: "/inicio/docentes/ingreso",
    icono: "assured_workload",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },

  {
    key: "superadministrador",
    itemText: "Superadministrador",
    to: "superadministrador",
    icono: "engineering_outlined",
    dividerTop: false,
    dividerBottom: false,
    esSublist: true,
    sublist: [],
    esTitle: true,
  },
  {
    key: "cátedras",
    itemText: "Cátedras",
    to: "superadministrador/gestion_catedras",
    icono: "account_balance",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "docentes",
    itemText: "Docentes",
    to: "superadministrador/gestion_docentes",
    icono: "co_present",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "alumnos",
    itemText: "Alumnos",
    to: "superadministrador/gestion_alumnos",
    icono: "school",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },

  {
    key: "cuenta",
    itemText: "Cuenta",
    to: "",
    icono: "",
    dividerTop: false,
    dividerBottom: false,
    esSublist: true,
    sublist: [],
    esTitle: true,
  },
  {
    key: "perfil",
    itemText: "Mi perfil",
    to: "mi_perfil",
    icono: "manage_accounts",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
];

//Lista despues de seleccinar la cátedra
const listaItemsMenuSuperConCursada = [
  {
    key: "Inicio",
    itemText: "Inicio",
    to: "",
    icono: "",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: true,
  },

  {
    key: "mis_cátedras",
    itemText: "Mis cátedras",
    // to: "docentes/mis_cátedras",
    to: "/inicio/docentes/ingreso",
    icono: "assured_workload",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },

  {
    key: "Gestión cursada",
    itemText: "Gestión cursada",
    to: "",
    icono: "",
    dividerTop: false,
    dividerBottom: false,
    esSublist: true,
    sublist: [],
    esTitle: true,
  },

  {
    key: "info_cursada",
    itemText: "Información cursada",
    to: "docentes/cursada/info_cursada",
    icono: "info",
    dividerTop: true,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "practicos",
    itemText: "Practicos",
    to: "docentes/cursada/practicos",
    icono: "article",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "examenes",
    itemText: "Examenes",
    to: "docentes/cursada/examenes",
    icono: "assignment",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "grupos",
    itemText: "Grupos",
    to: "docentes/cursada/grupos",
    icono: "group",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "inscripciones",
    itemText: "Inscripciones",
    to: "docentes/cursada/inscripciones",
    icono: "co_present",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "notas",
    itemText: "Notas",
    to: "docentes/cursada/notas",
    icono: "fact_check",
    dividerTop: false,
    dividerBottom: true,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },

  {
    key: "superadministrador",
    itemText: "Superadministrador",
    to: "superadministrador",
    icono: "engineering",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: true,
  },
  {
    key: "cátedras",
    itemText: "Cátedras",
    to: "superadministrador/gestion_catedras",
    icono: "account_balance",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "docentes",
    itemText: "Docentes",
    to: "superadministrador/gestion_docentes",
    icono: "co_present",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "alumnos",
    itemText: "Alumnos",
    to: "superadministrador/gestion_alumnos",
    icono: "school",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },

  {
    key: "cuenta",
    itemText: "Cuenta",
    to: "",
    icono: "",
    dividerTop: false,
    dividerBottom: false,
    esSublist: true,
    sublist: [],
    esTitle: true,
  },
  {
    key: "perfil",
    itemText: "Mi perfil",
    to: "mi_perfil",
    icono: "manage_accounts",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
  },
  //****Ejemplo de sublista */
  // {
  //   key: "superadministrador",
  //   itemText: "Superadministrador",
  //   to: "superadministrador",
  //   icono: "engineering",
  //   dividerTop: false,
  //   dividerBottom: false,
  //   esSublist: true,
  //   esTitle: false,
  //   sublist: [
  //     {
  //       key: "cátedras",
  //       itemText: "cátedras",
  //       to: "superadministrador/gestion_catedras",
  //       icono: "account_balance",
  //       dividerTop: false,
  //       dividerBottom: false,
  //       esSublist: false,
  //       sublist: [],
  //     },
  //     {
  //       key: "docentes",
  //       itemText: "Docentes",
  //       to: "superadministrador/gestion_docentes",
  //       icono: "co_present",
  //       dividerTop: false,
  //       dividerBottom: false,
  //       esSublist: false,
  //       sublist: [],
  //     },
  //     {
  //       key: "alumnos",
  //       itemText: "Alumnos",
  //       to: "superadministrador/gestion_alumnos",
  //       icono: "school",
  //       dividerTop: false,
  //       dividerBottom: false,
  //       esSublist: false,
  //       sublist: [],
  //     },
  //   ],
  // },
];

/*****************************************
 *  Lista de items para docentes
 */
//Lista docentes antes de seleccionar la cátedra
const listaItemsMenuDocente = [
  {
    key: "Inicio",
    itemText: "Inicio",
    to: "",
    icono: "",
    dividerTop: false,
    dividerBottom: false,
    esSublist: true,
    sublist: [],
    esTitle: true,
  },
  ,
  {
    key: "mis_cátedras",
    itemText: "Mis cátedras",
    // to: "docentes/mis_cátedras",
    to: "/inicio/docentes/ingreso",
    icono: "assured_workload",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "cuenta",
    itemText: "cuenta",
    to: "",
    icono: "",
    dividerTop: false,
    dividerBottom: false,
    esSublist: true,
    sublist: [],
    esTitle: true,
  },
  {
    key: "perfil",
    itemText: "Mi perfil",
    to: "mi_perfil",
    icono: "manage_accounts",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
  },
];

//Lista despues de seleccinar la cátedra
const listaItemsMenuDocenteConCursada = [
  {
    key: "Inicio",
    itemText: "Inicio",
    to: "",
    icono: "",
    dividerTop: false,
    dividerBottom: false,
    esSublist: true,
    sublist: [],
    esTitle: true,
  },
  {
    key: "mis_cátedras",
    itemText: "Mis cátedras",
    // to: "docentes/mis_cátedras",
    to: "/inicio/docentes/ingreso",
    icono: "assured_workload",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },

  {
    key: "Gestión cursada",
    itemText: "Gestión cursada",
    to: "",
    icono: "",
    dividerTop: false,
    dividerBottom: false,
    esSublist: true,
    sublist: [],
    esTitle: true,
  },
  {
    key: "info_cursada",
    itemText: "Informacion cursada",
    to: "docentes/cursada/info_cursada",
    icono: "info",
    dividerTop: true,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "practicos",
    itemText: "Practicos",
    to: "docentes/cursada/practicos",
    icono: "article",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "examenes",
    itemText: "Examenes",
    to: "docentes/cursada/examenes",
    icono: "assignment",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "grupos",
    itemText: "Grupos",
    to: "docentes/cursada/grupos",
    icono: "group",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "inscripciones",
    itemText: "Inscripciones",
    to: "docentes/cursada/inscripciones",
    icono: "co_present",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "notas",
    itemText: "Notas",
    to: "docentes/cursada/notas",
    icono: "fact_check",
    dividerTop: false,
    dividerBottom: true,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "cuenta",
    itemText: "cuenta",
    to: "",
    icono: "",
    dividerTop: false,
    dividerBottom: false,
    esSublist: true,
    sublist: [],
    esTitle: true,
  },
  {
    key: "perfil",
    itemText: "Mi perfil",
    to: "mi_perfil",
    icono: "manage_accounts",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
];

/*******************************
 *  Lista de items para alumnos
 */
const listaItemsMenuAlumno = [
  {
    key: "Inicio",
    itemText: "Inicio",
    to: "",
    icono: "",
    dividerTop: false,
    dividerBottom: false,
    esSublist: true,
    sublist: [],
    esTitle: true,
  },
  {
    key: "mis_cursadas",
    itemText: "Mis cursadas",
    to: "alumnos/mis_cursadas",
    icono: "auto_stories_outline",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "inscripciones_cursadas",
    itemText: "Inscripciones",
    to: "alumnos/inscripciones_cursadas",
    icono: "drive_file_rename_outline",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "cuenta",
    itemText: "Cuenta",
    to: "",
    icono: "",
    dividerTop: false,
    dividerBottom: false,
    esSublist: true,
    sublist: [],
    esTitle: true,
  },
  {
    key: "perfil",
    itemText: "Mi perfil",
    to: "mi_perfil",
    icono: "manage_accounts",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
];

/*******************************
 *  Lista de items para alumnos
 */
const listaItemsMenuAlumnoConCursada = [
  {
    key: "Inicio",
    itemText: "Inicio",
    to: "",
    icono: "",
    dividerTop: false,
    dividerBottom: false,
    esSublist: true,
    sublist: [],
    esTitle: true,
  },
  {
    key: "mis_cursadas",
    itemText: "Mis cursadas",
    to: "alumnos/mis_cursadas",
    icono: "auto_stories_outline",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "inscripciones_cursadas",
    itemText: "Inscripciones",
    to: "alumnos/inscripciones_cursadas",
    icono: "drive_file_rename_outline",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "cursada",
    itemText: "Cursada",
    to: "",
    icono: "",
    dividerTop: false,
    dividerBottom: false,
    esSublist: true,
    sublist: [],
    esTitle: true,
  },
  {
    key: "info_cursada",
    itemText: "Información cursada",
    to: "alumnos/info_cursada",
    icono: "info",
    dividerTop: true,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "notas",
    itemText: "Notas",
    to: "alumnos/mis_notas",
    icono: "fact_check",
    dividerTop: false,
    dividerBottom: true,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
  {
    key: "cuenta",
    itemText: "Cuenta",
    to: "",
    icono: "",
    dividerTop: false,
    dividerBottom: false,
    esSublist: true,
    sublist: [],
    esTitle: true,
  },
  {
    key: "perfil",
    itemText: "Mi perfil",
    to: "mi_perfil",
    icono: "manage_accounts",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
    esTitle: false,
  },
];

/***************************************** */
// const AniadirItems = (array, indice, items) => {
//   return [
//     ...array.slice(0, indice), // first half
//     items, // items to be inserted
//     ...array.slice(indice), // second half
//   ];
// };

/***************************
 * Exportacion de las listas
 */
export {
  listaItemsMenuSuper,
  listaItemsMenuSuperConCursada,
  listaItemsMenuDocente,
  listaItemsMenuDocenteConCursada,
  listaItemsMenuAlumno,
  listaItemsMenuAlumnoConCursada,
};
