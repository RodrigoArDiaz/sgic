import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {  Grid } from '@mui/material';
import { AltaCatedra } from './AltaCatedra';
import { BajaCatedra } from './BajaCatedra';
import { BorrarCatedra } from './BorrarCatedra';
import { ModificarCatedra } from './ModificarCatedra';
import { ListarUsuarios } from './ListarUsuarios';
import { AgregarMaterias } from './AgregarMaterias';
import { AgregarUsuarios } from './AgregarUsuarios';
import { ModificarDocente } from './ModificarDocente';
import { AltaDocente } from './AltaDocente';
import { BajaDocente } from './BajaDocente';
import { BorrarDocente } from './BorrarDocente';

//Datos de prueba
function crearDatosPrueba(apellidos,nombres,dni,email,estado,usuario) {
    return { apellidos,nombres,dni,email,estado,usuario };
}
  
  const rows = [
    crearDatosPrueba("Diaz", "Rodrigo", "39359920","diazrodrigoar@gmail.com","A","diazrod"),
    crearDatosPrueba("Luchesse", "Augusto Gustavo","20300100","gustavo@gmail.com","B","lucheseaug"),
  ];

  

export default function DocentesLista() {
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Lista de Catedras">
            
            <TableHead>
              <TableRow>
                <TableCell >Apellidos</TableCell>
                <TableCell >Nombres</TableCell>
                <TableCell >DNI</TableCell>
                <TableCell >Email</TableCell>
                <TableCell >Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.catedra}
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

                  <TableCell component="th" scope="row">
                    {row.estado}
                  </TableCell>

                  <TableCell align="center">
                      <Grid container justifyContent="space-between">                
                        <Grid item item xs={12} sm="auto">
                          <ModificarDocente docente={row}/>
                        </Grid>
                        
                        <Grid item item xs={12} sm="auto">
                          <AltaDocente/>
                        </Grid>
                        
                        <Grid item item xs={12} sm="auto"> 
                          <BajaDocente/>
                        </Grid>
                        
                        <Grid item item xs={12} sm="auto"> 
                          <BorrarDocente/>
                        </Grid>
                        
                      </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}
