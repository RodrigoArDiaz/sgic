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
import { useModal } from '../useModal';
import { useNavigate } from "react-router-dom";

export const BorrarGrupo = (props) => {
    const [isOpen, handleOpen, handleClose] = useModal(false);
    
    const navegar = useNavigate();
    

    

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



    
    function BorrarGrupo(){
       
        var data = {
            IdCursada:props.idcursada,
            pidG:props.grupo.IdGrupo
        }

        //console.log(props.idcatedra+"ID de la catedra");
        consultas(data,'http://127.0.0.1:8000/api/borrargrupo').then(response=>{
            //console.log(response);
       if (response.Mensaje==='OK'){
        
        handleClose();
        props.abrir(true);
        props.mensaje('Grupo borrado con éxito');
        props.tipo('success');
        props.refrescar();
        //console.log("Borrado");
       } 

       else{
        //console.log("No Borrado");
        //setEstado('2');
        handleClose();
        props.abrir(true);
        props.mensaje(response.Mensaje);
        props.tipo('error');
    
    }

         })
        .catch(error=>{console.log("Error de conexión en borrar"+error);
          navegar("/registrarse");
      });  
        }
  
  
     
  






    


    return (
        <>
            <Tooltip title="Borrar">
                <IconButton 
                    color='secondary'
                    size='small'
                    onClick={handleOpen}
                >
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>

            {/* Ventana modal */}
            <Dialog 
                open={isOpen} 
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Borrar grupo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    ¿Seguro que desea borrar el grupo?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={BorrarGrupo}>Aceptar</Button>
                    <Button variant='outlined'  color="secondary" onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>  
        </>
    )
    


}



