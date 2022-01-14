import React from 'react';
import FormularioIniciarSesion from '../components/FormularioIniciarSesion';

const PaginaInicioSesion = ({mostrarRegistrarse}) => {
    return (
        <>
            <FormularioIniciarSesion mostrarRegistrarse={mostrarRegistrarse}/>
        </>
    )
}

export default PaginaInicioSesion
