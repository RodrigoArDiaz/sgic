import React from 'react';
import { Button } from '@mui/material';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useModal } from '../useModal';


export const BajaGrupo = () => {
    const [isOpen, handleOpen, handleClose] = useModal(false);

    return (
        <>
            <Tooltip title="Baja">
                <IconButton 
                    color='primary'
                    onClick={handleOpen}
                >
                    <CancelIcon/>
                </IconButton>
            </Tooltip>

            {/* Ventana modal */}
            <Dialog 
                open={isOpen} 
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Baja grupo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Seguro que desea dar de baja el grupo?
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