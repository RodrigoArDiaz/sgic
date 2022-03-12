import React from "react";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import temaConfig from "./temaConfig.js";
import MiniDrawers from "./components/MiniDrawers";
import PaginaCatedras from "./pages/PaginaCatedras.js";
import PaginaDocentes from "./pages/PaginaDocentes.js";
import PaginaAlumnos from "./pages/PaginaAlumnos.js";
import PaginaInicioSesion from "./pages/PaginaInicioSesion-lucho.js";
import PaginaRegistrarse from "./pages/PaginaRegistrarse.js";
import PaginaDocentesCursadas from "./pages/PaginaDocentesCursadas.js";
import PaginaRecuperarContrasenia from "./pages/PaginaRecuperarContrasenia.js";
import { EditarExamenEC } from "./components/Notas/EditarExamenEC";

import FormularioIniciarSesionSuper from "./components/Sesiones/FormularioIniciarSesionSuper";
import ActivarCuenta from "./components/Sesiones/ActivarCuenta";
import { Borrar } from "./components/Inscripciones/Borrar";
import ResetPass from "./components/Sesiones/ResetPass.js";
import PaginaDocentesNavegacion from "./components/NavegacionDocente/PaginaDocentesNavegacion.js";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PaginaInicioSesion />} />

          <Route
            path="/iniciar_sesion_alumno"
            element={<PaginaInicioSesion />}
          />

          <Route
            path="/iniciar_sesion_super"
            element={
              <ThemeProvider theme={temaConfig}>
                <FormularioIniciarSesionSuper />
              </ThemeProvider>
            }
          />

          <Route
            path="/iniciar_sesion_docente"
            element={<PaginaInicioSesion mostrarRegistrarse={false} />}
          />

          <Route path="/registrarse" element={<PaginaRegistrarse />} />

          <Route
            path="/recuperar_contrasenia"
            element={<PaginaRecuperarContrasenia />}
          />

          <Route
            path="/principal"
            element={<MiniDrawers theme={temaConfig} />}
          />

          <Route path="/cat" element={<PaginaCatedras />} />

          <Route path="/docentes" element={<PaginaDocentes />} />

          <Route path="/alumnos" element={<PaginaAlumnos />} />

          <Route path="*" element={<PaginaCatedras />} />

          <Route
            path="/docentes/cursadas"
            element={<PaginaDocentesCursadas theme={temaConfig} />}
          />

          <Route
            path="/docentes/ingreso"
            element={<PaginaDocentesNavegacion theme={temaConfig} />}
          />

          <Route
            path="/docentes/notas/ec"
            element={<EditarExamenEC theme={temaConfig} />}
          />

          <Route path="/borrar" element={<Borrar />} />

          <Route
            path="/activar_cuenta/:codigoActivacion"
            element={<ActivarCuenta />}
          ></Route>

          <Route
            path="/reset_pass/:codigoActivacion"
            element={<ResetPass />}
          ></Route>
        </Routes>
      </Router>

      {/*
            <Router>
                
            <MiniDrawers theme={temaConfig}/>
                { <ThemeProvider theme={temaConfig}>
                    <Routes>
                        <Route
                            path="/cat"
                            element={<PaginaCatedras/>}
                        />
                            
                        <Route
                            path="/docentes"
                            element={<PaginaDocentes/>}
                        />
                    
                        <Route
                            path="/alumnos"
                            element={<PaginaAlumnos/>}
                        />
                    
                        <Route
                            path="*"
                            element={<PaginaCatedras/>}
                        />  
                    </Routes> 
                </ThemeProvider>     
                
                }

            </Router>
            }*/}
    </>
  );
}
