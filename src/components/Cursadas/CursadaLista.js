
/*

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
import { Rowing } from '@mui/icons-material';

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
                          <AltaCatedra id={row.catedra} />
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
//import { BorrarInscripcion } from './BorrarInscripcion';
//import { BotonAltaBaja } from './BotonAltaBaja';
import { BotonAcciones } from './BotonAcciones';

//import { BotonAsistencia } from './BotonEstado';
import  {BotonEstado}  from './BotonEstado.js';
import  {BotonGrupo}  from './BotonGrupo.js';
import  {BotonPrograma}  from './BotonPrograma.js';
import  {BotonTipo}  from './BotonTipo.js';


//import TextField from '@mui/material/TextField';
//import SnackBar from './SnackBar'

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';


import  FilasPorPagina  from './FilasPorPagina';

const columns = [
 
  {
    id: 'Anio',
    label: 'Año',
    minWidth: 20,
    align: 'left',
    //format: (value) => value.toFixed(2),
  },

  {
    id: 'Semestre',
    label: 'Semestre',
    minWidth: 20,
    align: 'left',
    //format: (value) => value.toFixed(2),
  },


  {
    id: 'FechaInicio',
    label: 'Inicio',
    minWidth: 20,
    align: 'left',
    //format: (value) => value.toFixed(2),
  },


  {
    id: 'FechaFin',
    label: 'Fin',
    minWidth: 20,
    align: 'left',
    //format: (value) => value.toFixed(2),
  },


  {
    id: 'Programa',
    label: 'Programa',
    minWidth: 20,
    align: 'left',
    //format: (value) => value.toFixed(2),
  },
  {
    id: 'TieneGrupos',
    label: 'Grupos',
    minWidth: 20,
    align: 'left',
    //format: (value) => value.toFixed(2),
  },


  {
    id: 'EscalaPracticos',
    label: 'Escala',
    minWidth: 20,
    align: 'left',
    //format: (value) => value.toFixed(2),
  },

  {
    id: 'PorcentajeNotaTotalPracticos',
    label: '%/Total',
    minWidth: 20,
    align: 'left',
    //format: (value) => value.toFixed(2),
  },

  {
    id: 'CalculoPracticos',
    label: 'Tipo',
    minWidth: 20,
    align: 'left',
    //format: (value) => value.toFixed(2),
  },

  {
    id: 'MaximoIntGrupos',
    label: 'Máximo integrantes',
    minWidth: 20,
    align: 'center',
    //format: (value) => value.toFixed(2),
  },



  {
    id: 'Estado',
    label: 'Estado',
    minWidth: 20,
    align: 'center',
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
/*
if (props.filas.res!==undefined){
  //rows.length=0;
  //rows=props.filas.res;
  while(rows.length) {
    rows.pop();
}
  //console.log(rows);
  for(var i=0;i<props.filas.res.length;i++)
  {
    
    rows.push(props.filas.res[i]);}

  //console.log(rows);
  //console.log(props.filas.res[0]);
}

*/

//console.log(rows);

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
                      
                      /*
                      if(column.id ==='Catedra'){
                        return (<TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>);
                      }
*/




/*

                      
                      if(column.id==='Estado'){

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : <BotonEstado estado={row.Estado} idcursada={row.IdCursada}/>
                              }
                          </TableCell>
                        );

                      }


                      if(column.id==='acciones'){

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : <BotonAcciones nombre={row.Catedra} idcatedra={row.IdCatedra} catedra={row.Catedra} 
                              refrescar={props.refrescar} 
                              abrir={props.abrir} mensaje={props.mensaje} tipo={props.tipo}
                              />
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
        : <BotonAcciones anio={row.Anio} idcursada={row.IdCursada} semestre={row.Semestre} 
        Materia={props.Materia}
        
        refrescar={props.refrescar} 
        abrir={props.abrir} mensaje={props.mensaje} tipo={props.tipo}
        />
        }
    </TableCell>
  );

}



if(column.id==='Estado'){

  return (
    <TableCell key={column.id} align={column.align}>
      {column.format && typeof value === 'number'
        ? column.format(value)
        : <BotonEstado estado={row.Estado} idcursada={row.IdCursada}/>
        }
    </TableCell>
  );

}




if(column.id==='Programa'){

  return (
    <TableCell key={column.id} align={column.align}>
      {column.format && typeof value === 'number'
        ? column.format(value)
        : <BotonPrograma programa={row.Programa} />
        }
    </TableCell>
  );

}


if(column.id==='TieneGrupos'){

  return (
    <TableCell key={column.id} align={column.align}>
      {column.format && typeof value === 'number'
        ? column.format(value)
        : <BotonGrupo grupos={row.TieneGrupos} />
        }
    </TableCell>
  );

}


if(column.id==='CalculoPracticos'){

  return (
    <TableCell key={column.id} align={column.align}>
      {column.format && typeof value === 'number'
        ? column.format(value)
        : <BotonTipo tipo={row.CalculoPracticos} />
        }
    </TableCell>
  );

}



if(column.id==='Anio'||column.id==='Semestre'||column.id==='FechaInicio'||column.id==='FechaFin'
||column.id==='EscalaPracticos'||column.id==='PorcentajeNotaTotalPracticos'||column.id==='MaximoIntGrupos')
{

return (<TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>);
}



                    
                    
                    
              })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid justifyContent="flex-start"
              container
              pt={2}>
                <Grid item xs={6} sx={{mt:1}} >
      <Stack spacing={2}>
      <Pagination variant="outlined"  defaultPage={1} count={props.paginacion} page={props.pagina} onChange={(e, page)=>CambiarPagina(e, page)}  />
      </Stack>
      </Grid>

      <Grid item xs={3} sx={{mt:1}} >
        Filas por página: {<FilasPorPagina actualizarfilas={props.actualizarfilas} fpp={props.filasxpagina}/>}
      </Grid>


      <Grid item xs={3}  sx={{mt:1}}>Resultados: {props.resultados}
      </Grid>

      </Grid>
      <Grid justifyContent="center"
              container
              pt={2}/>
      
    </Paper>
    </ThemeProvider>
  );
}



