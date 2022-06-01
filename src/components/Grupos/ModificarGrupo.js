import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useModal } from '../../hooks/useModal';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import {BotonEstadoRegistro} from './BotonEstadoRegistro';
//import BotonAnio from './BotonAnio';
//import BotonSemestre from './BotonSemestre';
//import BotonTieneGrupo from './BotonTieneGrupo';
//import BotonTipoCalculo from './BotonTipoCalculo';
//import Calendario from './Calendario';
//import {DatePicker} from '@material-ui/pickers';

import { FormHelperText } from '@mui/material';
import { FormControl, InputLabel, Input,  Grid, Paper, Typography } from '@mui/material';


export const ModificarGrupo = (props) => {
    //Variable de estado y handles de eventos para la ventana modal
    const [isOpen,handleOpen,handleClose] = useModal(false);
    

    const [enn, setNom] = React.useState('');
    const [egrupo, setG] = React.useState('1');
    const [etema, setTem] = React.useState('1');
    const [emodulo, setMod] = React.useState('1');
    
    /*const [effin, setFf] = React.useState('1');
    const [eprograma, setPr] = React.useState('1');
    const [etieneg, setTg] = React.useState('1');
    const [emaxintg, setMx] = React.useState('1');
    const [eescala, setEs] = React.useState('1');
    const [epnt, setP] = React.useState('1');
    const [ecalculo, setC] = React.useState('1');
*/

    const [form, setForm] = React.useState({
grupo:props.grupo.Grupo,     
tema:props.grupo.Tema,     
modulo: props.grupo.Modulo,     

         });

 const [errors, setErrors] = React.useState({
    grupo:'',     
    tema:'',     
    modulo:'',     
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




function Modificar(){
   

 var data = {
   pGrupo:form.grupo,     
    pModulo:form.modulo,     
    pTema: form.tema,     
    pidG:props.grupo.IdGrupo,    
     pidCu:props.cursada.IdCursada,                                        
 }
     
consultas(data,'http://127.0.0.1:8000/api/modificargrupo').then(response=>{
console.log(response);
 if(response.Error === undefined){
 //aqui va el snack
 handleClose();
 //setNom('1') ; 


 


 props.abrir(true);
 props.mensaje('Grupo modificado con éxito');
 props.tipo('success');
 props.refrescar();

 console.log(response);
}
else{
// Aqui actualizo los errores
 
 if (response.grupo!==undefined){
 setErrors({...errors,grupo : response.grupo});
 setG('2') ;

 }


 if (response.modulo!==undefined){
    setErrors({...errors,modulo : response.modulo});
    setMod('2') ;
   
    }


    if (response.tema!==undefined){
        setErrors({...errors,tema : response.tema});
        setTem('2') ;
       
        }

}

})
.catch(error=>{console.log("Error de conexión"+error);})


}






function DevolverBoton(){

    if(egrupo==='1'&& emodulo==='1'&& etema==='1'){
        
     
        
        return(
    
            <Button variant='contained'  onClick={Modificar}>Modificar</Button>
        );}
    
    else{
    
        return(
            <Button variant='contained' disabled onClick={handleClose}>Modificar</Button>);
    }
    }
    
    
    

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


    const estiloFormControlSelect = {
        //width: fullWidth,
        mt: "25px"
    }

    const estiloContent= {
        padding: "5px 40px 40px 40px ",
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
                <DialogTitle>Modificar grupo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ingrese los datos para modificar el grupo.
                    </DialogContentText>
                    

                    <Grid> 
                <Paper
                        sx={estiloPaper}
                >
                       <Grid sx={estiloContent}>



                       
                       <FormControl 
                            sx={estiloFormControl}
                            error= {errors.grupo ? true : false}>
                               
                            <InputLabel htmlFor="grupo">Grupo</InputLabel>
                            <Input 
                                id="grupo" 
                                type="text"  
                                name="grupo"
                                onChange={(e)=>{
                                    if(errors.grupo!==""){
                                    setErrors({...errors, [e.target.name]:""});
                                
                                    
                                }
                                
                                setG('');
                                       setForm({
      ...form, [e.target.name]: e.target.value
    });
                                }}


                                onBlur = {(e)=>{
                       //             let regex = /^[a-zA-Z\s]+$/;
                       let regex = /^[0-9a-zA-Z\s]+$/;
                       //let regex = /^[a-zA-Z\s]+$/;
                                    if(!form.grupo.trim()){
                                   
                                   
                                        setErrors({...errors,     [e.target.name]: "El campo 'Grupo' es requerido."});
                                    setG('2');
                                    }
                                    
                                    else if(!regex.test(form.grupo.trim())){
                                        setErrors({...errors,  [e.target.name] : "El grupo ingresado tiene un formato incorrecto."});
                                        setG('2');
                                    }
                                    /*else {
                                        setTem('1');

                                    }*/
                                    
                                    else{
                                        var data = {
                                            Grupo:form.grupo,
                                            pidCu:props.cursada.IdCursada,                                            
                                            pidG:props.grupo.IdGrupo
                                        }
                                            
                                    consultas(data,'http://127.0.0.1:8000/api/consultarnomgrupo').then(response=>{
           
                                        if(response.Error === undefined){
                                        
                                        setG('1') ; 
                                       // console.log(response);
                                       }
                                       else{
                                       
                                        
                                        setG('2') ;
                                        setErrors({...errors,  [e.target.name] : response.Error});
                                        
                                        
                                          
                                       }
                            
                                    })
                                    .catch(error=>{console.log("Error de conexión"+error);});    
                                }
                                    
                                                                     
                                    
                                    
                                }}
                                
                                value={form.grupo}
                                />
                               
                               
                                {(egrupo==='1') &&<BotonEstadoRegistro estado={'1'}/>}
                                {(egrupo==='2') &&<BotonEstadoRegistro estado={'2'}/>
                                }
                                
                                
                            <FormHelperText  >
                                {errors.grupo}
                            </FormHelperText>
                        </FormControl>
                                






                        <FormControl 
                            sx={estiloFormControl}
                            error= {errors.tema ? true : false}>
                               
                            <InputLabel htmlFor="tema">Tema</InputLabel>
                            <Input 
                                id="tema" 
                                type="text"  
                                name="tema"
                                onChange={(e)=>{
                                    if(errors.tema!==""){
                                    setErrors({...errors, [e.target.name]:""});
                                
                                    
                                }
                                
                                setTem('');
                                       setForm({
      ...form, [e.target.name]: e.target.value
    });
                                }}


                                onBlur = {(e)=>{
                       //             let regex = /^[a-zA-Z\s]+$/;
                       let regex = /^[0-9a-zA-Z\s]+$/;
                                   
                     if (form.tema.trim()!==''){

                        if(!regex.test(form.tema.trim())){
                            setErrors({...errors,  [e.target.name] : "El tema ingresado tiene un formato incorrecto."});
                            setTem('2');

                     }  
                     else {
                         setTem('1');
                     }  
                    }
                    else {
                       /*if(!form.programa.trim()){
                                   
                                   
                                        setErrors({...errors,     [e.target.name]: "El campo 'Programa' es requerido."});
                                    setPr('2');
                                    }else*/ //if(!regex.test(form.programa.trim())){
                                        //setErrors({...errors,  [e.target.name] : "El programa ingresado tiene un formato incorrecto."});
                                        //setPr('2');
                                    //}
                                    //else {
                                        setTem('1');
                                }
                                    //}
                                    /*
                                    else{
                                        var data = {
                                            Catedra:form.nombre,
                                            IdCatedra:undefined,                                            
                                        }
                                            
                                    consultas(data,'http://127.0.0.1:8000/api/consultarnomcat').then(response=>{
           
                                        if(response.Error === undefined){
                                        
                                        setNom('1') ; 
                                       // console.log(response);
                                       }
                                       else{
                                       
                                        
                                        setNom('2') ;
                                        setErrors({...errors,  [e.target.name] : response.Error});
                                        
                                        
                                          
                                       }
                            
                                    })
                                    .catch(error=>{console.log("Error de conexión"+error);});    
                                }
                                    */
                                                                     
                                    
                                    
                                }}
                                
                                value={form.tema}
                                />
                               
                               
                                {(etema==='1') &&<BotonEstadoRegistro estado={'1'}/>}
                                {(etema==='2') &&<BotonEstadoRegistro estado={'2'}/>
                                }
                                
                                
                            <FormHelperText  >
                                {errors.tema}
                            </FormHelperText>
                        </FormControl>
                                







                        <FormControl 
                            sx={estiloFormControl}
                            error= {errors.modulo ? true : false}>
                               
                            <InputLabel htmlFor="tema">Módulo</InputLabel>
                            <Input 
                                id="modulo" 
                                type="text"  
                                name="modulo"
                                onChange={(e)=>{
                                    if(errors.modulo!==""){
                                    setErrors({...errors, [e.target.name]:""});
                                
                                    
                                }
                                
                                setMod('');
                                       setForm({
      ...form, [e.target.name]: e.target.value
    });
                                }}


                                onBlur = {(e)=>{
                                    let regex = /^[0-9a-zA-Z\s]+$/;
                                   
                                    if (form.modulo.trim()!==''){
               
                                       if(!regex.test(form.modulo.trim())){
                                           setErrors({...errors,  [e.target.name] : "El módulo ingresado tiene un formato incorrecto."});
                                           setMod('2');
               
                                    }  
                                    else {
                                        setMod('1');
                                    }  
                                   }
                                   else {
                                      /*if(!form.programa.trim()){
                                                  
                                                  
                                                       setErrors({...errors,     [e.target.name]: "El campo 'Programa' es requerido."});
                                                   setPr('2');
                                                   }else*/ //if(!regex.test(form.programa.trim())){
                                                       //setErrors({...errors,  [e.target.name] : "El programa ingresado tiene un formato incorrecto."});
                                                       //setPr('2');
                                                   //}
                                                   //else {
                                                       setMod('1');
                                               }
                                                   
                                }}
                                
                                value={form.modulo}
                                />
                               
                               
                                {(emodulo==='1') &&<BotonEstadoRegistro estado={'1'}/>}
                                {(emodulo==='2') &&<BotonEstadoRegistro estado={'2'}/>
                                }
                                
                                
                            <FormHelperText  >
                                {errors.modulo}
                            </FormHelperText>
                        </FormControl>

                    </Grid>
                </Paper>
            </Grid>





                </DialogContent>
                <DialogActions>
                {DevolverBoton()}
                    <Button onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
