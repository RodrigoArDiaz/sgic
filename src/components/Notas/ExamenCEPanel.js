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
import { BotonAC } from './BotonAC';
import * as Globales from './Globales';


const columns = [
  { id: 'apellidos', label: 'Apellidos', minWidth: 100 },
  { id: 'nombres', label: 'Nombres', minWidth: 100 },
  
  {
    id: 'libreta',
    label: 'Libreta',
    minWidth: 100,
    align: 'center',
    //format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'enunciado',
    label: 'Enunciado',
    minWidth: 100,
    align: 'center',
    //format: (value) => value.toFixed(2),
  },

  {
    id: 'enunciadocarga',
    label: 'Acciones',
    minWidth: 100,
    align: 'center',
    //format: (value) => value.toFixed(2),
  },

  {
    id: 'correcciones',
    label: 'Correcciones',
    minWidth: 100,
    align: 'center',
    //format: (value) => value.toFixed(2),
  },

  {
    id: 'correccionescarga',
    label: 'Acciones',
    minWidth: 100,
    align: 'center',
    //format: (value) => value.toFixed(2),
  },


];

function createData(apellidos, id,nombres, libreta) {
  const enunciado = '-';
  const correcciones = 'Link correcciones';
  return { id, apellidos, nombres,  libreta, enunciado, correcciones };
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




for (var i = 0; i <rows.length; i++) {
  Globales.filas.push(rows[i]);
}

export default function StickyHeadTable(props) {
  const theme = createTheme(
    esES,
);

const [estado, setEstado] = React.useState('a');
const cambioEstado = () => {
  if(estado==='a'){setEstado('b');}
  else{setEstado('a');}
};

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
            {Globales.filas
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.documento}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if(column.id ==='enunciadocarga'|| column.id ==='correccionescarga'){
                                                
                        if(row.enunciado.trim()===''|| row.enunciado.trim()==='-'){var enc='2'}else{var enc='1'}
                        if(row.correcciones.trim()===''|| row.correcciones.trim()==='-'){var cor='2'}else{var cor='1'}



                        return (<TableCell key={column.id} align={column.align}>
                        {<BotonAC  param1={enc} param2={cor} tipo={column.id} id={row.id} cambio={()=>cambioEstado()}/>}
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