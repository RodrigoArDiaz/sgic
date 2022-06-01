import React from 'react';
import { Button } from '@mui/material';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//import { useModal } from '../hooks/useModal';
import { useModal } from '../useModal';
import PanelGruposIntegrantes from './PanelGruposIntegrantes.js';
import BuscarAlumnosGrupos from './BuscarAlumnosGrupos';
import { Grid } from '@mui/material';
//import { useModal } from '/materi';
export const ListarIntegrantes = () => {
    const [isOpen, handleOpen, handleClose] = useModal(false);

    return (
        <>
            <Tooltip title="Listar integrantes">
                <IconButton 
                    color='primary'
                    onClick={handleOpen}
                >
                    <SupervisorAccountIcon/>
                </IconButton>
            </Tooltip>

            {/* Ventana modal */}
            <Dialog 
                open={isOpen} 
                onClose={handleClose}
                //maxWidth="xs"
                fullScreen
            >
                <DialogTitle>Lista Alumnos Grupo 1</DialogTitle>
                
                <Grid
              
            >
                <BuscarAlumnosGrupos/>
            </Grid>
          

            <Grid
              
            >

                <PanelGruposIntegrantes/>


                </Grid>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose}>Volver</Button>
                     </DialogActions>
            </Dialog>  
        </>
    )
}
