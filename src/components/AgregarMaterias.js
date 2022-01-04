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
import { AddCircle } from '@mui/icons-material';
import { AgregarMateriaCatedra } from './AgregarMateriaCatedra';
import BuscarMaterias from './BuscarMaterias';

//Datos de prueba
function crearDatosPrueba(materia,carrera, planEstudio,codigoSIU) {
    return { materia,carrera, planEstudio,codigoSIU};
}
  
  const rows = [
    crearDatosPrueba("Ingenieria de Software I", "Ingenieria en Computacion", "Modificacion 2014","1234"),
    crearDatosPrueba("Lab. de base de datos", "Ingenieria en Computacion", "Modificacion 2014","4321"),
  ];

export const AgregarMaterias = () => {
    const [isOpen, handleOpen, handleClose] = useModal(false);

    return (
        <>
            <Button 
                startIcon={<AddCircle/>}
                size='small'
                color="secondary"
                onClick={handleOpen} 
                >
                Agregar materias
            </Button>

            {/* Ventana modal */}
            <Dialog 
                open={isOpen} 
                onClose={handleClose}
                maxWidth="lg"
                fullWidth
            >
                <DialogTitle>Agregar materia a la catedra</DialogTitle>
                <DialogContent>
                    <BuscarMaterias/>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="Lista de Catedras">
                            
                            <TableHead>
                                <TableRow>
                                    <TableCell>Materia</TableCell>
                                    <TableCell>Carrera</TableCell>
                                    <TableCell>Plan de estudio</TableCell>
                                    <TableCell>Codigo SIU</TableCell>
                                    <TableCell align="center">Accion</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.codigoSIU}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.materia}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.carrera}
                                    </TableCell>

                                    <TableCell component="th" scope="row">
                                        {row.planEstudio}
                                    </TableCell>

                                    <TableCell component="th" scope="row">
                                        {row.codigoSIU}
                                    </TableCell>

                                    <TableCell align="center">
                                        <Grid container justifyContent="space-between">                          
                                            <Grid item xs={12} sm="auto">
                                                <AgregarMateriaCatedra/>
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
                    {/* <Button variant='contained' onClick={handleClose}>Aceptar</Button> */}
                    <Button variant='outlined'  color="secondary" onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>  
        </>
    )
}