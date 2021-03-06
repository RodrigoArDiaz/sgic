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


export const CrearDocente = () => {
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
                Crear docente
            </Button>

            {/* Ventana modal */}
            <Dialog 
                open={isOpen} 
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Crear docente</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ingrese los datos para crear el docente.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="apellidos"
                        name="apellidos"
                        label="Apellidos"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nombres"
                        name="nombres"
                        label="Nombres"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="usuario"
                        name="usuario"
                        label="Usuario"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email"
                        type="text"
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="dni"
                        name="dni"
                        label="DNI"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    
                    <TextField
                        autoFocus
                        margin="dense"
                        id="contrasenia"
                        name="contrasenia"
                        label="Contrase??a"
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
