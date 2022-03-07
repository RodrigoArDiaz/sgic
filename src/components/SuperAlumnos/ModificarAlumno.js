import React from 'react';
import { Button } from '@mui/material';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import  {useModal}  from '../useModal';
import {BotonEstadoRegistro} from './BotonEstadoRegistro';


import { FormControl, InputLabel, Input,  Grid, Paper, Typography } from '@mui/material';
import {Box } from '@mui/system';
import Link from '@mui/material/Link';

import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
//import { useForm } from '../hooks/useForm';
import { FormHelperText } from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';
//import {BotonEstadoRegistro} from './BotonEstadoRegistro';



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



export const ModificarAlumno = (props) => {
    const [isOpen, handleOpen, handleClose] = useModal(false);

    const [enombres, setNom] = React.useState('1');
    const [eapellidos, setAp] = React.useState('1');
    const [eusuario, setUs] = React.useState('1');
    const [eemail, setEm] = React.useState('1');
    const [edni, setDn] = React.useState('1');
    const [elibreta, setLib] = React.useState('1');
    



       const [form, setForm] = React.useState({
        nombres:props.alumno.Nombres,
        apellidos: props.alumno.Apellidos,
        usuario: props.alumno.Usuario,
        email: props.alumno.Email,
        dni: props.alumno.Documento,
        libreta: props.alumno.Libreta.toString(),


            });

    const [errors, setErrors] = React.useState({
        nombres: "",
        apellidos: "",
        usuario: "",
        email: "",
        dni: "",
        libreta:"" ,


            });



    async function consultas(data, cadena){

        const response = await fetch(cadena,
        {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        );

        
        return response.json();
    }


       
function  BotonEstadoRegistroDevolver(param){
    

    if (param==='1')
        return    (<BotonEstadoRegistro estado={'1'}/>);

        if (param==='2')
        return    (<BotonEstadoRegistro estado={'2'}/>);

}


function DevolverBoton(){

if(enombres==='1' &&  eapellidos==='1' && eusuario==='1' &&
eemail==='1' && edni==='1' && elibreta==='1'){
    return(

        <Button variant='contained'  onClick={Modificar}>Aceptar</Button>
    );}

else{

    return(
        <Button variant='contained' disabled onClick={handleClose}>Aceptar</Button>);
}
}






function Modificar(){


    var data = {
        pNom:form.nombres,
        pAp:form.apellidos,
        pUs:form.usuario,
        pMail:form.email,
        pDoc:form.dni,
        pLib:form.libreta,
        pidUs:props.alumno.IdUsuario,                                           
    }
        
consultas(data,'http://127.0.0.1:8000/api/modificaralumno').then(response=>{

    if(response.Error === undefined){
    //aqui va el snack
    handleClose();
    //setNom('1') ; 

    props.abrir(true);
    props.mensaje('Alumno modificado con éxito');
    props.tipo('success');
    props.refrescar();

    //console.log(response);
   }
   else{
   // Aqui actualizo los errores
    
    if(response.ErrNombre!==undefined)
    {
        setErrors({...errors, nombres : response.Error});
        setNom('2') ;

    }


    if(response.ErrApellido!==undefined)
    {
        setErrors({...errors, apellidos : response.Error});
        setAp('2') ;

    }
    
    
    if(response.ErrUsuario!==undefined)
    {
        setErrors({...errors, usuario : response.Error});
        setUs('2') ;

    }

    
    if(response.ErrEmail!==undefined)
    {
        setErrors({...errors, email : response.Error});
        setEm('2') ;

    }
    

    if(response.ErrDni!==undefined)
    {
        setErrors({...errors, dni : response.Error});
        setDn('2') ;

    }
    

    if(response.ErrLibreta!==undefined)
    {
        setErrors({...errors, libreta : response.Error});
        setLib('2') ;

    }
    




   }

})
.catch(error=>{console.log("Error de conexión"+error);})


}







    return (
        <>
            <Tooltip title="Modificar">
                <IconButton 
                    color='secondary'
                    size='small'
                    onClick={handleOpen}
                >
                    <EditIcon/>
                </IconButton>
            </Tooltip>

            {/* Ventana modal */}
            <Dialog 
                open={isOpen} 
                onClose={handleClose}
                maxWidth="lg"
                fullWidth
            >
                
                <DialogTitle>Modificar alumno</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        Ingrese los datos a modificar
                    </DialogContentText> */}
                    



                    <Grid> 
                <Paper
                        sx={estiloPaper}
                >
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
                               
                               
                                {BotonEstadoRegistroDevolver(enombres)}
                                
                                
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

{BotonEstadoRegistroDevolver(eapellidos)}
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

                                    if(!form.usuario.trim()){
                                   
                                   
                                        setErrors({...errors,     [e.target.name]: "El campo 'Usuario' es requerido."});
                                       setUs('2') ;
                                    }else if(!regex.test(form.usuario.trim())){
                                        setErrors({...errors,  [e.target.name] : "El usuario ingresado tiene un formato incorrecto."});
                                        setUs('2') ;
                                    }
                                    
                                    else{
                                    var data = {
                                        Usuario:form.usuario ,
                                        pidUs:props.alumno.IdUsuario,                                           
                                    }

                                consultas(data,'http://127.0.0.1:8000/api/consultarus').then(response=>{
       
                                    if(response.Error === undefined){
                                    
                                    setUs('1') ; 
                                    console.log(response);
                                   }
                                   else{
                                   
                                    
                                    setUs('2') ;
                                    setErrors({...errors,  [e.target.name] : response.Error});
                                    
                                    
                                      
                                   }
                        
                                })
                                .catch(error=>{console.log("Error de conexión"+error);});    
                            }


                                }}
                                
                                value={form.usuario}
                                />
                                 {BotonEstadoRegistroDevolver(eusuario)}
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
                                    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

                                    if(!form.email.trim()){
                                   
                                   
                                        setErrors({...errors,     [e.target.name]: "El campo 'Email' es requerido."});
                                        setEm('2') ;
                                    }else if(!regexEmail.test(form.email.trim())){
                                        setErrors({...errors,  [e.target.name] : "El email ingresado tiene un formato incorrecto."});
                                    
                                        setEm('2') ;
                                    }

                                                                        
                                   
                                        
                                        //setEm('3') ;
                                   
                                        
                                        else{
                                        var data = {
                                            Email:form.email ,
                                            pidUs:props.alumno.IdUsuario                                           
                                        }

                                    consultas(data,'http://127.0.0.1:8000/api/consultarmail').then(response=>{
           
                                        if(response.Error === undefined){
                                        
                                        setEm('1') ; 
                                        console.log(response);
                                       }
                                       else{
                                       
                                        
                                        setEm('2') ;
                                        setErrors({...errors,  [e.target.name] : response.Error});
                                        
                                        
                                          
                                       }
                            
                                    })
                                    .catch(error=>{console.log("Error de conexión"+error);});    }
                                        
                                        //setEm('3') ;
                                    
                                    
                                    
                                    

                                }}

                                value={form.email}
                                /> {BotonEstadoRegistroDevolver(eemail)}
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
                                        Documento:form.dni,
                                        pidUs:props.alumno.IdUsuario                                              
                                    }

                                consultas(data,'http://127.0.0.1:8000/api/consultardni').then(response=>{
       
                                    if(response.Error === undefined){
                                    
                                    setDn('1') ; 
                                    console.log(response);
                                   }
                                   else{
                                   
                                    
                                    setDn('2') ;
                                    setErrors({...errors,  [e.target.name] : response.Error});
                                    
                                    
                                      
                                   }
                        
                                })
                                .catch(error=>{console.log("Error de conexión"+error);});    }
                                    


                                }}
                                value={form.dni}  
                                /> {BotonEstadoRegistroDevolver(edni)}
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
                                        Libreta:form.libreta,
                                        pidUs:props.alumno.IdUsuario                                              
                                    }

                                consultas(data,'http://127.0.0.1:8000/api/consultarlib').then(response=>{
       
                                    if(response.Error === undefined){
                                    
                                    setLib('1') ; 
                                    console.log(response);
                                   }
                                   else{
                                   
                                    
                                    setLib('2') ;
                                    setErrors({...errors,  [e.target.name] : response.Error});
                                    
                                    
                                      
                                   }
                        
                                })
                                .catch(error=>{console.log("Error de conexión"+error);});   } 
                                    

                                }}
                                value={form.libreta}   
                                />{BotonEstadoRegistroDevolver(elibreta)}
                            <FormHelperText  >
                                {errors.libreta}
                            </FormHelperText>
                        </FormControl>
                   
                    </Grid>
                </Paper>
            </Grid>






                </DialogContent>
                <DialogActions>
                {DevolverBoton()}
                    
                    <Button variant='outlined'  color="secondary" onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>  
        </>
    )
}

//<Button variant='contained' disabled onClick={handleClose}>Aceptar</Button>