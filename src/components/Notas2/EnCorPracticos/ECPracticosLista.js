import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { esES } from "@mui/material/locale";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box, Grid, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import FilasPorPagina from "../../GestionCatedrasSuper/FilasPorPagina";
import ECVisual from "./ECVisual";
import { BotonAC } from "./BotonAC";
import {
  TableCell1em,
  TableCellHead,
} from "../../Material UI - Componentes Modificados/ComponentesTabla";
import PaginationCustom from "../../Material UI - Componentes Modificados/ComponentePaginacion/PaginationCustom";
import MensajeFeedback from "../../MensajeFeedback";

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

    {
      id: "Enunciado",
      label: "Enunciado",
      minWidth: 200,
      align: "center",
    },
    {
      id: "Correcciones",
      label: "Correcciones",
      minWidth: 200,
      align: "center",
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

    {
      id: "Enunciado",
      label: "Enunciado",
      minWidth: 200,
      align: "center",
    },

    {
      id: "Correcciones",
      label: "Correcciones",
      minWidth: 200,
      align: "center",
    },
  ];

  function CambiarPagina(e, page) {
    props.actualizarpagina(page);
  }

  const theme = createTheme(esES);

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1)
    return <MensajeFeedback>No se encontraron resultados.</MensajeFeedback>;

  //Cursada sin grupos
  if (props.cursada.TieneGrupos === "N") {
    return (
      <>
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
                      } else if (column.id === "Enunciado") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {
                              <BotonAC
                                param1={props.enc}
                                param2={props.cor}
                                tipo={column.id}
                                IdCursadaPractico={row.IdCursadaPractico}
                                enunciado={row.Enunciado}
                                correcciones={row.Correcciones}
                                abrir={props.abrir}
                                mensaje={props.mensaje}
                                tipo2={props.tipo}
                              />
                            }
                          </TableCell>
                        );
                      } else if (column.id === "Correcciones") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {
                              <BotonAC
                                param1={props.enc}
                                param2={props.cor}
                                tipo={column.id}
                                IdCursadaPractico={row.IdCursadaPractico}
                                enunciado={row.Enunciado}
                                correcciones={row.Correcciones}
                                abrir={props.abrir}
                                mensaje={props.mensaje}
                                tipo2={props.tipo}
                              />
                            }
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
      </>
    );
  }

  //Cursada con grupos
  if (props.cursada.TieneGrupos === "S") {
    return (
      <>
        <TableContainer sx={{ maxHeight: "none" }}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                {columns2.map((column) => {
                  return (
                    <TableCellHead
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCellHead>
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
                    key={row.IdGrupo}
                  >
                    {columns2.map((column) => {
                      const value = row[column.id];

                      if (column.id === "Grupo") {
                        return (
                          <TableCell1em key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell1em>
                        );
                      } else if (column.id === "Enunciado") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <BotonAC
                              param1={props.enc}
                              param2={props.cor}
                              tipo={column.id}
                              IdCursadaPractico={row.IdCursadaPractico}
                              enunciado={row.Enunciado}
                              correcciones={row.Correcciones}
                              abrir={props.abrir}
                              mensaje={props.mensaje}
                              tipo2={props.tipo}
                              //
                              key={column.id}
                              align={column.align}
                              cursada={props.cursada}
                            />
                          </TableCell>
                        );
                      } else if (column.id === "Correcciones") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {
                              <BotonAC
                                param1={props.enc}
                                param2={props.cor}
                                tipo={column.id}
                                IdCursadaPractico={row.IdCursadaPractico}
                                enunciado={row.Enunciado}
                                correcciones={row.Correcciones}
                                abrir={props.abrir}
                                mensaje={props.mensaje}
                                tipo2={props.tipo}
                                cursada={props.cursada}
                              />
                            }
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

        {/* Paginación */}
        <Grid
          justifyContent="space-between"
          container
          pt={2.2}
          paddingX={2}
          sx={{
            justifyContent: { xs: "center", md: "space-between" },
            gap: 2.5,
          }}
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
}
