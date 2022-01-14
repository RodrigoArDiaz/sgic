import React from 'react';
import { FormControl, InputLabel, Input, Button, Grid, Paper, Typography, FormHelperText } from '@mui/material';
import {Box } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';
import { useForm } from '../hooks/useForm';


// // Estilos
const estiloPaper = {
    height: 'auto',
    width: {xs: "100%", sm: '490px'},
    margin: {xs: '0 auto', sm: '100px auto' },
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



const estiloBoxForm ={
    display: 'flex', 
    alignItems: 'flex-end' ,  
    // flexWrap: "wrap", 
    width: "100%",
    // mt: {xs: "42px", md: "25px"},
}

const estiloBoxRecuperar = {
    mt: {xs: "35px", md: "25px"},
}

const estiloError = {
    mt: {xs: "10px", md: "15px"},
}

//
const initialForm = {
    email: "",
}

//Funciones de validacion
const validationsForm = (form) => {
    let errors = {};
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    

    if(!form.email.trim()){
        errors.email = "El campo 'Email' es requerido'";
    }else if(!regexEmail.test(form.email.trim())){
        errors.email = "El email ingresado tiene un formato incorrecto."
    }

    return errors;
}

//componente FormularioIniciarSesion
function FormularioRecuperarContrasenia() {
    const {form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit} = useForm(initialForm,validationsForm);

    

    return ( 
                   
            <Grid> 
                <Paper
                        sx={estiloPaper}
                >
                    <Grid 
                        align='center'
                        sx={estiloHeader}
                    >
                        {/* <AccountCircleIcon
                            fontSize="large"
                        /> */}
                        <Typography variant="h5">
                            Recuperar contraseña
                        </Typography>
                    </Grid>

                    

                    <Grid sx={estiloContent}>

                       <Box sx= {estiloBoxRecuperar}> 
                            <Typography 
                                variant="subtitle1"
                            >
                                Ingrese la direccion de email de su cuenta:
                            </Typography>

                            <Box sx={estiloBoxForm}>
                                    <EmailIcon error sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <FormControl 
                                        error= {errors.email ? true : false}
                                        sx={estiloFormControl}
                                    >
                                        <InputLabel htmlFor="email">Email</InputLabel>
                                        <Input                                        
                                            id="email" 
                                            type="email"
                                            name="email" //importante 
                                            onChange={handleChange}
                                            onBlur = {handleBlur}
                                            value={form.email}
                                            // helperText="Incorrect entry."
                                            // startAdornment={
                                            //     <EmailIcon error sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                            // }
                                            
                                        />
                                       
                                    </FormControl>
                                    
                            </Box>
                            <FormHelperText sx= {{ml: "35px"}} error>
                                {errors.email}
                            </FormHelperText>
                        </Box> 
                        
                        {/* {errors.email && 
                                <Alert severity="error" sx={estiloError}>{errors.email}</Alert>   
                        } */}
                        
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={estiloButton}
                            onClick={handleSubmit}
                            
                        >
                            Enviar
                        </Button>

                        {/* <Alert severity="success" sx={estiloError}>La direccion de email no existe en el sistema</Alert>    */}

                    </Grid>
                </Paper>
            </Grid>
            
     );
}

export default FormularioRecuperarContrasenia;