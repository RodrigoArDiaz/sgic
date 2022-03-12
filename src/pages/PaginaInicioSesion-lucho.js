import React from 'react';
import FormularioIniciarSesion from '../components/FormularioIniciarSesion';
import { ThemeProvider } from '@mui/material';
import temaConfig from '../temaConfig';
const PaginaInicioSesion = ({mostrarRegistrarse}) => {
    return (
        <>
         <ThemeProvider theme={temaConfig}>
            <FormularioIniciarSesion mostrarRegistrarse={mostrarRegistrarse}/>
            </ThemeProvider>
        </>
    )
}

export default PaginaInicioSesion
