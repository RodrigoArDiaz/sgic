/*import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {  Grid } from '@mui/material';

//import { ModificarExamen } from './ModificarInscripcion';
//import { AltaExamen } from './AltaExamen';
//import { BajaExamen } from './BajaExamen';
import { BorrarInscripcion } from './BorrarInscripcion';

//Datos de prueba
function crearDatosPrueba(apellidos,nombres,dni,email,estado,usuario) {
    return { apellidos,nombres,dni,email,estado,usuario };
}
  
  const rows = [
    crearDatosPrueba("jjjj", "Rodrigo", "39359920","diazrodrigoar@gmail.com","A","diazrod"),
    crearDatosPrueba("Luchesse", "Augusto Gustavo","20300100","gustavo@gmail.com","B","lucheseaug"),
  ];

  

export default function InscripcionesLista() {



  return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Lista de Practicos">
            
            <TableHead>
              <TableRow>
                <TableCell >Apellidos</TableCell>
                <TableCell >Nombres</TableCell>
                <TableCell >Libreta</TableCell>
                <TableCell >Documento</TableCell>
                
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

                  


                  <TableCell align="center">
                      <Grid container justifyContent="space-between">                
                                                
                        <Grid item item xs={12} sm="auto" > 
                          <BorrarInscripcion/>
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
import { BotonAcciones } from './BotonAcciones';
import { Button } from '@mui/material';
import { Tooltip } from '@mui/material';
//import { BorrarInscripcion } from './BorrarInscripcion';
//import { BotonAltaBaja } from './BotonAltaBaja';
//import { BotonAcciones } from './BotonAcciones';





import { EditarExamenEC } from './EditarExamenEC';


const exavec = [
  { id: 5, nombre: 'Examen 1', orden:1},
  { id: 8, nombre: 'Examen 2' ,orden:2},
  { id: 3, nombre: 'Examen 3' ,orden:3},
  { id: 9, nombre: 'Examen 4' ,orden:4},

  { id: 20, nombre: 'Examen 5', orden:5},
  { id: 21, nombre: 'Examen 6' ,orden:6},
  { id: 22, nombre: 'Examen 7' ,orden:7},
  { id: 23, nombre: 'Examen 8' ,orden:8},

  

  ];






const columns = [
  { id: 'apellidos', label: 'Apellidos', minWidth: 50 },
  { id: 'nombres', label: 'Nombres', minWidth: 50 },
  
  {
    id: 'libreta',
    label: 'Libreta',
    minWidth: 50,
    align: 'left',
    //format: (value) => value.toLocaleString('en-US'),
  },

  ];


  
 const nuevo = exavec.map((pra) => (
    {  id: 'orden'+pra.orden,
    label: pra.nombre,
    minWidth: 100,
    align: 'center',}

    
  ));


for( let i=0;i<nuevo.length;i++){

columns.push(nuevo[i]);

}








function createData(apellidos,id, nombres, libreta) {
  const orden1 = '1';
  const orden2='2';
  const orden3='3';
  const orden4='4';
  
  return { id,apellidos, nombres,libreta, orden1, orden2, orden3, orden4 };
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
              {columns.map((column) => {

 if(column.id ==='apellidos'||column.id ==='nombres'||column.id ==='libreta'){
   return(
<TableCell  
                  key={column.id}
                  align={column.align}
                  style={{ width: 20 }} 
                >
                  
                  {column.label}
                  
                </TableCell>);

 }
else {
return(

                <TableCell 
                  key={column.id}
                  align={column.align}
                  style={{ width: column.minWidth }} 
                >
                  <EditarExamenEC nombre={column.label}/>
                </TableCell>
                
);


}


                


              })}
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
                    
                      if(column.id ==='apellidos'||column.id ==='nombres'||column.id ==='libreta'){
                      
                      return (
                        <TableCell  key={column.id} align={column.align}  style={{ width: 20 }}>

                          <td style={{ width: 20 }} >                          
                           {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}

                          </td>
                        </TableCell>
                      );}

                      else{

                        return (
                          <TableCell key={column.id} align={column.align}  style={{ width: column.minWidth }}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : <BotonAcciones var={row.id} var2={value}/>}
                          </TableCell>
                        );

                      }
                    
                    /*}*/
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