import React from "react";
//Tema principal
import temaConfig from "./temaConfig.js";
//MUI
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
//React router dom
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
//Reac redux
import { useSelector } from "react-redux";
//Notisctack
import { SnackbarProvider } from "notistack";
//Componentes
import Menu from "./components/Menu/Menu.js";
import IconButtonNotiStack from "./components/Material UI - Componentes Modificados/IconButtonNotiStack.js";
import ResetPass from "./components/Sesiones/ResetPass.js";
import ActivarCuenta from "./components/Sesiones/ActivarCuenta.js";
//Paginas
import PaginaRecuperarContrasenia from "./pages/PaginaRecuperarContrasenia.js";
import PaginaCatedras from "./pages/PaginaCatedras.js";
import PaginaDocentes from "./pages/PaginaDocentes.js";
import PaginaAlumnos from "./pages/PaginaAlumnos.js";
import PaginaInicioSesion from "./pages/PaginaInicioSesion.js";
import PaginaRegistrarse from "./pages/PaginaRegistrarse.js";
import PaginaDocentesCursadas from "./pages/PaginaDocentesCursadas.js";
import PaginaPerfilUsuario from "./pages/PaginaPerfilUsuario.js";
import PaginaInscripcionesCursadas from "./pages/PaginaInscripcionesCursadas.js";
import PaginaDocentesInicio from "./components/NavegacionDocente/PaginaDocentesInicio.js";
import PaginaDocentesCursadasCuerpo from "./pages/PaginaDocentesCursadasCuerpo.js";
import PaginaDocentesPracticos from "./pages/PaginaDocentesPracticos.js";
import PaginaDocentesExamenes from "./pages/PaginaDocentesExamenes.js";
import PaginaDocentesGrupos from "./pages/PaginaDocentesGrupos.js";
import PaginaDocentesInscripciones from "./pages/PaginaDocentesInscripciones.js";
import PaginaDocentesNotas from "./pages/PaginaDocentesNotas.js";

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
              {/*****************************************************
               Rutas publicas: no necesitan autenticacion
               ******************************************************/}

              {/*********************
              Ruta: Inicio de sesion*/}
              <Route
                path="/"
                element={
                  !isAuth ? <PaginaInicioSesion /> : <Navigate to="/inicio" />
                }
              />

              {/****************
              Ruta: Registrarse*/}
              <Route path="/registrarse" element={<PaginaRegistrarse />} />

              <Route
                path="/recuperar_contrasenia"
                element={<PaginaRecuperarContrasenia />}
              />

              {/*******************
              Ruta: Activar Cuenta*/}
              <Route
                path="/activar_cuenta/:codigoActivacion"
                element={<ActivarCuenta />}
              ></Route>

              {/*************************
              Ruta: Resetear contraseña*/}
              <Route
                path="/reset_pass/:codigoActivacion"
                element={<ResetPass />}
              ></Route>

              {/*****************************************************
               Rutas privadas: necesitan autenticacion
               ******************************************************/}
              <Route
                path="/inicio/*"
                element={isAuth ? <Menu /> : <Navigate to="/" />}
              >
                {/* Superadministrador */}
                <Route
                  path="superadministrador"
                  element={<PaginaCatedras />}
                  exact
                ></Route>

                <Route
                  path="superadministrador/gestion_catedras"
                  element={<PaginaCatedras />}
                />
                <Route
                  path="superadministrador/gestion_docentes"
                  element={<PaginaDocentes />}
                />
                <Route
                  path="superadministrador/gestion_alumnos"
                  element={<PaginaAlumnos />}
                />

                {/* Docentes */}
                <Route
                  path="docentes/mis_catedras"
                  element={<PaginaDocentesInicio />}
                />

                {/* <Route
                  path="docentes/cursadas"
                  element={<PaginaDocentesCursadas />}
                /> */}

                <Route
                  path="docentes/cursada/info_cursada"
                  element={<PaginaDocentesCursadasCuerpo />}
                />

                <Route
                  path="docentes/cursada/practicos"
                  element={<PaginaDocentesPracticos />}
                />

                <Route
                  path="docentes/cursada/examenes"
                  element={<PaginaDocentesExamenes />}
                />

                <Route
                  path="docentes/cursada/grupos"
                  element={<PaginaDocentesGrupos />}
                />

                <Route
                  path="docentes/cursada/inscripciones"
                  element={<PaginaDocentesInscripciones />}
                />

                <Route
                  path="docentes/cursada/notas"
                  element={<PaginaDocentesNotas />}
                />

                {/* Alumnos */}
                <Route
                  path="inscripciones_cursadas"
                  element={<PaginaInscripcionesCursadas />}
                />
                {/* Todos los usuarios */}
                <Route path="mi_perfil" element={<PaginaPerfilUsuario />} />
              </Route>
            </Routes>
          </SnackbarProvider>
        </ThemeProvider>
      </Router>
    </>
  );
}
