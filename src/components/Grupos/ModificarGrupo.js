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
import { useModal } from '../useModal';
import { DataObjectSharp } from '@mui/icons-material';


export const ModificarGrupo = () => {
    const [isOpen, handleOpen, handleClose] = useModal(false);

    
    // //datos de prueba
    // const docente = {
    //     apellidos: "Diaz",
    //     nombres: "Rodrigo",
    //     usuario: "diazrod",
    //     email: "diazrodrigoar@gmail.com",
    //     dni: "39359920"
    // }


    return (
        <>
            <Tooltip title="Modificar">
                <IconButton 
                    color='primary'
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
                <DialogTitle>Modificar grupo</DialogTitle>
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
                        //defaultValue={}
                        
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
                        //defaultValue={}
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
                        //defaultValue={}
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
                        //defaultValue={}
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
                        //defaultValue={}
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