import React, { useState } from 'react';
import { FormControl, InputLabel, Input, Button, Grid, Paper, Typography } from '@mui/material';
import {Box } from '@mui/system';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHelperText } from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';
import {BotonEstadoRegistro} from '../BotonEstadoRegistro';
import SnackMensajes from './SnackMensajes';
import * as Responses from '../Responses';
import { useNavigate } from "react-router-dom";

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


function FormularioRegistro() {

    const navegar = useNavigate();
    
   

function DevolverBoton(){

if(enombres==='1' && eapellidos==='1' && eusuario==='1' &&
eemail==='1' && edni==='1' && elibreta==='1' && econtrasenia==='1' && erepetirContrasenia==='1'
){
    return(
    <Button
    variant="contained"
    color="primary"
    fullWidth
    sx={estiloButton}
    onClick={()=>{


        var data = {
            pNom:form.nombres,
            pAp:form.apellidos,
            pUs:form.usuario,
            pMail:form.email,
            pDoc:form.dni,
            pPass:form.contrasenia,
            pConfir:form.repetirContrasenia,
            pLib:form.libreta,
        }
            
    Responses.consultas(data,'http://127.0.0.1:8000/api/registroalumno').then(response=>{
    
        if(Responses.status===200){
            setNom('');
            setAp('');
             setUs('');
             setEm('');
            setDn('');
            setLib('');
             setCon('');
             setRep('');    
                     
            setForm({
                nombres: "",
                apellidos: "",
                usuario: "",
                email: "",
                dni: "",
                libreta: "",
                contrasenia: "",
                repetirContrasenia: "",
            });

        setAbrir(true);
        setMensaje('Usuario Registrado con éxito');
        setTipo('success');     
  
          }
          else if(Responses.status===401){
            navegar("/ingreso");
          }
  
          else if(Responses.status===460){
            if(response.nombres!==undefined)
        {
            setErrors({...errors, nombres : response.nombres});
            setNom('2') ;
    
        }
    
    
        if(response.apellidos!==undefined)
        {
            setErrors({...errors, apellidos : response.apellidos});
            setAp('2') ;
    
        }
        
        
        if(response.usuario!==undefined)
        {
            setErrors({...errors, usuario : response.usuario});
            setUs('2') ;
    
        }
    
        
        if(response.email!==undefined)
        {
            setErrors({...errors, email : response.email});
            setEm('2') ;
    
        }
        
    
        if(response.dni!==undefined)
        {
            setErrors({...errors, dni : response.dni});
            setDn('2') ;
    
        }
        
    
        if(response.libreta!==undefined)
        {
            setErrors({...errors, libreta : response.libreta});
            setLib('2') ;
    
        }
        
    

        if(response.contrasenia!==undefined)
        {
            setErrors({...errors, contrasenia : response.contrasenia});
            setCon('2') ;
    
        }
    
        if(response.repetirContrasenia!==undefined)
        {
            setErrors({...errors, repetirContrasenia : response.repetirContrasenia});
            setRep('2') ;
    
        }
    
    
          }
          else {
            navegar("/error");
          }

    
    })
    .catch(error=>{
        navegar("/error");
    })
    
    



    }}
>
    Registrarse
</Button>);}

else{

    return(
    <Button
    variant="contained"
    color="primary"
    fullWidth
    disabled
    sx={estiloButton}
    
    //onClick={handleSubmit}
>
    Registrarse
</Button>);
}
}



const [enombres, setNom] = useState('');
    const [eapellidos, setAp] = useState('');
    const [eusuario, setUs] = useState('');
    const [eemail, setEm] = useState('');
    const [edni, setDn] = useState('');
    const [elibreta, setLib] = useState('');
    const [econtrasenia, setCon] = useState('');
    const [erepetirContrasenia, setRep] = useState('');






    const [form, setForm] = useState({
        nombres: "",
        apellidos: "",
        usuario: "",
        email: "",
        dni: "",
        libreta: "",
        contrasenia: "",
        repetirContrasenia: "",
    });

    const [errors, setErrors] = useState({
        nombres: "",
        apellidos: "",
        usuario: "",
        email: "",
        dni: "",
        libreta:"" ,
        contrasenia:"" ,
        repetirContrasenia: "",


    });

    const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
    const [mostrarRepetirContrasenia, setMostrarRepetirContrasenia] = useState(false);
    
    
    
    //SnackBar

const [mensaje, setMensaje] = React.useState();
const [abrir, setAbrir] = React.useState(false);
const [tipo, setTipo] = React.useState();

    
    
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
                                onChange={(e)=>{
                                    if(errors.nombres!==""){
                                    setErrors({...errors, [e.target.name]:""});
                                
                                    
                                }
                                
                                setNom('');
                                       setForm({
      ...form, [e.target.name]: e.target.value
    });
                                }}


                                onBlur = {(e)=>{
                                    let regex = /^[a-zA-Z\s]+$/;
                                    setNom('3');
                                    if(!form.nombres.trim()){
                                   
                                   
                                        setErrors({...errors,     [e.target.name]: "El campo 'Nombre' es requerido."});
                                    setNom('2');
                                    }else if(!regex.test(form.nombres.trim())){
                                        setErrors({...errors,  [e.target.name] : "El nombre ingresado tiene un formato incorrecto."});
                                        setNom('2');
                                    }


                                    else{setNom('1');}
                                }}
                                
                                value={form.nombres}
                                />
                               
                               
                                {
                                  (enombres==='1') &&  <BotonEstadoRegistro estado={enombres}/>
                               
                                }
                                
                                
                                {
                                  (enombres==='2') &&  <BotonEstadoRegistro estado={enombres}/>
                                
                                }

{
                                  (enombres==='3') &&  <BotonEstadoRegistro estado={enombres}/>
                                
                                }

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
                                onChange={(e)=>{
                                    if(errors.apellidos!==""){
                                    setErrors({...errors, [e.target.name]:""});
                                }
                                setAp('') ;
                                       setForm({
      ...form, [e.target.name]: e.target.value
    });
                                }}


                                onBlur = {(e)=>{
                                    let regex = /^[a-zA-Z\s]+$/;
                                    setAp('3')
                                    if(!form.apellidos.trim()){
                                   
                                   
                                        setErrors({...errors,     [e.target.name]: "El campo 'Apellido' es requerido."});
                                        setAp('2') ;
                                    }else if(!regex.test(form.apellidos.trim())){
                                        setErrors({...errors,  [e.target.name] : "El apellido ingresado tiene un formato incorrecto."});
                                        setAp('2') ;
                                    }
                                    else{setAp('1') ;}
                                }}
                                value={form.apellidos}
                                />

{    (eapellidos==='1') &&  <BotonEstadoRegistro estado={eapellidos}/>}
                                
                                
                                {(eapellidos==='2') &&  <BotonEstadoRegistro estado={eapellidos}/>}

{                                 (eapellidos==='3') &&  <BotonEstadoRegistro estado={eapellidos}/>   }
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
                                onChange={(e)=>{
                                    if(errors.usuario!==""){
                                    setErrors({...errors, [e.target.name]:""});
                                }
                                    
                                setUs('') ;
                                       setForm({
      ...form, [e.target.name]: e.target.value
    });
                                }}


                                onBlur = {(e)=>{
                                    let regex = /^[0-9a-zA-Z]+$/;
                                    
                                    setUs('3');

                                    if(!form.usuario.trim()){
                                   
                                   
                                        setErrors({...errors,     [e.target.name]: "El campo 'Usuario' es requerido."});
                                       setUs('2') ;
                                    }else if(!regex.test(form.usuario.trim())){
                                        setErrors({...errors,  [e.target.name] : "El usuario ingresado tiene un formato incorrecto."});
                                        setUs('2') ;
                                    }
                                    
                                    else{
                                    var data = {
                                        Usuario:form.usuario                                            
                                    }

                                Responses.consultas(data,'http://127.0.0.1:8000/api/consultarus').then(response=>{
       

                                    if(Responses.status===200){
                                        setUs('1') ;    
                              
                                      }
                                      else if(Responses.status===401){
                                        navegar("/ingreso");
                                      }
                              
                                      else if(Responses.status===460){
                                        setUs('2') ;
                                        setErrors({...errors,  [e.target.name] : response.Error});
                                        
                                      }
                                      else {
                                        navegar("/error");
                                      }

                               
                                })
                                .catch(error=>{
                                    navegar("/error");
                                });    
                            }


                                }}
                                
                                value={form.usuario}
                                />
                                 
                                {    (eusuario==='1') &&  <BotonEstadoRegistro estado={eusuario}/>}
                                
                                
                                {(eusuario==='2') &&  <BotonEstadoRegistro estado={eusuario}/>}

{                                 (eusuario==='3') &&  <BotonEstadoRegistro estado={eusuario}/>   }

                            <FormHelperText  >
                                {errors.usuario}
                            </FormHelperText>
                        </FormControl>

                        <FormControl 
                            sx={estiloFormControl}
                            error= {errors.email ? true : false}>
                            <InputLabel htmlFor="email">Correo</InputLabel>
                            <Input 
                                id="email" 
                                type="email" 
                                name="email"
                                onChange={(e)=>{
                                    if(errors.email!==""){
                                    setErrors({...errors, [e.target.name]:""});
                                }
                                setEm('') ;
                                       setForm({
      ...form, [e.target.name]: e.target.value
    });
                                }}


                                onBlur = {(e)=>{
                                   // let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
                                    let regexEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
                                   
                                   setEm('3');
                                    if(!form.email.trim()){
                                   
                                   
                                        setErrors({...errors,     [e.target.name]: "El campo 'Email' es requerido."});
                                        setEm('2') ;
                                    }else if(!regexEmail.test(form.email.trim())){
                                        setErrors({...errors,  [e.target.name] : "El email ingresado tiene un formato incorrecto."});
                                    
                                        setEm('2') ;
                                    }

                                                                        
                                   
                                        
                                        else{
                                        var data = {
                                            Email:form.email                                            
                                        }

                                    Responses.consultas(data,'http://127.0.0.1:8000/api/consultarmail').then(response=>{
           
                                        if(Responses.status===200){
                                            setEm('1') ;    
                                  
                                          }
                                          else if(Responses.status===401){
                                            navegar("/ingreso");
                                          }
                                  
                                          else if(Responses.status===460){
                                            setEm('2') ;
                                            setErrors({...errors,  [e.target.name] : response.Error});
                                            
                                          }
                                          else {
                                            navegar("/error");
                                          }
                            
                                    })
                                    .catch(error=>{
                                        navegar("/error");
                                    });    }
                                        
                                        
                                    
                                    
                                    

                                }}

                                value={form.email}
                                />     {    (eemail==='1') &&  <BotonEstadoRegistro estado={eemail}/>}
                                
                                
                                {(eemail==='2') &&  <BotonEstadoRegistro estado={eemail}/>}

{                                 (eemail==='3') &&  <BotonEstadoRegistro estado={eemail}/>   }
                            <FormHelperText  >
                                {errors.email}
                            </FormHelperText>
                        </FormControl>

                        <FormControl 
                            sx={estiloFormControl}
                            error= {errors.dni ? true : false}>
                            <InputLabel htmlFor="dni">Documento</InputLabel>
                            <Input 
                                id="dni" 
                                type="text"  
                                name="dni"
                                onChange={(e)=>{
                                    if(errors.dni!==""){
                                    setErrors({...errors, [e.target.name]:""});
                                }
                                setDn('') ;
                                       setForm({
      ...form, [e.target.name]: e.target.value
    });
                                }}


                                onBlur = {(e)=>{
                                    let regex = /^[0-9]+$/;
                                    setDn('3');
                                    if(!form.dni.trim()){
                                   
                                   
                                        setErrors({...errors,     [e.target.name]: "El campo 'Documento' es requerido."});
                                    
                                        setDn('2') ;

                                    }else if(!regex.test(form.dni.trim())){
                                        setErrors({...errors,  [e.target.name] : "El documento ingresado tiene un formato incorrecto."});
                                        setDn('2') ;
                                    }

                                    else if(form.dni.trim().length<8){

                                        setErrors({...errors,  [e.target.name] : "El documento ingresado debe tener por lo menos 8 dígitos."});
                                        setDn('2') ;
                                    }
                                   
                                    
                                    else{
                                    var data = {
                                        Documento:form.dni                                            
                                    }

                                Responses.consultas(data,'http://127.0.0.1:8000/api/consultardni').then(response=>{
       
                                    if(Responses.status===200){
                                        setDn('1') ;    
                              
                                      }
                                      else if(Responses.status===401){
                                        navegar("/ingreso");
                                      }
                              
                                      else if(Responses.status===460){
                                        setDn('2') ;
                                        setErrors({...errors,  [e.target.name] : response.Error});
                                        
                                      }
                                      else {
                                        navegar("/error");
                                      }
                                })
                                .catch(error=>{
                                    navegar("/error");
                                });    }
                                    


                                }}
                                value={form.dni}  
                                /> {    (edni==='1') &&  <BotonEstadoRegistro estado={edni}/>}
                                
                                
                                {(edni==='2') &&  <BotonEstadoRegistro estado={edni}/>}

{                                 (edni==='3') &&  <BotonEstadoRegistro estado={edni}/>   }
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
                                onChange={(e)=>{
                                    if(errors.libreta!==""){
                                    setErrors({...errors, [e.target.name]:""});
                                }
                                setLib('') ;
                                       setForm({
      ...form, [e.target.name]: e.target.value
    });
                                }}


                                onBlur = {(e)=>{
                                    let regex = /^[0-9]+$/;
                                    setLib('3');
                                    if(!form.libreta.trim()){
                                   
                                   
                                        setErrors({...errors,     [e.target.name]: "El campo 'Libreta' es requerido."});
                                        setLib('2') ;
                                    }else if(!regex.test(form.libreta.trim())){
                                        setErrors({...errors,  [e.target.name] : "La libreta ingresado tiene un formato incorrecto."});
                                        setLib('2') ;
                                    }

                                    else if(form.libreta.trim().length<8){

                                        setErrors({...errors,  [e.target.name] : "La libreta ingresado debe tener por lo menos 7 dígitos."});
                                        setLib('2') ;
                                    }
                                       
                                    
                                    else{
                                    var data = {
                                        Libreta:form.libreta                                            
                                    }

                                Responses.consultas(data,'http://127.0.0.1:8000/api/consultarlib').then(response=>{
       
                                    if(Responses.status===200){
                                        setLib('1') ;    
                              
                                      }
                                      else if(Responses.status===401){
                                        navegar("/ingreso");
                                      }
                              
                                      else if(Responses.status===460){
                                        setLib('2') ;
                                        setErrors({...errors,  [e.target.name] : response.Error});
                                        
                                      }
                                      else {
                                        navegar("/error");
                                      }
                        
                                })
                                .catch(error=>{
                                    navegar("/error");
                                });   } 
                                    

                                }}
                                value={form.libreta}   
                                />{    (elibreta==='1') &&  <BotonEstadoRegistro estado={elibreta}/>}
                                
                                
                                {(elibreta==='2') &&  <BotonEstadoRegistro estado={elibreta}/>}

{                                 (elibreta==='3') &&  <BotonEstadoRegistro estado={elibreta}/>   }
                            <FormHelperText  >
                                {errors.libreta}
                            </FormHelperText>
                        </FormControl>
                   
                        <FormControl 
                            sx={estiloFormControl}
                            error= {errors.contrasenia ? true : false}>
                            <InputLabel htmlFor="contrasenia">Contraseña</InputLabel>
                            <Input
                                id="contrasenia"
                                type={mostrarContrasenia ? 'text' : 'password'}
                                name="contrasenia"
                                onChange={(e)=>{
                                    if(errors.contrasenia!==""){
                                    setErrors({...errors, [e.target.name]:""});
                                }
                                setCon('') ;
                                       setForm({
      ...form, [e.target.name]: e.target.value
    });
                                }}


                                onBlur = {(e)=>{
                                    let regex = /^[0-9a-zA-Z]+$/;
                                    setCon('3');
                                    if(!form.contrasenia.trim()){
                                   
                                   
                                        setErrors({...errors,     [e.target.name]: "El campo 'Contraseña' es requerido."});
                                        setCon('2') ;
                                    }else if(!regex.test(form.contrasenia.trim())){
                                        setErrors({...errors,  [e.target.name] : "La contraseña ingresada debe tener letras y/ números."});
                                        setCon('2') ;
                                    }


                                    else if(form.contrasenia.trim().length<8 || form.contrasenia.trim().length>16){
                                        setErrors({...errors,  [e.target.name] : "La contraseña ingresada debe tener entre 8 y 16 caracteres."});
                                        setCon('2') ;
                                    }
                                    else{setCon('1') ;}

                                }}
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
                             {    (econtrasenia==='1') &&  <BotonEstadoRegistro estado={econtrasenia}/>}
                                
                                
                                {(econtrasenia==='2') &&  <BotonEstadoRegistro estado={econtrasenia}/>}

{                                 (econtrasenia==='3') &&  <BotonEstadoRegistro estado={econtrasenia}/>   }
                            <FormHelperText  >
                                {errors.contrasenia}
                            </FormHelperText>
                        </FormControl>

                        <FormControl 
                            sx={estiloFormControl}
                            error= {errors.repetirContrasenia ? true : false}>
                            <InputLabel htmlFor="repetirContrasenia">Repetir contraseña</InputLabel>
                            <Input
                                id="repetirContrasenia"
                                type={mostrarRepetirContrasenia ? 'text' : 'password'}
                                name="repetirContrasenia"
                               
                                onChange={(e)=>{
                                    if(errors.repetirContrasenia!==""){
                                    setErrors({...errors, [e.target.name]:""});
                                }
                                setRep('') ;
                                       setForm({
      ...form, [e.target.name]: e.target.value
    });
                                }}


                                onBlur = {(e)=>{
                                    //let regex = /^[0-9a-zA-Z]+$/;
                                    setRep('3');
                                    if(!form.repetirContrasenia.trim()){
                                   
                                   
                                        setErrors({...errors,     [e.target.name]: "El campo 'Repetir Contraseña' es requerido."});
                                        setRep('2') ;
                                    }else if(form.contrasenia!==form.repetirContrasenia){
                                        setErrors({...errors,  [e.target.name] : "La contraseñas no coinciden."});
                                        setRep('2') ;}

                                        else{setRep('1') ;}
                                    

                                }}


                                value={form.repetirContrasenia}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="cambiar mostrar contraseña"
                                            onClick={handleClickRepetirMostrarContrasenia}
                                            >
                                            {mostrarRepetirContrasenia ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />  {    (erepetirContrasenia==='1') &&  <BotonEstadoRegistro estado={erepetirContrasenia}/>}
                                
                                
                            {(erepetirContrasenia==='2') &&  <BotonEstadoRegistro estado={erepetirContrasenia}/>}

{                                 (erepetirContrasenia==='3') &&  <BotonEstadoRegistro estado={erepetirContrasenia}/>   }
                            <FormHelperText  >
                                {errors.repetirContrasenia}
                            </FormHelperText>
                        </FormControl>
            
            {DevolverBoton()}
                        


                        <Box textAlign="center" sx={estiloLink}>
                            <Link 
                                    href="#" 
                                    underline="hover" 
                                    color="secondary"
                                    to="/iniciar_sesion_alumno"
                                    component={LinkRouter}
                                >
                                    ¿Ya tenes una cuenta? Inicia sesion. 
                            </Link>
                        </Box>
                    </Grid>
            <div><SnackMensajes abrir={abrir} mensaje={mensaje} tipo={tipo} cerrar={setAbrir}/>    </div>  

                </Paper>
            </Grid>
     );
}

export default FormularioRegistro;