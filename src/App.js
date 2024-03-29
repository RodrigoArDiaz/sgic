import React from "react";
//Tema principal
import temaConfig from "./temaConfig.js";
//MUI
import { CssBaseline, ThemeProvider } from "@mui/material";
//React router dom
import {
  BrowserRouter as Router,
  HashRouter,
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
// import ActivarCuenta from "./components/Sesiones/ActivarCuenta.js";
//Paginas
import PaginaRecuperarContrasenia from "./pages/PaginaRecuperarContrasenia.js";
import PaginaCatedras from "./pages/PaginaCatedras.js";
import PaginaDocentes from "./pages/PaginaDocentes.js";
import PaginaAlumnos from "./pages/PaginaAlumnos.js";
import PaginaRegistrarse from "./pages/PaginaRegistrarse.js";
import PaginaPerfilUsuario from "./pages/PaginaPerfilUsuario.js";
import PaginaInscripcionesCursadas from "./pages/PaginaInscripcionesCursadas.js";
import PaginaDocentesCursadasCuerpo from "./pages/PaginaDocentesCursadasCuerpo.js";
import PaginaDocentesPracticos from "./pages/PaginaDocentesPracticos.js";
import PaginaDocentesExamenes from "./pages/PaginaDocentesExamenes.js";
import PaginaDocentesGrupos from "./pages/PaginaDocentesGrupos.js";
import PaginaDocentesInscripciones from "./pages/PaginaDocentesInscripciones.js";
import PaginaDocentesNotas from "./pages/PaginaDocentesNotas.js";
//Unificacion 06/2022
import FormularioIniciarSesionSuper from "./components/Sesiones/FormularioIniciarSesionSuper.js";
import PaginaDocentesNavegacion from "./components/NavegacionDocente/PaginaDocentesNavegacion.js";
import PaginaActivarCuenta from "./pages/PaginaActivarCuenta.js";
import PaginaResetPass from "./pages/PaginaResetPass.js";
import PaginaAlumnoMisCursadas from "./pages/PaginaAlumnoMisCursadas.js";
import PaginaAlumnosMisNotas from "./pages/PaginaAlumnoMisNotas.js";
import PaginaAlumnosInfoCursada from "./pages/PaginaAlumnoInfoCursada.js";
import PaginaError from "./pages/PaginaError.js";
import Pagina404 from "./pages/Pagina404.js";

export default function App() {
  const login = useSelector((state) => state.login);
  const { isAuth } = login;

  return (
    <>
      <HashRouter>
        {/* <Router> */}
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
              {/*************************
              Ruta: Redireccionar a pagina 404*/}
              {/* <Route path="*" element={<Navigate to="/pagina_404" />} /> */}

              {/*********************
              Ruta: Inicio de sesion*/}
              {/* <Route
                path="/"
                element={
                  !isAuth ? <PaginaInicioSesion /> : <Navigate to="/inicio" />
                }
                
              /> */}

              <Route path="/" element={<FormularioIniciarSesionSuper />} />

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
                element={<PaginaActivarCuenta />}
              ></Route>

              {/*************************
              Ruta: Resetear contraseña*/}
              <Route
                path="/reset_pass/:codigoActivacion"
                element={<PaginaResetPass />}
              ></Route>

              {/*************************
              Ruta: Resetear contraseña*/}
              <Route path="/error" element={<PaginaError />}></Route>

              {/*************************
              Ruta: Pagina 404*/}
              {/* <Route path="/pagina_404" element={<Pagina404 />} /> */}

              {/*****************************************************
               Rutas privadas: necesitan autenticacion
               ******************************************************/}
              <Route
                path="/inicio/*"
                // element={isAuth ? <Menu /> : <Navigate to="/" />}
                element={<Menu />}
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
                  path="docentes/ingreso"
                  element={<PaginaDocentesNavegacion />}
                />

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
                  path="alumnos/mis_cursadas"
                  element={<PaginaAlumnoMisCursadas />}
                />

                <Route
                  path="alumnos/inscripciones_cursadas"
                  element={<PaginaInscripcionesCursadas />}
                />

                <Route
                  path="alumnos/mis_notas"
                  element={<PaginaAlumnosMisNotas />}
                />

                <Route
                  path="alumnos/info_cursada"
                  element={<PaginaAlumnosInfoCursada />}
                />
                {/* Todos los usuarios */}
                <Route path="mi_perfil" element={<PaginaPerfilUsuario />} />
              </Route>
            </Routes>
          </SnackbarProvider>
        </ThemeProvider>
        {/* </Router> */}
      </HashRouter>
    </>
  );
}
