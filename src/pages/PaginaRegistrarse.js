import React from 'react'
import FormularioRegistro from '../components/Sesiones/FormularioRegistro'
import { ThemeProvider } from '@mui/material';
import temaConfig from '../temaConfig.js';
const PaginaRegistrarse = () => {
    return (
        <>
         <ThemeProvider theme={temaConfig}>
            <FormularioRegistro/>
            </ThemeProvider>
        </>
    )
}

export default PaginaRegistrarse
