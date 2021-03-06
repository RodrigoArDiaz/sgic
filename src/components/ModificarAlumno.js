import React from 'react';
import { Button } from '@mui/material';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useModal } from '../hooks/useModal';
import { DataObjectSharp } from '@mui/icons-material';


export const ModificarAlumno = ({alumno}) => {
    const [isOpen, handleOpen, handleClose] = useModal(false);


    return (
        <>
            <Tooltip title="Modificar">
                <IconButton 
                    color='secondary'
                    onClick={handleOpen}
                >
                    <EditIcon/>
                </IconButton>
            </Tooltip>

            {/* Ventana modal */}
            <Dialog 
                open={isOpen} 
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Modificar alumno</DialogTitle>
                <DialogContent>
                <TextField
                        autoFocus
                        margin="dense"
                        id="apellidos"
                        name="apellidos"
                        // value={doc.apellidos}
                        label="Apellidos"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={alumno.apellidos}
                        
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
                        defaultValue={alumno.nombres}
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
                        defaultValue={alumno.usuario}
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
                        defaultValue={alumno.email}
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
                        defaultValue={alumno.dni}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="libreta"
                        name="libreta"
                        label="Libreta"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={alumno.libreta}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose}>Aceptar</Button>
                    <Button variant='outlined'  color="secondary" onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>  
        </>
    )
}