import React from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useModal } from "../useModal";

import CursadasContenedor from "../Cursadas/CursadasContenedor";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
//import { AgregarMateriaCatedra } from './AgregarMateriaCatedra';
//import BuscarMaterias from './BuscarMaterias';
import BuildIcon from "@mui/icons-material/Build";
//import BuscarUsuarios from './BuscarUsuarios';
//import { AgregarUsuarioCatedra } from './AgregarUsuarioCatedra';
//import CatedrasUsuariosContenedor from './CatedrasUsuariosContenedor';

//Datos de prueba
function crearDatosPrueba(apellidos, nombres, dni, email) {
  return { apellidos, nombres, dni, email };
}

const rows = [
  crearDatosPrueba(
    "Diaz",
    "Rodrigo Armando",
    "39359920",
    "diazrodrigoar@gmail.com"
  ),
];

export const GestionarCursadas = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<BuildIcon />}
        //size='small'
        fullWidth
        color="secondary"
        onClick={handleOpen}
      >
        Gestionar cursadas
      </Button>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} maxWidth="lg" fullScreen>
        <DialogContent>
          <CursadasContenedor
            Materia={props.Materia}
            idmateria={props.idmateria}
          />
        </DialogContent>
        <DialogActions>
          {/* <Button variant='contained' onClick={handleClose}>Aceptar</Button> */}
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Volver
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

/**
 <DialogTitle>Gestionar cursadas - {props.Materia}</DialogTitle>

 */

/*

<BuscarUsuarios/>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="Lista de Catedras">
                            
                            <TableHead>
                                <TableRow>
                                    <TableCell>Apellidos</TableCell>
                                    <TableCell>Nombres</TableCell>
                                    <TableCell>DNI</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell >Accion</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.codigoSIU}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.apellidos}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.nombres}
                                    </TableCell>

                                    <TableCell component="th" scope="row">
                                        {row.dni}
                                    </TableCell>

                                    <TableCell component="th" scope="row">
                                        {row.email}
                                    </TableCell>

                                    <TableCell >
                                        <Grid container justifyContent="space-between">                          
                                            <Grid item xs={12} sm="auto">
                                                <AgregarUsuarioCatedra/>
                                            </Grid>                                        
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

*/
