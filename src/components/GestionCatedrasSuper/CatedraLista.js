import * as React from "react";
//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import { Box, Grid, Typography } from "@mui/material";
//Componentes propios
import { BotonAcciones } from "./BotonAcciones";
import { BotonEstado } from "./BotonEstado.js";
import FilasPorPagina from "./FilasPorPagina";
import {
  TableCell1em,
  TableCellHead,
  TableRowElevacion,
} from "../Material UI - Componentes Modificados/ComponentesTabla";
import MensajeFeedback from "../MensajeFeedback";
import PaginationCustom from "../Material UI - Componentes Modificados/ComponentePaginacion/PaginationCustom";

//Columnas tabla
const columns = [
  {
    id: "Catedra",
    label: "Catedra",
    minWidth: 20,
    align: "left",
    //format: (value) => value.toFixed(2),
  },

  {
    id: "Estado",
    label: "Estado",
    minWidth: 20,
    align: "center",
    //format: (value) => value.toFixed(2),
  },

  {
    id: "acciones",
    label: "Acciones",
    minWidth: 20,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
];

/*** Componente CatedraLista ***/
export default function CatedraLista(props) {
  //
  function CambiarPagina(e, page) {
    props.actualizarpagina(page);
  }

  //
  // if (props.filas.res === undefined)
  //   return (
  //     <Box
  //       sx={{
  //         backgroundColor: "#fff",
  //         borderRadius: "10px",
  //         border: "1px solid",
  //         borderColor: "secondary.light100",
  //         textAlign: "center",
  //         paddingX: "1rem",
  //       }}
  //     >
  //       <Grid container>
  //         <MensajeFeedback tipo="error">Error fatal.</MensajeFeedback>
  //       </Grid>
  //     </Box>
  //   );

  if (props.filas.res === undefined || props.filas.res.length < 1)
    return (
      <Grid container paddingX={2}>
        <MensajeFeedback>No se encontraron resultados.</MensajeFeedback>
      </Grid>
    );

  return (
    <>
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table aria-label="Lista de catedras" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCellHead
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCellHead>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {props.filas.res.map((row) => {
              return (
                <TableRowElevacion key={row.IdCatedra}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === "Catedra") {
                      return (
                        <TableCell1em
                          key={column.id}
                          align={column.align}
                          component="th"
                          scope="row"
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell1em>
                      );
                    }

                    if (column.id === "Estado") {
                      return (
                        <TableCell1em
                          key={column.id}
                          align={column.align}
                          component="th"
                          scope="row"
                        >
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <BotonEstado
                              estado={row.Estado}
                              idcatedra={row.IdCatedra}
                            />
                          )}
                        </TableCell1em>
                      );
                    }

                    if (column.id === "acciones") {
                      return (
                        <TableCell1em
                          key={column.id}
                          align={column.align}
                          component="th"
                          scope="row"
                        >
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <BotonAcciones
                              nombre={row.Catedra}
                              idcatedra={row.IdCatedra}
                              catedra={row.Catedra}
                              refrescar={props.refrescar}
                              abrir={props.abrir}
                              mensaje={props.mensaje}
                              tipo={props.tipo}
                            />
                          )}
                        </TableCell1em>
                      );
                    }
                  })}
                </TableRowElevacion>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Paginación */}
      <Grid
        justifyContent="space-between"
        container
        pt={2.2}
        paddingX={2}
        sx={{ justifyContent: { xs: "center", md: "space-between" }, gap: 2.5 }}
      >
        <Grid item>
          <Stack spacing={2}>
            <PaginationCustom
              defaultPage={1}
              count={props.paginacion}
              page={props.pagina}
              onChange={(e, page) => CambiarPagina(e, page)}
            />
          </Stack>
        </Grid>

        <Grid item>
          <Box display="flex" textAlign="end" alignItems="center" gap={4}>
            <Box display="flex" textAlign="end" alignItems="center">
              <Typography
                variant="text"
                sx={{
                  color: "text.subtitle1secondary",
                  marginRight: 1,
                  // fontSize: "",
                }}
              >
                Filas por página:
              </Typography>
              {
                <FilasPorPagina
                  actualizarfilas={props.actualizarfilas}
                  fpp={props.filasxpagina}
                />
              }
            </Box>

            <Box>
              <Typography
                variant="text"
                sx={{ color: "text.subtitle1secondary", marginRight: 1 }}
              >
                Resultados:
              </Typography>
              {props.resultados}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
