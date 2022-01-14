import React from 'react';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import temaConfig from './temaConfig.js';
import MiniDrawers from './components/MiniDrawers';
import PaginaCatedras from './pages/PaginaCatedras.js';
import PaginaDocentes from './pages/PaginaDocentes.js';
import PaginaAlumnos from './pages/PaginaAlumnos.js';
import PaginaInicioSesion from './pages/PaginaInicioSesion.js';
import PaginaRegistrarse from './pages/PaginaRegistrarse.js';
import PaginaRecuperarContrasenia from './pages/PaginaRecuperarContrasenia.js';


export default function App() {
    return (
        <> 
            <Router>
                

                <ThemeProvider theme={temaConfig}>
                    <Routes>

                        <Route
                            path="/"
                            element={<PaginaInicioSesion />}
                        />

                        <Route
                            path="/iniciar_sesion_alumno"
                            element={<PaginaInicioSesion/>}
                        />

                        <Route
                            path="/iniciar_sesion_super"
                            element={<PaginaInicioSesion mostrarRegistrarse={false}/>}
                        />

                        <Route
                            path="/iniciar_sesion_docente"
                            element={<PaginaInicioSesion mostrarRegistrarse={false}/>}
                        />

                        

                        <Route
                            path="/registrarse"
                            element={<PaginaRegistrarse/>}
                        />

                        <Route
                            path="/recuperar_contrasenia"
                            element={<PaginaRecuperarContrasenia/>}
                        />

                        <Route
                            path="/inicio/*"
                            element={<MiniDrawers></MiniDrawers>}
                        >
                                <Route
                                path="catedras"
                                element={<PaginaCatedras/>}
                                />
                                
                                <Route
                                    path="docentes"
                                    element={<PaginaDocentes/>}
                                />
                            
                                <Route
                                    path="alumnos"
                                    element={<PaginaAlumnos/>}
                                />  
                         </Route>

                    </Routes>
                </ThemeProvider> 
            </Router>
        </>
    ); 
}


