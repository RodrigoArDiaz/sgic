import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useModal } from '../useModal';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
//import AgregarInscripcionesContenedor from './Agregar/AgregarInscripcionesContenedor'



import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
//import BuscarInscripciones from './BuscarInscripciones'
import ListarIntegrantesContenedor from './ListarIntegrantes/ListarIntegrantesContenedor'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

export const ListarIntegrantes = (props) => {
    //Variable de estado y handles de eventos para la ventana modal
    const [isOpen,handleOpen,handleClose] = useModal(false);
    
    function Volver(){
       // props.refrescar();
        handleClose();
    }
    return (
        <>
            
            <Tooltip title="Listar integrantes">
<IconButton aria-label="listar" size='small' color='secondary' onClick={handleOpen}>
        <SupervisorAccountIcon />
      </IconButton>
      </Tooltip>
            
           

            {/* Ventana modal */}
            <Dialog 
                open={isOpen} 
                onClose={handleClose}
                fullScreen
            >
                <DialogTitle>Integrantes de {props.grupo.Grupo}</DialogTitle>
                
               <ListarIntegrantesContenedor cursada={props.cursada} grupo={props.grupo}/>


                <DialogActions>
                    <Button variant="contained" onClick={()=>{Volver()}}>Volver</Button>
                   
                </DialogActions>
            </Dialog>
        </>
    )
}
