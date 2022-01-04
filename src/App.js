import React from 'react';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import temaConfig from './temaConfig.js';
import MiniDrawers from './components/MiniDrawers';
import PaginaCatedras from './pages/PaginaCatedras.js';
import PaginaDocentes from './pages/PaginaDocentes.js';
import PaginaAlumnos from './pages/PaginaAlumnos.js';


export default function App() {
    return (
        <> 
            <Router>
                <MiniDrawers theme={temaConfig}/>
                {/* <ThemeProvider theme={temaConfig}>
                    <Routes>
                        <Route
                            path="/"
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
                </ThemeProvider>     */}
            </Router>
            
        </>
    ); 
}


