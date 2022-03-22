/*****************************************
 *  Lista de items para superadministrador
 */
const listaItemsMenuSuper = [
  {
    key: "mis_catedras",
    itemText: "Mis catedras",
    to: "docentes/mis_catedras",
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
const listaItemsMenuDocente = [
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

export { listaItemsMenuSuper, listaItemsMenuDocente, listaItemsMenuAlumno };
