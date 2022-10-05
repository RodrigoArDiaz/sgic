/*****************************************
 *  Lista de items para superadministrador
 */

//Lista antes de seleccionar catedra
const listaItemsMenuSuper = [
  {
    key: "mis_catedras",
    itemText: "Mis catedras",
    // to: "docentes/mis_catedras",
    to: "/inicio/docentes/ingreso",
    icono: "assured_workload",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
  },
  {
    key: "superadministrador",
    itemText: "Superadministrador",
    to: "superadministrador",
    icono: "engineering_outlined",
    dividerTop: false,
    dividerBottom: false,
    esSublist: true,
    sublist: [
      {
        key: "catedras",
        itemText: "Catedras",
        to: "superadministrador/gestion_catedras",
        icono: "account_balance",
        dividerTop: false,
        dividerBottom: false,
        esSublist: false,
        sublist: [],
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
      },
    ],
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

//Lista despues de seleccinar la catedra
const listaItemsMenuSuperConCursada = [
  {
    key: "mis_catedras",
    itemText: "Mis catedras",
    // to: "docentes/mis_catedras",
    to: "/inicio/docentes/ingreso",
    icono: "assured_workload",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
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
  },
  {
    key: "superadministrador",
    itemText: "Superadministrador",
    to: "superadministrador",
    icono: "engineering",
    dividerTop: false,
    dividerBottom: false,
    esSublist: true,
    sublist: [
      {
        key: "catedras",
        itemText: "Catedras",
        to: "superadministrador/gestion_catedras",
        icono: "account_balance",
        dividerTop: false,
        dividerBottom: false,
        esSublist: false,
        sublist: [],
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
      },
    ],
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

/*****************************************
 *  Lista de items para docentes
 */
//Lista docentes antes de seleccionar la catedra
const listaItemsMenuDocente = [
  {
    key: "mis_catedras",
    itemText: "Mis catedras",
    // to: "docentes/mis_catedras",
    to: "/inicio/docentes/ingreso",
    icono: "assured_workload",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
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

//Lista despues de seleccinar la catedra
const listaItemsMenuDocenteConCursada = [
  {
    key: "mis_catedras",
    itemText: "Mis catedras",
    // to: "docentes/mis_catedras",
    to: "/inicio/docentes/ingreso",
    icono: "assured_workload",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
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

/*******************************
 *  Lista de items para alumnos
 */
const listaItemsMenuAlumno = [
  {
    key: "mis_cursadas",
    itemText: "Mis cursadas",
    to: "-------",
    icono: "drive_file_rename_outline",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
  },
  {
    key: "inscripciones_cursadas",
    itemText: "Inscripciones",
    to: "inscripciones_cursadas",
    icono: "drive_file_rename_outline",
    dividerTop: false,
    dividerBottom: false,
    esSublist: false,
    sublist: [],
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
};
