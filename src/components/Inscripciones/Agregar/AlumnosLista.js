import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { esES } from "@mui/material/locale";
import { BotonAcciones } from "./BotonAcciones";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
// import  FilasPorPagina  from '../../Catedras/FilasPorPagina';
import FilasPorPagina from "../../GestionCatedrasSuper/FilasPorPagina";

const columns = [
  {
    id: "Apellidos",
    label: "Apellidos",
    minWidth: 20,
    align: "left",
  },

  {
    id: "Nombres",
    label: "Nombres",
    minWidth: 20,
    align: "left",
  },

  {
    id: "Libreta",
    label: "Libreta",
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
    id: "Email",
    label: "Correo",
    minWidth: 20,
    align: "left",
  },

  {
    id: "acciones",
    label: "Acciones",
    minWidth: 20,
    align: "center",
  },
];

export default function StickyHeadTable(props) {
  function CambiarPagina(e, page) {
    props.actualizarpagina(page);
  }

  const theme = createTheme(esES);

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
              {props.filas.res.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.IdCatedra}
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

                      if (column.id === "Libreta") {
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
                              <BotonAcciones
                                refrescar={props.refrescar}
                                abrir={props.abrir}
                                mensaje={props.mensaje}
                                tipo={props.tipo}
                                alumno={row}
                                cursada={props.cursada}
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
        <Grid justifyContent="flex-start" container pt={2}>
          <Grid item xs={6} sx={{ mt: 1 }}>
            <Stack spacing={2}>
              <Pagination
                variant="outlined"
                defaultPage={1}
                count={props.paginacion}
                page={props.pagina}
                onChange={(e, page) => CambiarPagina(e, page)}
              />
            </Stack>
          </Grid>

          <Grid item xs={3} sx={{ mt: 1 }}>
            Filas por página:{" "}
            {
              <FilasPorPagina
                actualizarfilas={props.actualizarfilas}
                fpp={props.filasxpagina}
              />
            }
          </Grid>

          <Grid item xs={3} sx={{ mt: 1 }}>
            Resultados: {props.resultados}
          </Grid>
        </Grid>
        <Grid justifyContent="center" container pt={2} />
      </Paper>
    </ThemeProvider>
  );
}
