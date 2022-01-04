import React from 'react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useModal } from '../hooks/useModal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CerrarSesion({responsive}) {
    const [isOpen, handleOpen, handleClose] = useModal(false);

    return (
        <>
            

            {responsive ?
                <Button 
                    size="large"
                    variant="outlined"
                    color="secondary"
                    endIcon={<LogoutIcon/>}
                    elevation={12}
                    onClick={handleOpen}
                    >
                        Cerrar Sesion
                </Button>
                :
                <Button 
                    sx={{display: {xs: 'none', sm:'flex'}}}
                    variant= "contained"
                    color="primary"
                    disableElevation      
                    endIcon={<LogoutIcon/>}
                    onClick={handleOpen}
                >    
                    Cerrar Sesion
                </Button>
            }

            {/* Ventana modal */}
            <Dialog 
                open={isOpen} 
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Cerrar Sesion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Seguro que desea cerrar sesión?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose}>Aceptar</Button>
                    <Button variant='outlined'  color="secondary" onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog> 
    </>
    )
}
