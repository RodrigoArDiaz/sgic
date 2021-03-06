import React, { useState } from 'react';
import { FormControl, InputLabel, Input, Button, Grid, Paper, Typography } from '@mui/material';
import {Box } from '@mui/system';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from '../hooks/useForm';
import { FormHelperText } from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';

/**
 * Estilos.
 */
const estiloPaper = {
    height: 'auto',
    width: {xs: "100%", sm: '490px'},
    margin: {xs: '0 auto', sm: '20px auto' },
    boxShadow: {xs:0, sm:8}
}

const estiloFormControl = {
    width: "100%",
    mt: "25px"
}

const estiloButton = {
    mt: "50px"
}

const estiloLink = {
    mt: "30px"
}

const estiloHeader = {
    backgroundColor: "primary.main",
    color: "white",
    py: "15px",
    borderRadius: {xs: "none", md:"4px 4px 0 0"},
    mb: "10px",
    borderBottom: "2px solid",
    borderColor:"secondary.light",
}

const estiloContent= {
   padding: "5px 40px 40px 40px ",
}



/**
 * Campos del formulario.
 */
const initialForm = {
    nombres: "",
    apellidos: "",
    usuario: "",
    email: "",
    dni: "",
    libreta: "",
    contrasenia: "",
    repetirContrasenia: "",
}

/**
 * Validacion de campos.
 * @param {*} form 
 * @returns 
 */
const validationsForm = (form) => {
    let errors = {};
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexSoloNumeros = /^\d+$/;
    let regexContrasenia = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;
    //
    
    if(!form.nombres.trim()){
        errors.nombres = "El campo 'Nombre/s' es requerido.";
    }

    if(!form.apellidos.trim()){
        errors.apellidos = "El campo 'Apellido/s' es requerido.";
    }

    if(!form.usuario.trim()){
        errors.usuario = "El campo 'Usuario' es requerido.";
    }

    if(!form.email.trim()){
        errors.email = "El campo 'Email' es requerido.";
    }else if(!regexEmail.test(form.email.trim())){
        errors.email = "El email ingresado tiene un formato incorrecto."
    }


    if(!form.dni.trim()){
        errors.dni = "El campo 'DNI' es requerido.";
    }else if(!regexSoloNumeros.test(form.dni.trim())){
        errors.dni = "El campo 'DNI' solo admite valores numericos."
    }


    if(!form.libreta.trim()){
        errors.libreta = "El campo 'Libreta' es requerido.";
    }

    if(!form.contrasenia.trim()){
        errors.contrasenia = "El campo 'Contrase??a' es requerido.";
    }else if(!regexContrasenia.test(form.contrasenia.trim())){
        errors.contrasenia = "La contrase??a debe tener un minimo de 6 caracteres y un maximo de 10. Debe contener al menos un numero, una letra en minuscula y una letra en mayuscula."
    }


    if(!form.repetirContrasenia.trim()){
        errors.repetirContrasenia = "El campo 'Repetir contrase??a' es requerido.";
    }else if(form.repetirContrasenia.trim() != form.contrasenia.trim()){
        errors.repetirContrasenia = "Las contrase??as no coinciden."
    }

    
    return errors;
}


/**
 * Componente FormularioRegistro.
 * @returns 
 */
