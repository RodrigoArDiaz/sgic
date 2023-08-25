import * as React from "react";
//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Inscribir } from "./Inscribir";
import Stack from "@mui/material/Stack";
import { Box, Grid, Typography } from "@mui/material";
//
import FilasPorPagina from "../../GestionCatedrasSuper/FilasPorPagina";
import { TableCellHead } from "../../Material UI - Componentes Modificados/ComponentesTabla";
import PaginationCustom from "../../Material UI - Componentes Modificados/ComponentePaginacion/PaginationCustom";

//Datos tabla
const columns = [
  {
    id: "Apellidos",
    label: "Apellido/s",
    minWidth: 20,
    align: "left",
  },

  {
    id: "Nombres",
    label: "Nombre/s",
    minWidth: 20,
    align: "left",
  },

  {
    id: "Documento",
    label: "Documento",
    minWidth: 20,
    align: "left",
  },

  {
    id: "Libreta",
    label: "Libreta",
    minWidth: 20,
    align: "center",
  },

  {
    id: "Email",
    label: "Correo",
    minWidth: 20,
    align: "center",
  },

  {
    id: "acciones",
    label: "Acciones",
    minWidth: 20,
    align: "center",
  },
];

/*** Componente InscripcionesContenedor***/
export default function IntegrantesLista(props) {
  function CambiarPagina(e, page) {
    props.actualizarpagina(page);
  }

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  return (
    <>
      <TableContainer sx={{ maxHeight: "none" }}>
        <Table stickyHeader aria-label="Lista de integrantes" size="small">
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
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.IdUsuario}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === "Apellidos") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    }

                    if (column.id === "Nombres") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    }

                    if (column.id === "Documento") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    }

                    if (column.id === "Libreta") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    }

                    if (column.id === "Email") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    }
                    if (column.id === "acciones") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <Inscribir
                              refrescar={props.refrescar}
                              abrir={props.abrir}
                              mensaje={props.mensaje}
                              tipo={props.tipo}
                              grupo={props.grupo}
                              cursada={props.cursada}
                              alumno={row}
                            />
                          )}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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
