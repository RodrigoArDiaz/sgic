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
//import { AgregarUsuarioCatedra } from '../Catedras/AgregarUsuarioCatedra';

//import { BotonAsistencia } from './BotonEstado';
//import  {BotonEstado}  from '../Catedras/BotonEstado.js';

//import TextField from '@mui/material/TextField';
//import SnackBar from './SnackBar'

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';

import  FilasPorPagina  from '../FilasPorPagina';


import { BotonAcciones } from './BotonAcciones';
//import { BorrarRolUsuario } from '../BorrarRolUsuario';


const columns = [
 
  {
    id: 'Materia',
    label: 'Materia // Código SIU',
    minWidth: 20,
    align: 'left',
    //format: (value) => value.toFixed(2),
  },


  {
    id: 'Carrera',
    label: 'Carrera // Código SIU',
    minWidth: 20,
    align: 'left',
    //format: (value) => value.toFixed(2),
  },


  {
    id: 'Plan',
    label: 'Plan De Estudio // Código SIU',
    minWidth: 20,
    align: 'left',
    //format: (value) => value.toFixed(2),
  },



  {
    id: 'acciones',
    label: 'Acciones',
    minWidth: 20,
    align: 'center',
    //format: (value) => value.toFixed(2),
  },
  
  



  
];


function crearDatosPrueba(Catedra, IdCatedra, Estado) {
  return { Catedra, IdCatedra, Estado };
}

var rows = [
  crearDatosPrueba("Ingenieria de Software",1,'A'),
  crearDatosPrueba("Bases de Datos",2,'A'),
  crearDatosPrueba("Arquitectura de Computadoras",3,'A'),
  crearDatosPrueba("Sistema con Microprocesadores",4,'B'),
];

/*
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
*/
export default function StickyHeadTable(props) {
  
  function CambiarPagina(e, page){

//console.log(page);
props.actualizarpagina(page);
  }
  
  
  const theme = createTheme(
    esES,
);

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

var cuenta;

if(props.filas.res===undefined) return (<h4 >Error fatal</h4>);
if (props.filas.res.length<1) return(<h4 >No se encontraron resultados</h4>);

//console.log(props.filas.res);

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
            {props.filas.res
              
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.IdCatedra}>
                    {columns.map((column) => {
                      const value = row[column.id];
                       if(column.id ==='Materia'){
                        return (<TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value} // {row.MCodigoSIU} //{(row.MEstado==='A') &&
                            <Tooltip title="Activa">
                            <IconButton aria-label="estado" size='small' color="success" >
                                    <CheckIcon />
                                  </IconButton>
                                  </Tooltip>
                                  
                              }
                              {(row.MEstado==='B') &&
                              <Tooltip title="Baja">
                            <IconButton aria-label="estado2"  size='small' color="error" >
                                    <CloseIcon />
                                  </IconButton>
                                  </Tooltip>
                                  
                              }
                        </TableCell>);
                      }


                      if(column.id ==='Carrera'){
                        return (<TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value} // {row.CCodigoSIU} //{(row.CEstado==='A') &&
                            <Tooltip title="Activa">
                            <IconButton aria-label="estado" size='small' color="success" >
                                    <CheckIcon />
                                  </IconButton>
                                  </Tooltip>
                                  
                              }
                              {(row.CEstado==='B') &&
                              <Tooltip title="Baja">
                            <IconButton aria-label="estado2"  size='small' color="error" >
                                    <CloseIcon />
                                  </IconButton>
                                  </Tooltip>
                                  
                              }
                        </TableCell>);
                      }

                      if(column.id ==='Plan'){
                        return (<TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value} // {row.PCodigoSIU} //{(row.PEstado==='A') &&
                            <Tooltip title="Activo">
                            <IconButton aria-label="estado" size='small' color="success" >
                                    <CheckIcon />
                                  </IconButton>
                                  </Tooltip>
                                  
                              }
                              {(row.PEstado==='B') &&
                              <Tooltip title="Baja">
                            <IconButton aria-label="estado2"  size='small' color="error" >
                                    <CloseIcon />
                                  </IconButton>
                                  </Tooltip>
                                  
                              }
                        </TableCell>);
                      }

                      
/*
                      if(column.id==='Estado'){

                        return (
                          <TableCell key={column.id} align={column.align}>
                             {(value==='A') &&
<Tooltip title="Activo">
<IconButton aria-label="estado" size='small' color="success" >
        <CheckIcon />
      </IconButton>
      </Tooltip>
      
  }
  {(value==='B') &&
  <Tooltip title="Baja">
<IconButton aria-label="estado2"  size='small' color="error" >
        <CloseIcon />
      </IconButton>
      </Tooltip>
      
  }
                          </TableCell>
                        );

                      }
*/

                      if(column.id==='acciones'){

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : <BotonAcciones nombre={row.Catedra} idcatedra={props.idcatedra} catedra={row.Catedra} 
                              refrescar={props.refrescar} 
                              abrir={props.abrir} mensaje={props.mensaje} tipo={props.tipo} idusuario={row.IdUsuario}
                            materia={row.IdMateria} plan={row.IdPlanEstudio} carrera={row.IdCarrera}
                          nombremateria={row.Materia}

                              />
                              }
                          </TableCell>);

                      }




                    
                    
                    
              })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      



     
      
    </Paper>
    </ThemeProvider>
  );
}



