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
import { BotonNota } from "./BotonNota";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import FilasPorPagina from "../GestionCatedrasSuper/FilasPorPagina";
import ECContenedorPracticos from "./EnCorPracticos/ECContenedorPracticos";
import Row from "./Row";

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
      id: "Grupo",
      label: "Grupo",
      minWidth: 20,
      align: "left",
      idp: 0,
    },
  ];

  if (props.filas.res2.length > 0) {
    var nuevo = props.filas.res2.map((row) => ({
      id: "TP" + row.Orden,
      label: "TP" + row.Orden,
      minWidth: 20,
      align: "center",
      idp: row.IdPractico,
      NMA: row.NotaMinimaAprobacion,
    }));

    for (let i = 0; i < nuevo.length; i++) {
      columns.push(nuevo[i]);
    }
  }

  if (props.filas.res2.length > 0) {
    var nuevo2 = props.filas.res2.map((row) => ({
      id: "TP" + row.Orden,
      label: "TP" + row.Orden,
      minWidth: 20,
      align: "center",
      idp: row.IdPractico,
      NMA: row.NotaMinimaAprobacion,
    }));

    for (let i = 0; i < nuevo2.length; i++) {
      columns2.push(nuevo2[i]);
    }
  }

  function CambiarPagina(e, page) {
    props.actualizarpagina(page);
  }

  const theme = createTheme(esES);

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  if (props.cursada.TieneGrupos === "N") {
    return (
      <ThemeProvider theme={theme}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: "none" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => {
                    if (
                      column.id === "Apellidos" ||
                      column.id === "Nombres" ||
                      column.id === "Libreta"
                    ) {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ width: column.minWidth }}
                        >
                          <ECContenedorPracticos
                            nombre={column.label}
                            IdPractico={column.idp}
                            cursada={props.cursada}
                            Nombre={column.label}
                          />
                        </TableCell>
                      );
                    }
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
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number" ? (
                                column.format(value)
                              ) : (
                                <BotonNota
                                  cursada={props.cursada}
                                  Nota={value}
                                  IdUsuario={row.IdUsuario}
                                  IdPractico={column.idp}
                                  abrir={props.abrir}
                                  mensaje={props.mensaje}
                                  tipo={props.tipo}
                                  NMA={column.NMA}
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

  if (props.cursada.TieneGrupos === "S") {
    return (
      <ThemeProvider theme={theme}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: "none" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  {columns2.map((column) => {
                    if (column.id === "Grupo") {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ width: column.minWidth }}
                        >
                          <ECContenedorPracticos
                            nombre={column.label}
                            IdPractico={column.idp}
                            cursada={props.cursada}
                            Nombre={column.label}
                          />
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.filas.res.map((row) => {
                  return (
                    <Row
                      res={row}
                      res2={columns2}
                      cursada={props.cursada}
                      IdGrupo={row.IdGrupo}
                      abrir={props.abrir}
                      mensaje={props.mensaje}
                      tipo={props.tipo}
                    />
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
}
