import React from "react";
import { Button, CssBaseline, ThemeProvider } from "@mui/material";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import temaConfig from "./temaConfig.js";
import MiniDrawers from "./components/MiniDrawers";
import PaginaCatedras from "./pages/PaginaCatedras.js";
import PaginaDocentes from "./pages/PaginaDocentes.js";
import PaginaAlumnos from "./pages/PaginaAlumnos.js";
import PaginaInicioSesion from "./pages/PaginaInicioSesion.js";
import PaginaRegistrarse from "./pages/PaginaRegistrarse.js";
import PaginaRecuperarContrasenia from "./pages/PaginaRecuperarContrasenia.js";
import { useSelector } from "react-redux";
// import Menu from "./components/Menu.js";
import PaginaPerfilUsuario from "./pages/PaginaPerfilUsuario.js";
import { SnackbarProvider, useSnackbar } from "notistack";
import PaginaInscripcionesCursadas from "./pages/PaginaInscripcionesCursadas.js";
import Menu from "./components/MainLoyaut/Menu.js";
import IconButtonNotiStack from "./components/Material UI - Componentes Modificados/IconButtonNotiStack.js";
import PruebaTablaResponsive from "./components/PruebaTablaResponsive.js";

const listaItemsMenuSuper = [
  {
    key: "catedras",
    itemText: "Catedras",
    to: "catedras",
    icon: "account_balance",
  },
  {
    key: "docentes",
    itemText: "Docentes",
    to: "docentes",
    icon: "co_present",
  },
  {
    key: "alumnos",
    itemText: "Alumnos",
    to: "alumnos",
    icon: "school",
  },
  {
    key: "perfil",
    itemText: "Mi perfil",
    to: "mi_perfil",
    icon: "manage_accounts",
  },
];

const listaItemsMenuAlumno = [
  {
    key: "perfil",
    itemText: "Mi perfil",
    to: "mi_perfil",
    icon: "manage_accounts",
  },
  {
    key: "inscripciones_cursadas",
    itemText: "Inscripciones",
    to: "inscripciones_cursadas",
    icon: "drive_file_rename_outline",
  },
];

const listaItemsDocente = [
  {
    key: "perfil",
    itemText: "Mi perfil",
    to: "mi_perfil",
    icon: "manage_accounts",
  },
];

// import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

export default function App() {
  const login = useSelector((state) => state.login);
  const { isAuth } = login;

  return (
    <>
      <Router>
        <ThemeProvider theme={temaConfig}>
          <CssBaseline />
          <SnackbarProvider
            maxSnack={3}
            action={(keySnackbar) => (
              <IconButtonNotiStack keySnackbar={keySnackbar} />
            )}
          >
            <Routes>
              {/* Rutas publicas */}
              {/* <Route
                path="/"
                element={
                  !isAuth ? <PaginaInicioSesion /> : <Navigate to="/inicio" />
                }
              /> */}

              <Route
                path="/"
                element={
                  <PaginaInicioSesion mostrarRegistrarse={true} tipo="alumno" />
                }
              />

              {/* <Route path="/acceso_alumno" element={<PaginaInicioSesion />} /> */}

              <Route
                path="/acceso_docente"
                element={
                  <PaginaInicioSesion
                    mostrarRegistrarse={false}
                    tipo="docente"
                  />
                }
              />

              <Route
                path="/acceso_superadministrador"
                element={
                  <PaginaInicioSesion mostrarRegistrarse={false} tipo="super" />
                }
              />

              <Route path="/registrarse" element={<PaginaRegistrarse />} />

              <Route
                path="/recuperar_contrasenia"
                element={<PaginaRecuperarContrasenia />}
              />

              {/* Rutas privada: rol alumno*/}
              <Route
                path="/inicio/*"
                element={
                  isAuth ? (
                    <Menu listaItemsMenu={listaItemsMenuAlumno} />
                  ) : (
                    <Navigate to="/acceso_alumno" />
                  )
                }
              >
                <Route path="mi_perfil" element={<PaginaPerfilUsuario />} />
                <Route
                  path="inscripciones_cursadas"
                  element={<PaginaInscripcionesCursadas />}
                />
              </Route>

              {/* Rutas privada: rol docente*/}
              <Route
                path="/inicio_docente/*"
                element={
                  isAuth ? (
                    <Menu listaItemsMenu={listaItemsDocente} />
                  ) : (
                    <Navigate to="/acceso_docente" />
                  )
                }
              ></Route>

              {/* Rutas privada: rol supervisor*/}
              <Route
                path="/inicio_superadministrador/*"
                element={
                  isAuth ? (
                    <Menu listaItemsMenu={listaItemsMenuSuper} />
                  ) : (
                    <Navigate to="/acceso_superadministrador" />
                  )
                }
              >
                <Route path="catedras" element={<PaginaCatedras />} />
                <Route path="docentes" element={<PaginaDocentes />} />
                <Route path="alumnos" element={<PaginaAlumnos />} />
                <Route path="mi_perfil" element={<PaginaPerfilUsuario />} />
              </Route>
            </Routes>
          </SnackbarProvider>
        </ThemeProvider>
      </Router>
    </>
  );
}
