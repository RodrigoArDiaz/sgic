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

//Datos de prueba
function crearDatosPrueba(catedra) {
    return { catedra };
}
  
  const rows = [
    crearDatosPrueba("Ingenieria de Software"),
    crearDatosPrueba("Bases de Datos"),
    crearDatosPrueba("Arquitectura de Computadoras"),
    crearDatosPrueba("Sistema con Microprocesadores"),
  ];

  

export default function CatedraLista() {
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Lista de Catedras">
            
            <TableHead>
              <TableRow>
                <TableCell>Catedra</TableCell>
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
                    {row.catedra}
                  </TableCell>
                  <TableCell align="center">
                      <Grid container justifyContent="space-between">
                        <Grid item xs={12} sm="auto">
                          <AgregarMaterias/>
                        </Grid>
                        
                        <Grid item item xs={12} sm="auto">
                          <AgregarUsuarios/>
                        </Grid>
                        
                        <Grid item item xs={12} sm="auto">
                          <ListarUsuarios/>  
                        </Grid>
                        
                        <Grid item item xs={12} sm="auto">
                          <ModificarCatedra/>
                        </Grid>
                        
                        <Grid item item xs={12} sm="auto">
                          <AltaCatedra/>
                        </Grid>
                        
                        <Grid item item xs={12} sm="auto"> 
                          <BajaCatedra/>
                        </Grid>
                        
                        <Grid item item xs={12} sm="auto"> 
                          <BorrarCatedra/>
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
