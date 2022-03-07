

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
//import { BorrarInscripcion } from './BorrarInscripcion';
//import { BotonAltaBaja } from './BotonAltaBaja';
import { BotonAcciones } from './BotonAcciones';

import { BotonAsistencia } from './BotonAsistencia';
import  BotonEstados  from './BotonEstados.js';

import TextField from '@mui/material/TextField';
import SnackBar from './SnackBar'





const columns = [
 
  {
    id: 'apellidos',
    label: 'Apellidos',
    minWidth: 100,
    align: 'left',
    //format: (value) => value.toFixed(2),
  },

  {
    id: 'nombres',
    label: 'Nombres',
    minWidth: 100,
    align: 'left',
    //format: (value) => value.toFixed(2),
  },

  {
    id: 'libreta',
    label: 'Libreta',
    minWidth: 100,
    align: 'left',
    //format: (value) => value.toFixed(2),
  },
  
  { id: 'practicos', label: 'Practicos', minWidth: 30, align: 'center', },
  { id: 'examenes', label: 'Examenes', minWidth: 30 , align: 'center',},
  
  
 
  ,
  {
    id: 'ncal',
    label: 'Nota Calculada',
    minWidth: 30,
    align: 'center',
    //format: (value) => value.toLocaleString('en-US'),
  },


  {
    id: 'nfin',
    label: 'Nota Final',
    minWidth: 10,
    //maxWidth: 15,
    align: 'center',
    //format: (value) => value.toLocaleString('en-US'),
  },

  {
    id: 'asistencia',
    label: 'Asistencia',
    minWidth: 10,
    align: 'center',
    //format: (value) => value.toFixed(2),
  },


  {
    id: 'estado',
    label: 'Estado Final',
    minWidth: 170,
    align: 'center',
    //format: (value) => value.toLocaleString('en-US'),
  },
  
];

function createData(asistencia,id, practicos, examenes) {
 const apellidos='Perez';
 const nombres='Juan';
 const libreta='1411925';
  const nfin = '1';
  const estado = '1';
  const ncal='correo@gmail.com';
  //const acciones ='1';
  
  return { apellidos,nombres,libreta,id,asistencia,practicos,examenes,ncal,nfin,estado };
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

/*

  const cambio = () => {
    if (salto ==='1'){setSalto('2'); 
}
  if (salto ==='2'){setSalto('1');
  }}


  const [salto, setSalto] = React.useState('1');

function Devuelve (props){
if(salto==='1'){return(<TextField id={props.var} label={props.var2} variant="outlined" onChange={()=>cambio()} />);}
else {//console.log(props.var);
  return(<TextField id={props.var} label={props.var2} variant="outlined" />);}

}

*/
  return (
<ThemeProvider theme={theme}>

    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: "none" }}>
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
                       if(column.id ==='apellidos'||column.id ==='nombres'||column.id ==='libreta'||column.id ==='practicos'||column.id ==='examenes'||column.id ==='ncal'){
                        return (<TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>);
                      }


                      else{
                      if(column.id==='asistencia'){

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : <BotonAsistencia />
                              }
                          </TableCell>
                        );

                      }


                      if(column.id==='estado'){

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : <BotonEstados />
                              }
                          </TableCell>
                        );

                      }


                      else{
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : <BotonAcciones var={row.id} var2={value}/>
                            }
                        </TableCell>
                      );}
                    
                    }
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




