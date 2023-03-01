import * as React from "react";
//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createTheme } from "@mui/material/styles";
import { esES } from "@mui/material/locale";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Stack from "@mui/material/Stack";
import { Box, Chip, Grid, Typography } from "@mui/material";
//
import FilasPorPagina from "../GestionCatedrasSuper/FilasPorPagina";
import {
  TableCellHead,
  TableRowElevacion,
} from "../Material UI - Componentes Modificados/ComponentesTabla";
import { TableCell1em } from "../Material UI - Componentes Modificados/ComponentesTabla";
import PaginationCustom from "../Material UI - Componentes Modificados/ComponentePaginacion/PaginationCustom";
import { ChipCustom } from "../Material UI - Componentes Modificados/ChipCustom";
import { BotonAcciones } from "./BotonAcciones";
import { BotonEstado } from "./BotonEstado.js";

const columns = [
  {
    id: "Examen",
    label: "Examen",
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
    id: "Tipo",
    label: "Tipo",
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

/*** Componente ExamenesLista***/
export default function ExamenesLista(props) {
  function Tipo(param) {
    if (param === "P") return "Parcial";
    if (param === "Q") return "Quiz";
    if (param === "F") return "Final";
  }

  function TipoChip(param) {
    if (param === "P") return "info";
    if (param === "Q") return "warning";
    if (param === "F") return "success";
  }

  function CambiarPagina(e, page) {
    props.actualizarpagina(page);
  }

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  return (
    <>
      <TableContainer sx={{ maxHeight: "none" }}>
        <Table aria-label="Lista de examenes" size="small">
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
                    if (column.id === "Examen") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell1em>
                      );
                    }

                    if (column.id === "Orden") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell1em>
                      );
                    }

                    if (column.id === "Tipo") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <Chip
                              variant="outlined"
                              color={TipoChip(value)}
                              label={Tipo(value)}
                            />
                          )}
                        </TableCell1em>
                      );
                    }

                    if (column.id === "FechaVencimiento") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
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
                        </TableCell1em>
                      );
                    }

                    if (column.id === "NotaMinimaAprobacion") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell1em>
                      );
                    }

                    if (column.id === "Estado") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          <BotonEstado
                            estado={row.Estado}
                            idexamen={row.IdExamen}
                            cursada={props.cursada}
                          />
                        </TableCell1em>
                      );
                    }

                    if (column.id === "acciones") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <BotonAcciones
                              refrescar={props.refrescar}
                              abrir={props.abrir}
                              mensaje={props.mensaje}
                              tipo={props.tipo}
                              examen={row}
                              cursada={props.cursada}
                              parametros={props.parametros}
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
