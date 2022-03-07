/*import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {  Grid } from '@mui/material';

import { ModificarPractico } from './ModificarPractico';
import { AltaPractico } from './AltaPractico';
import { BajaPractico } from './BajaPractico';
import { BorrarPractico } from './BorrarPractico';

//Datos de prueba
function crearDatosPrueba(apellidos,nombres,dni,email,estado,usuario) {
    return { apellidos,nombres,dni,email,estado,usuario };
}
  
  const rows = [
    crearDatosPrueba("jjjj", "Rodrigo", "39359920","diazrodrigoar@gmail.com","A","diazrod"),
    crearDatosPrueba("Luchesse", "Augusto Gustavo","20300100","gustavo@gmail.com","B","lucheseaug"),
  ];

  

export default function PracticosLista() {



  return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Lista de Practicos">
            
            <TableHead>
              <TableRow>
                <TableCell >Nombre</TableCell>
                <TableCell >Orden</TableCell>
                <TableCell >Tema</TableCell>
                <TableCell >Módulo</TableCell>
                <TableCell >Estado</TableCell>
                <TableCell >Escala</TableCell>
                <TableCell >% Total</TableCell>
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

                  <TableCell component="th" scope="row">
                    {row.estado}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {row.estado}
                  </TableCell>


                  <TableCell align="center">
                      <Grid container justifyContent="space-between">                
                        <Grid item item xs={12} sm="auto">
                          <ModificarPractico docente={row}/>
                        </Grid>
                        
                        <Grid item item xs={12} sm="auto">
                          <AltaPractico/>
                        </Grid>
                        
                        <Grid item item xs={12} sm="auto"> 
                          <BajaPractico/>
                        </Grid>
                        
                        <Grid item item xs={12} sm="auto"> 
                          <BorrarPractico/>
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
*/








import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/material/locale';
//import { AltaGrupo } from './Grupos/AltaGrupo';
import { BotonAltaBaja } from './BotonAltaBaja';
import { BotonAcciones } from './BotonAcciones';


const columns = [
  { id: 'nombre', label: 'Nombre', minWidth: 170 },
  { id: 'tema', label: 'Tema', minWidth: 100 },
  {
    id: 'modulo',
    label: 'Modulo',
    minWidth: 170,
    align: 'right',
    //format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'estado',
    label: 'Estado',
    minWidth: 170,
    align: 'center',
    //format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'acciones',
    label: 'Acciones',
    minWidth: 170,
    align: 'left',
    //format: (value) => value.toFixed(2),
  },
];

function createData(nombre, id, tema, modulo) {
  //const id = '1';
  const estado = '1';
  const acciones='1';
  return { nombre,id, tema, modulo, estado, acciones };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export default function StickyHeadTable() {
  const theme = createTheme(
    esES,
);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  




  return (
<ThemeProvider theme={theme}>

    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if(column.id ==='estado'){
                        return (<TableCell key={column.id} align={column.align}>
                        {<BotonAltaBaja cambio={row.estado} />}
                      </TableCell>);
                      }

                      else if(column.id ==='acciones'){
                        return (<TableCell key={column.id} align={column.align}>
                        {<BotonAcciones cambio={row.id} />}
                      </TableCell>);
                      }


                      else{
                      
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );}
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </ThemeProvider>
  );
}