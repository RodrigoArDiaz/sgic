import * as React from "react";
//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import { Box, Grid, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
//
import { BotonAcciones } from "./BotonAcciones";
import { BotonEstado } from "./BotonEstado.js";
import { BotonGrupo } from "./BotonGrupo.js";
import { BotonPrograma } from "./BotonPrograma.js";
import { BotonTipo } from "./BotonTipo.js";
import FilasPorPagina from "./FilasPorPagina";
import { TableRowElevacion } from "../Material UI - Componentes Modificados/ComponentesTabla";
import PaginationCustom from "../Material UI - Componentes Modificados/ComponentePaginacion/PaginationCustom";
import { ChipCustom } from "../Material UI - Componentes Modificados/ChipCustom";

//Estilos para filas de la tabla
const estilosCell = { fontSize: "1em" };

//Datos columna tabla
const columns = [
  {
    id: "Anio",
    label: "Año",
    minWidth: 20,
    align: "center",
  },

  {
    id: "Semestre",
    label: "Semestre",
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
    id: "FechaInicio",
    label: "Inicio",
    minWidth: 20,
    align: "center",
  },

  {
    id: "FechaFin",
    label: "Fin",
    minWidth: 20,
    align: "center",
  },

  {
    id: "Programa",
    label: "Programa",
    minWidth: 20,
    align: "center",
  },
  {
    id: "TieneGrupos",
    label: "Grupos",
    minWidth: 20,
    align: "center",
  },

  {
    id: "MaximoIntGrupos",
    label: "Máximo integrantes",
    minWidth: 20,
    align: "center",
  },

  {
    id: "CalculoPracticos",
    label: "Tipo",
    minWidth: 20,
    align: "center",
  },

  {
    id: "EscalaPracticos",
    label: "Escala",
    minWidth: 20,
    align: "center",
  },

  {
    id: "PorcentajeNotaTotalPracticos",
    label: "%/Total",
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

/*** Componente CursadaLista ***/
export default function CursadaLista(props) {
  function CambiarPagina(e, page) {
    props.actualizarpagina(page);
  }

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  return (
    <>
      {/* Tabla  */}
      <TableContainer sx={{ maxHeight: "none" }}>
        <Table aria-label="Lista de cursadas" size="small">
          <TableHead sx={{ backgroundColor: "icons.bg" }}>
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
                <TableRowElevacion key={row.IdCatedra}>
                  {columns.map((column) => {
                    const value = row[column.id];

                    if (column.id === "acciones") {
                      return (
                        <TableCell
                          key={column.id}
                          sx={estilosCell}
                          align={column.align}
                        >
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <BotonAcciones
                              anio={row.Anio}
                              idcursada={row.IdCursada}
                              semestre={row.Semestre}
                              Materia={props.Materia}
                              idmateria={props.idmateria}
                              refrescar={props.refrescar}
                              abrir={props.abrir}
                              mensaje={props.mensaje}
                              tipo={props.tipo}
                              cursada={row}
                            />
                          )}
                        </TableCell>
                      );
                    }

                    if (column.id === "Estado") {
                      return (
                        <TableCell
                          key={column.id}
                          sx={estilosCell}
                          align={column.align}
                        >
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <BotonEstado
                              estado={row.Estado}
                              idcursada={row.IdCursada}
                            />
                          )}
                        </TableCell>
                      );
                    }

                    if (column.id === "Programa") {
                      return (
                        <TableCell
                          key={column.id}
                          sx={estilosCell}
                          align={column.align}
                        >
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <BotonPrograma programa={row.Programa} />
                          )}
                        </TableCell>
                      );
                    }

                    if (column.id === "TieneGrupos") {
                      return (
                        <TableCell
                          key={column.id}
                          sx={estilosCell}
                          align={column.align}
                        >
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <BotonGrupo grupos={row.TieneGrupos} />
                          )}
                        </TableCell>
                      );
                    }

                    if (column.id === "MaximoIntGrupos") {
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

                    if (column.id === "CalculoPracticos") {
                      return (
                        <TableCell
                          key={column.id}
                          sx={estilosCell}
                          align={column.align}
                        >
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <BotonTipo tipo={row.CalculoPracticos} />
                          )}
                        </TableCell>
                      );
                    }

                    if (column.id === "Anio" || column.id === "Semestre") {
                      return (
                        <TableCell
                          key={column.id}
                          sx={estilosCell}
                          align={column.align}
                        >
                          {value && (
                            <ChipCustom
                              size="large"
                              label={value}
                              sx={{
                                "& .MuiChip-label": {
                                  fontSize: "4em",
                                },
                              }}
                            />
                          )}
                        </TableCell>
                      );
                    }

                    if (
                      column.id === "FechaInicio" ||
                      column.id === "FechaFin"
                    ) {
                      return (
                        <TableCell
                          key={column.id}
                          sx={estilosCell}
                          align={column.align}
                        >
                          {!value || value.split("-").length < 3 ? (
                            <ChipCustom
                              size="large"
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

                    if (
                      column.id === "EscalaPracticos" ||
                      column.id === "PorcentajeNotaTotalPracticos" ||
                      column.id === "MaximoIntGrupos"
                    ) {
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
                sx={{ color: "text.subtitle1secondary", marginRight: 1 }}
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
