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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export const ModificarRolUsuario = () => {
    const [isOpen, handleOpen, handleClose] = useModal(false);

    return (
        <>
            <Button 
                startIcon={<EditIcon/>}
                size='small'
                color="secondary"
                onClick={handleOpen}    
            >
               Modificar
            </Button>

            {/* Ventana modal */}
            <Dialog 
                open={isOpen} 
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Modificar Rol de Usuario</DialogTitle>
                <DialogContent>
                <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-standard-label">Rol</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        // value={age}
                        // onChange={handleChange}
                        label="Rol"
                        size='large'
                    >
                        <MenuItem value={0}>Docente</MenuItem>
                        <MenuItem value={10}>Administrador</MenuItem>
                    </Select>
                </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose}>Aceptar</Button>
                    <Button variant='outlined'  color="secondary" onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>  
        </>
    )
}