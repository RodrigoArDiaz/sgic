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
import * as Responses from '../../Responses';

export const BorrarParametro = (props) => {
    const [isOpen, handleOpen, handleClose] = useModal(false);

    const navegar = useNavigate();
    
    
    function BorrarParametro(){
       
        var data = {
            IdParametro:props.parametro.IdParametro,
            IdCursada:props.idcursada 
        }


       Responses.consultas(data,'http://127.0.0.1:8000/api/borrarparametro').then(response=>{
            

        if(Responses.status===200){
            handleClose();
            props.abrir(true);
            props.mensaje('Parámetro borrado con éxito');
            props.tipo('success');
            props.refrescar();
          }
          else if(Responses.status===401){
            navegar("/ingreso");
          }
     else if (Responses.status===460){
        handleClose();
        props.abrir(true);
        props.mensaje(response.Error);
        props.tipo('error');
     }    
          else {
            navegar("/error");
          }


         })
        .catch(error=>{
            navegar("/error");
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
                   < DeleteIcon/>
                </IconButton>
            
            
            </Tooltip>
 
 
            {/* Ventana modal */}
            <Dialog 
                open={isOpen} 
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Borrar parámetro </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Seguro que desea borrar el parámetro?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={BorrarParametro}>Aceptar</Button>
                    <Button variant='outlined'  color="secondary" onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>  
        </>
    )
}