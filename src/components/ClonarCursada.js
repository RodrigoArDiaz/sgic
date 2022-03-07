import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useModal } from '../hooks/useModal';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export const ClonarCursada = () => {
    //Variable de estado y handles de eventos para la ventana modal
    const [isOpen,handleOpen,handleClose] = useModal(false);
    
    return (
        <>
            <Button
                variant='contained'
                //startIcon={<AddIcon/>}
                fullWidth 
                onClick={handleOpen}  
            >
                Clonar Cursada
            </Button>

            {/* Ventana modal */}
            <Dialog 
                open={isOpen} 
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Crear catedra</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ingrese los datos para crear la catedra.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="catedra"
                        name="catedra"
                        label="Nombre de la catedra"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>Crear</Button>
                    <Button onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
