import * as React from "react";
//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { createTheme } from "@mui/material/styles";
import { esES } from "@mui/material/locale";
import { BotonAcciones } from "./BotonAcciones";
import { BotonEstado } from "./BotonEstado.js";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Stack from "@mui/material/Stack";
import { Box, Grid, Typography } from "@mui/material";
// import FilasPorPagina from "../Catedras/FilasPorPagina";
import FilasPorPagina from "../GestionCatedrasSuper/FilasPorPagina";
import {
  TableCellHead,
  TableRowElevacion,
  TableRowHead,
} from "../Material UI - Componentes Modificados/ComponentesTabla";
import PaginationCustom from "../Material UI - Componentes Modificados/ComponentePaginacion/PaginationCustom";
import { ChipCustom } from "../Material UI - Componentes Modificados/ChipCustom";

//Estilos para filas de la tabla
const estilosCell = { fontSize: "1em" };

const columns = [
  {
    id: "Practico",
    label: "Practico",
    minWidth: 20,
    align: "left",
  },

  {
    id: "Orden",
    label: "Orden",
    minWidth: 20,
    align: "center",
  },

  {
    id: "FechaAlta",
    label: "Dictado",
    minWidth: 20,
    align: "center",
  },

  {
    id: "FechaVencimiento",
    label: "Vencimiento",
    minWidth: 20,
    align: "center",
  },

  {
    id: "NotaMinimaAprobacion",
    label: "Nota Mínima",
    minWidth: 20,
    align: "center",
  },

  {
    id: "Estado",
    label: "Estado",
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

/*** Componente PracticoLista ***/
export default function PracticoLista(props) {
  function CambiarPagina(e, page) {
    props.actualizarpagina(page);
  }

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  return (
    <>
      <TableContainer sx={{ maxHeight: "none" }}>
        <Table aria-label="Lista de practicos" size="small">
          <TableHead sx={{ backgroundColor: "icons.bg" }}>
            <TableRowHead>
              {columns.map((column) => (
                <TableCellHead
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCellHead>
              ))}
            </TableRowHead>
          </TableHead>
          <TableBody>
            {props.filas.res.map((row) => {
              return (
                <TableRowElevacion key={row.IdCatedra}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === "Practico") {
                      return (
                        <TableCell
                          key={column.id}
                          sx={estilosCell}
                          align={column.align}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    }

                    if (column.id === "Orden") {
                      return (
                        <TableCell
                          key={column.id}
                          sx={estilosCell}
                          align={column.align}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    }

                    if (column.id === "FechaAlta") {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={estilosCell}
                        >
                          {/* {column.format && typeof value === "number"
                            ? column.format(value)
                            : value} */}

                          {/* Compruebo si es fecha */}
                          {!value || value.split("-").length < 3 ? (
                            <ChipCustom
                              size="large"
                              // icon={<CalendarTodayIcon fontSize="small" />}
                              label="-"
                              sx={{
                                "& .MuiChip-label": {
                                  fontSize: "1.17em",
                                },
                              }}
                            />
                          ) : (
                            <ChipCustom
                              size="large"
                              icon={<CalendarTodayIcon fontSize="small" />}
                              label={value}
                              sx={{
                                "& .MuiChip-label": {
                                  fontSize: "1.17em",
                                },
                              }}
                            />
                          )}
                        </TableCell>
                      );
                    }

                    if (column.id === "FechaVencimiento") {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={estilosCell}
                        >
                          {/* {column.format && typeof value === "number"
                            ? column.format(value)
                            : value} */}

                          {!value || value.split("-").length < 3 ? (
                            <ChipCustom
                              size="large"
                              // icon={<CalendarTodayIcon fontSize="small" />}
                              label="-"
                              sx={{
                                "& .MuiChip-label": {
                                  fontSize: "1.17em",
                                },
                              }}
                            />
                          ) : (
                            <ChipCustom
                              size="large"
                              icon={<CalendarTodayIcon fontSize="small" />}
                              label={value}
                              sx={{
                                "& .MuiChip-label": {
                                  fontSize: "1.17em",
                                },
                              }}
                            />
                          )}
                        </TableCell>
                      );
                    }

                    if (column.id === "NotaMinimaAprobacion") {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={estilosCell}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    }

                    if (column.id === "Estado") {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={estilosCell}
                        >
                          <BotonEstado
                            estado={row.Estado}
                            idpractico={row.IdPractico}
                            cursada={props.cursada}
                          />
                        </TableCell>
                      );
                    }

                    if (column.id === "acciones") {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={estilosCell}
                        >
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <BotonAcciones
                              refrescar={props.refrescar}
                              abrir={props.abrir}
                              mensaje={props.mensaje}
                              tipo={props.tipo}
                              practico={row}
                              cursada={props.cursada}
                            />
                          )}
                        </TableCell>
                      );
                    }
                  })}
                </TableRowElevacion>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginacion */}

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
