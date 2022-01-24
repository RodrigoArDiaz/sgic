import React from "react";
import { ThemeProvider } from "@mui/material";
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
import Menu from "./components/Menu.js";

export default function App() {
  const login = useSelector((state) => state.login);
  const { isAuth } = login;

  return (
    <>
      <Router>
        <ThemeProvider theme={temaConfig}>
          <Routes>
            {/* Rutas publicas */}
            <Route
              path="/"
              element={
                !isAuth ? <PaginaInicioSesion /> : <Navigate to="/inicio" />
              }
            />

            <Route path="/acceso_alumno" element={<PaginaInicioSesion />} />

            <Route
              path="/acceso_docente"
              element={<PaginaInicioSesion mostrarRegistrarse={false} />}
            />

            <Route
              path="/acceso_superadministrador"
              element={<PaginaInicioSesion mostrarRegistrarse={false} />}
            />

            <Route path="/registrarse" element={<PaginaRegistrarse />} />

            <Route
              path="/recuperar_contrasenia"
              element={<PaginaRecuperarContrasenia />}
            />

            {/* Rutas privada: rol alumno*/}
            <Route
              path="/inicio/*"
              element={isAuth ? <Menu /> : <Navigate to="/acceso_alumno" />}
            >
              {/* <Route path="catedras" element={<PaginaCatedras />} />

              <Route path="docentes" element={<PaginaDocentes />} />

              <Route path="alumnos" element={<PaginaAlumnos />} /> */}
            </Route>

            {/* Rutas privada: rol docente*/}
            <Route
              path="/inicio_docente/*"
              element={
                isAuth ? (
                  <MiniDrawers></MiniDrawers>
                ) : (
                  <Navigate to="/acceso_docente" />
                )
              }
            >
              {/* <Route path="catedras" element={<PaginaCatedras />} />

              <Route path="docentes" element={<PaginaDocentes />} />

              <Route path="alumnos" element={<PaginaAlumnos />} /> */}
            </Route>

            {/* Rutas privada: rol supervisor*/}
            <Route
              path="/inicio_superadministrador/*"
              element={
                isAuth ? (
                  <MiniDrawers></MiniDrawers>
                ) : (
                  <Navigate to="/acceso_superadministrador" />
                )
              }
            >
              <Route path="catedras" element={<PaginaCatedras />} />

              <Route path="docentes" element={<PaginaDocentes />} />

              <Route path="alumnos" element={<PaginaAlumnos />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
    </>
  );
}
