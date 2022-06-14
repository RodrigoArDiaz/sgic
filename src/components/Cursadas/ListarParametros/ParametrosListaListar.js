import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/material/locale';
import  {BotonTipo}  from '../BotonTipo.js';
import { BotonAcciones } from './BotonAcciones';


const columns = [
 
  {
    id: 'Tipo',
    label: 'Tipo',
    minWidth: 20,
    align: 'left',
  },


  {
    id: 'Calculo',
    label: 'Cálculo',
    minWidth: 20,
    align: 'left',
  },


  {
    id: 'Escala',
    label: 'Escala',
    minWidth: 20,
    align: 'left',
  },

  {
    id: 'PorcentajeNotaTotal',
    label: '%/Total',
    minWidth: 20,
    align: 'left',
  },

  {
    id: 'acciones',
    label: 'Acciones',
    minWidth: 20,
    align: 'center',
  },
  
];


function Transformar(param) {
  if(param==='Q')
  return "Quiz";

  if(param==='P')
  return "Parcial";
  if(param==='F')
  return "Final";
}



export default function StickyHeadTable(props) {
  
  
  
  const theme = createTheme(
    esES,
);

if(props.filas.res===undefined) return (<h4 >Error fatal</h4>);
if (props.filas.res.length<1) return(<h4 >No se encontraron resultados</h4>);



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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.IdParametro}>
                    {columns.map((column) => {
                      const value = row[column.id];
                       
                      
                      if(column.id ==='Tipo'){
                        return (<TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : Transformar(value)} 
                        </TableCell>);
                      }


                      if(column.id ==='Calculo'){
                        return (<TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : <BotonTipo tipo={value} />} 
                        </TableCell>);
                      }

                      if(column.id ==='Escala'){
                        return (<TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value} 
                        </TableCell>);
                      }

                      if(column.id ==='PorcentajeNotaTotal'){
                        return (<TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value} 
                        </TableCell>);
                      }

                      if(column.id==='acciones'){

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : <BotonAcciones semestre={props.semestre} Materia={props.Materia} anio={props.anio}
                              refrescar={props.refrescar} 
                              parametro={row} idcursada={props.idcursada}
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



