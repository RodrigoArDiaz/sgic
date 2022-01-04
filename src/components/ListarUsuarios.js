import React from 'react';
import { Button } from '@mui/material';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ViewListIcon from '@mui/icons-material/ViewList';
import { TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useModal } from '../hooks/useModal';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { ModificarRolUsuario } from './ModificarRolUsuario';
import { BorrarRolUsuario } from './BorrarRolUsuario';

//Datos de prueba
function crearDatosPrueba(apellidos,nombres,rol) {
    return { apellidos,nombres,rol };
}
  
  const rows = [
    crearDatosPrueba("Diaz", "Rodrigo", "Administrador"),
    crearDatosPrueba("Luchesse", "Augusto Gustavo","Docente"),
    crearDatosPrueba("Perez", "Juan","Docente"),
  ];

export const ListarUsuarios = () => {
    const [isOpen, handleOpen, handleClose] = useModal(false);

    return (
        <>
            <Button 
                startIcon={<ViewListIcon/>}
                size='small'
                color="secondary"
                onClick={handleOpen}    
            >
                Listar Usuarios
            </Button>

            {/* Ventana modal */}
            <Dialog 
                open={isOpen} 
                onClose={handleClose}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Usuarios de la catedra</DialogTitle>
                <DialogContent>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Lista de Catedras">
                    
                    <TableHead>
                        <TableRow>
                            <TableCell>Apellidos</TableCell>
                            <TableCell>Nombres</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.apellidos}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.apellidos}
                        </TableCell>

                        <TableCell component="th" scope="row">
                            {row.nombres}
                        </TableCell>

                        <TableCell component="th" scope="row">
                            {row.rol}
                        </TableCell>

                        <TableCell align="center">
                            <Grid container justifyContent="space-between">                          
                                <Grid item xs={12} sm="auto">
                                   <ModificarRolUsuario/>
                                </Grid>
                                
                                <Grid item item xs={12} sm="auto">
                                    <BorrarRolUsuario/>
                                </Grid>                                           
                            </Grid>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
        </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose}>Aceptar</Button>
                    <Button variant='outlined'  color="secondary" onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>  
        </>
    )
}