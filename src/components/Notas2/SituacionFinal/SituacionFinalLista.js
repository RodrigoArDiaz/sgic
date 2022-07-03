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
import BotonEstados from "./BotonEstados.js";
import BotonNC from "./BotonNC.js";
import { BotonAsistencia } from "./BotonAsistencia.js";
import { BotonNFL } from "./BotonNFL.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import FilasPorPagina from "../../GestionCatedrasSuper/FilasPorPagina";

export default function StickyHeadTable(props) {
  var columns = [
    {
      id: "Nombres",
      label: "Nombres",
      minWidth: 20,
      align: "left",
      idp: 0,
    },

    {
      id: "Apellidos",
      label: "Apellidos",
      minWidth: 20,
      align: "left",
      idp: 0,
    },

    {
      id: "Libreta",
      label: "Libreta",
      minWidth: 20,
      idp: 0,
    },
  ];

  var columns2 = [
    {
      id: "Asistencia",
      label: "Asistencia",
      minWidth: 20,
      align: "left",
      idp: 0,
    },

    {
      id: "NotaFinal",
      label: "Nota",
      minWidth: 20,
      align: "left",
      idp: 0,
    },

    {
      id: "NotaFinalLibreta",
      label: "Nota Libreta",
      minWidth: 20,
      idp: 0,
    },

    {
      id: "Estado",
      label: "Estado",
      minWidth: 20,
      idp: 0,
    },
  ];

  if (props.filas.res2.length > 0) {
    var nuevo = props.filas.res2.map((row) => ({
      id: row.Tipo,
      label: row.Mensaje,
      minWidth: 20,
      align: "center",
    }));

    for (let i = 0; i < nuevo.length; i++) {
      columns.push(nuevo[i]);
    }

    for (let i = 0; i < columns2.length; i++) {
      columns.push(columns2[i]);
    }
  }

  function CambiarPagina(e, page) {
    props.actualizarpagina(page);
  }

  const theme = createTheme(esES);

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.Error !== undefined)
    return <h4>{props.filas.res.Error}</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "none" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  );
                })}
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
                      } else if (column.id === "Nombres") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      } else if (column.id === "Libreta") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      } else if (column.id === "NCEQ") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              <BotonNC
                                Nota={row.NCEQ}
                                Cond={row.CumpleReqExQ}
                              />
                            )}
                          </TableCell>
                        );
                      } else if (column.id === "NCEF") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              <BotonNC
                                Nota={row.NCEF}
                                Cond={row.CumpleReqExF}
                              />
                            )}
                          </TableCell>
                        );
                      } else if (column.id === "NCEP") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              <BotonNC
                                Nota={row.NCEP}
                                Cond={row.CumpleReqExP}
                              />
                            )}
                          </TableCell>
                        );
                      } else if (column.id === "NCPRA") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              <BotonNC
                                Nota={row.NCPRA}
                                Cond={row.CumpleReqPra}
                              />
                            )}
                          </TableCell>
                        );
                      } else if (column.id === "Asistencia") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              <BotonAsistencia
                                asistencia={row.Asistencia}
                                cursada={props.cursada}
                                pidUs={row.IdUsuario}
                              />
                            )}
                          </TableCell>
                        );
                      } else if (column.id === "NotaFinal") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              <BotonNC Nota={row.NotaFinal} />
                            )}
                          </TableCell>
                        );
                      } else if (column.id === "NotaFinalLibreta") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              <BotonNFL
                                Nota={row.NotaFinalLibreta}
                                pidUs={row.IdUsuario}
                                cursada={props.cursada}
                                Cond1={row.CumpleReqExF}
                                Cond2={row.CumpleReqExQ}
                                Cond3={row.CumpleReqExP}
                                Cond4={row.CumpleReqPra}
                                abrir={props.abrir}
                                mensaje={props.mensaje}
                                tipo={props.tipo}
                              />
                            )}
                          </TableCell>
                        );
                      } else if (column.id === "Estado") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              <BotonEstados
                                estado={row.Estado}
                                pidUs={row.IdUsuario}
                                cursada={props.cursada}
                                abrir={props.abrir}
                                mensaje={props.mensaje}
                                tipo={props.tipo}
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
