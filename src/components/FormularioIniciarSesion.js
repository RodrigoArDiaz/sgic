import React, { useState } from 'react';
import { FormControl, InputLabel, Input, Container, Button, Grid, Paper, Divider, Typography, Icon, Avatar,FormHelperText } from '@mui/material';
import {Box } from '@mui/system';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import { useForm } from '../hooks/useForm';

// Estilos
const estiloPaper = {
    height: 'auto',
    width: {xs: "100%", sm: '380px'},
    margin: {xs: '0 auto', sm: '100px auto' },
    boxShadow: {xs:0, sm:8}
}

const estiloFormControl = {
    width: "100%",
}

const estiloBoxForm ={
    display: 'flex', 
    alignItems: 'flex-end' ,   
    width: "100%",
    mt: {xs: "42px", md: "25px"},
}

const estiloButton = {
    mt: "60px"
}

const estiloLink = {
    mt: "15px"
}

const estiloHeader = {
    backgroundColor: "primary.main",
    color: "white",
    py: "20px",
    borderRadius: {xs: "none", md:"4px 4px 0 0"},
    mb: "10px",
    borderBottom: { xs: "0px" , sm: "2px solid"},
    borderColor:"secondary.light",
    boxShadow: {xs: 4, sm: 0},
}

const estiloContent= {
   padding: "5px 40px 40px 40px ",
}

const estiloIconoUsuario = {
    width: "50px",
    height: "50px",
    bgcolor: "#000",
}

//
const initialForm = {
    email: "",
    contrasenia: "",
}

//Funciones de validacion
const validationsForm = (form) => {
    let errors = {};
   
    if(!form.email.trim()){
        errors.email = "El campo 'Email' es requerido.'";
    }

    if(!form.contrasenia.trim()){
        errors.contrasenia = "El campo 'Contraseña' es requerido.'";
    }

    return errors;
}

//componente FormularioIniciarSesion
function FormularioIniciarSesion() {
    //variables de estado
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
    //
    const {form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit} = useForm(initialForm,validationsForm);


    //handles de eventos
    const handleClickMostrarContrasenia = () => {
        setMostrarContrasenia(!mostrarContrasenia)
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
                        <AccountCircleIcon
                            fontSize="large"
                        />
                        <Typography variant="h5">
                            Iniciar sesión
                        </Typography>
                    </Grid>

                    <Grid sx={estiloContent}>

                        <Box sx={estiloBoxForm}>
                            <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <FormControl 
                                sx={estiloFormControl}
                                error= {errors.email ? true : false}
                            >
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    name="email"
                                    onChange={handleChange}
                                    onBlur = {handleBlur}
                                    value={form.email} 
                                />
                            </FormControl>

                            
                        </Box>

                        <FormHelperText sx= {{ml: "35px"}}error fullWidth>
                                {errors.email}
                            </FormHelperText>

                       <Box sx={estiloBoxForm}>
                            <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
                            <FormControl 
                                sx={estiloFormControl}
                                error= {errors.contrasenia ? true : false}
                            >
                                <InputLabel htmlFor="contrasenia">Contraseña</InputLabel>
                                <Input
                                    id="contrasenia"
                                    name="contrasenia"
                                    type={mostrarContrasenia ? 'text' : 'password'}
                                    onChange={handleChange}
                                    onBlur = {handleBlur}
                                    value={form.contrasenia}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="cambiar mostrar contraseña"
                                        onClick={handleClickMostrarContrasenia}
                                        >
                                        {mostrarContrasenia ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Box>
                        <FormHelperText sx= {{ml: "35px"}}error fullWidth>
                                {errors.contrasenia}
                        </FormHelperText>
            
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={estiloButton}
                            endIcon={<LoginIcon/>}
                            onClick={handleSubmit}
                        >
                            Iniciar sesión
                        </Button>

                        <Box textAlign="center" sx={estiloLink}>
                           <Link 
                                href="#" 
                                underline="hover" 
                                color="secondary"
                            >
                                Recuperar contraseña 
                            </Link> 
                        </Box>


                        <Box textAlign="center" sx={estiloLink}>
                           <Link 
                                href="#" 
                                underline="hover" 
                                color="secondary"
                            >
                                Registrarse 
                            </Link> 
                        </Box>
                    </Grid>
                </Paper>
            </Grid>
            
     );
}

export default FormularioIniciarSesion;