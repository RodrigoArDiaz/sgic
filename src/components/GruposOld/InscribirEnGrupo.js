import React from 'react';
import { Button } from '@mui/material';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import RedoIcon from '@mui/icons-material/Redo';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//import { useModal } from '../hooks/useModal';
import { useModal } from '../useModal';
import PanelGruposInscripcion from '../PanelGruposInscripcion.js';
import BuscarAlumnosGrupos from './BuscarAlumnosGrupos';
import { Grid } from '@mui/material';
//import { useModal } from '/materi';
export const InscribirEnGrupo = () => {
    const [isOpen, handleOpen, handleClose] = useModal(false);

    return (
        <>
            <Tooltip title="Inscribir alumnos">
                <IconButton 
                    color='primary'
                    onClick={handleOpen}
                >
                    <RedoIcon/>
                </IconButton>
            </Tooltip>

            {/* Ventana modal */}
            <Dialog 
                open={isOpen} 
                onClose={handleClose}
                //maxWidth="xs"
                fullScreen
            >
                <DialogTitle>Inscribir Alumnos Grupo 1</DialogTitle>
                
                <Grid
              
            >
                <BuscarAlumnosGrupos/>
            </Grid>
          

            <Grid
              
            >

                <PanelGruposInscripcion/>


                </Grid>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose}>Volver</Button>
                     </DialogActions>
            </Dialog>  
        </>
    )
}