function FormularioRegistro() {
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
    const [mostrarRepetirContrasenia, setMostrarRepetirContrasenia] = useState(false);
    //
    const {form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit} = useForm(initialForm,validationsForm);

    const handleClickMostrarContrasenia = () => {
        setMostrarContrasenia(!mostrarContrasenia)
    }

    const handleClickRepetirMostrarContrasenia = () => {
        setMostrarRepetirContrasenia(!mostrarRepetirContrasenia)
    }

    return ( 
                   
            <Grid> 
                <Paper
                        sx={estiloPaper}
                >
                    <Grid 
                        align='center'
                        sx={estiloHeader}
                    >
                        <Typography variant="h5">
                            Registro 
                        </Typography>
                    </Grid>

                    <Grid sx={estiloContent}>
                        <FormControl 
                            sx={estiloFormControl}
                            error= {errors.nombres ? true : false}>
                            <InputLabel htmlFor="nombres">Nombre/s</InputLabel>
                            <Input 
                                id="nombres" 
                                type="text"  
                                name="nombres"
                                onChange={handleChange}
                                onBlur = {handleBlur}
                                value={form.nombres}
                                />
                            <FormHelperText  >
                                {errors.nombres}
                            </FormHelperText>
                        </FormControl>
                   

                        <FormControl 
                            sx={estiloFormControl}
                            error= {errors.apellidos ? true : false}>
                            <InputLabel htmlFor="apellidos">Apellido/s</InputLabel>
                            <Input 
                                id="apellidos" 
                                type="text"  
                                name="apellidos"
                                onChange={handleChange}
                                onBlur = {handleBlur}
                                value={form.apellidos}
                                />
                            <FormHelperText  >
                                {errors.apellidos}
                            </FormHelperText>
                        </FormControl>


                        <FormControl 
                            sx={estiloFormControl}
                            error= {errors.usuario ? true : false}>
                            <InputLabel htmlFor="Usuario">Usuario</InputLabel>
                            <Input 
                                id="usuario" 
                                type="text"  
                                name="usuario"
                                onChange={handleChange}
                                onBlur = {handleBlur}
                                value={form.usuario}
                                />
                            <FormHelperText  >
                                {errors.usuario}
                            </FormHelperText>
                        </FormControl>

                        <FormControl 
                            sx={estiloFormControl}
                            error= {errors.email ? true : false}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input 
                                id="email" 
                                type="email" 
                                name="email"
                                onChange={handleChange}
                                onBlur = {handleBlur}
                                value={form.email}
                                />
                            <FormHelperText  >
                                {errors.email}
                            </FormHelperText>
                        </FormControl>

                        <FormControl 
                            sx={estiloFormControl}
                            error= {errors.dni ? true : false}>
                            <InputLabel htmlFor="dni">DNI</InputLabel>
                            <Input 
                                id="dni" 
                                type="text"  
                                name="dni"
                                onChange={handleChange}
                                onBlur = {handleBlur}
                                value={form.dni}  
                                />
                            <FormHelperText  >
                                {errors.dni}
                            </FormHelperText>
                        </FormControl>

                        <FormControl 
                            sx={estiloFormControl}
                            error= {errors.libreta ? true : false}>
                            <InputLabel htmlFor="libreta">Libreta</InputLabel>
                            <Input 
                                id="libreta" 
                                type="text"  
                                name="libreta"
                                onChange={handleChange}
                                onBlur = {handleBlur}
                                value={form.libreta}   
                                />
                            <FormHelperText  >
                                {errors.libreta}
                            </FormHelperText>
                        </FormControl>
                   
                        <FormControl 
                            sx={estiloFormControl}
                            error= {errors.contrasenia ? true : false}>
                            <InputLabel htmlFor="contrasenia">Contrase??a</InputLabel>
                            <Input
                                id="contrasenia"
                                type={mostrarContrasenia ? 'text' : 'password'}
                                name="contrasenia"
                                onChange={handleChange}
                                onBlur = {handleBlur}
                                value={form.contrasenia}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="cambiar mostrar contrase??a"
                                            onClick={handleClickMostrarContrasenia}
                                            >
                                            {mostrarContrasenia ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText  >
                                {errors.contrasenia}
                            </FormHelperText>
                        </FormControl>

                        <FormControl 
                            sx={estiloFormControl}
                            error= {errors.repetirContrasenia ? true : false}>
                            <InputLabel htmlFor="repetirContrasenia">Repetir contrase??a</InputLabel>
                            <Input
                                id="repetirContrasenia"
                                type={mostrarRepetirContrasenia ? 'text' : 'password'}
                                name="repetirContrasenia"
                                onChange={handleChange}
                                onBlur = {handleBlur}
                                value={form.repetirContrasenia}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="cambiar mostrar contrase??a"
                                            onClick={handleClickRepetirMostrarContrasenia}
                                            >
                                            {mostrarRepetirContrasenia ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText  >
                                {errors.repetirContrasenia}
                            </FormHelperText>
                        </FormControl>
            
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={estiloButton}
                            onClick={handleSubmit}
                        >
                            Registrarse
                        </Button>


                        <Box textAlign="center" sx={estiloLink}>
                            <Link 
                                    href="#" 
                                    underline="hover" 
                                    color="secondary"
                                    to="/iniciar_sesion_alumno"
                                    component={LinkRouter}
                                >
                                    ??Ya tenes una cuenta? Inicia sesion. 
                            </Link>
                        </Box>
                    </Grid>
                </Paper>
            </Grid>
            
     );
}

export default FormularioRegistro;