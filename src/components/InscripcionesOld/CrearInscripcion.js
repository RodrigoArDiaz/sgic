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
import InscripcionPanel from './InscripcionPanel'
import BuscarInscripciones from './BuscarInscripciones'

 

export const CrearInscripcion = () => {
    //Variable de estado y handles de eventos para la ventana modal
    const [isOpen,handleOpen,handleClose] = useModal(false);
    
    return (
        <>
            <Button
                variant='contained'
                startIcon={<AddIcon/>}
                fullWidth 
                onClick={handleOpen}  
            >
                agregar inscripcion
            </Button>

            {/* Ventana modal */}
            <Dialog 
                open={isOpen} 
                onClose={handleClose}
                fullScreen
            >
                <DialogTitle>Agregar Inscripción</DialogTitle>
                
                <Grid
              
              >
                  <BuscarInscripciones/>
              </Grid>
            
  
              <Grid
                
              >
  
                  <InscripcionPanel/>
  
  
                  </Grid>


                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>Volver</Button>
                   
                </DialogActions>
            </Dialog>
        </>
    )
}
