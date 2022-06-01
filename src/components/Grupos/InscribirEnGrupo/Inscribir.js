import React from 'react';
import { Button } from '@mui/material';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useModal } from '../../useModal';
import { useNavigate } from "react-router-dom";
import {  Grid } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import Brightness1Icon from '@mui/icons-material/Brightness1';


export const Inscribir = (props) => {
    //const [isOpen, handleOpen, handleClose] = useModal(false);
    
    const navegar = useNavigate();
    const [est,setE] = React.useState('1');

    

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



    
    function Inscribir(){
       
        setE('3');
        var data = {
            pidUs:props.alumno.IdUsuario,
            pidCu:props.cursada.IdCursada,
            pidG:props.grupo.IdGrupo
        }

        //console.log(props.idcatedra+"ID de la catedra");
        consultas(data,'http://127.0.0.1:8000/api/inscribirengrupo').then(response=>{
            console.log(response);
       if (response.Mensaje==='OK'){
        
        //handleClose();
        props.abrir(true);
        props.mensaje('Alumno inscripto con éxito');
        props.tipo('success');
        //props.refrescar();
        //console.log("Borrado");
        setE('2');

       } 

       else{
        //console.log("No Borrado");
        //setEstado('2');
      //  handleClose();
        if(response.Integrantes!==''){
        props.abrir(true);
        props.mensaje(response.Integrantes);
        props.tipo('error');
        setE('1');  
      }
        else{
   setE('2');
  }
    }

         })
        .catch(error=>{console.log("Error de conexión en borrar"+error);
          navegar("/registrarse");
      });  
        }
  
  
     
  






    


    return (
        <>
            {    (est==='1') && 
<Tooltip title="Inscribir">
<IconButton aria-label="verificado" size='small' color="success" onClick={()=>{Inscribir()}} >
        <AddIcon />
      </IconButton>
      </Tooltip>
      }
                                
                                
                                {(est==='2') &&  
<Tooltip title="Inscripto">
<IconButton aria-label="error"  size='small' >
        <Brightness1Icon />
      </IconButton>
      </Tooltip>
      }

{                                 (est==='3') && 
  <Tooltip title="Cargando">
  <IconButton aria-label="esperando"  size='small' >
  <CircularProgress />
        </IconButton>
        </Tooltip>
           } 
        </>
    )
    


}



/*


{    (eapellidos==='1') &&  <BotonEstadoRegistro estado={eapellidos}/>}
                                
                                
                                {(eapellidos==='2') &&  <BotonEstadoRegistro estado={eapellidos}/>}

{                                 (eapellidos==='3') &&  <BotonEstadoRegistro estado={eapellidos}/>   }

*/