import * as React from "react";
//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { BotonAcciones } from "./BotonAcciones";
import { BotonISW } from "./BotonISW";
import { BotonIS } from "./BotonIS";
import Stack from "@mui/material/Stack";
import { Box, Grid, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
//
import FilasPorPagina from "../GestionCatedrasSuper/FilasPorPagina";
import {
  TableCell1em,
  TableCellHead,
  TableRowElevacion,
} from "../Material UI - Componentes Modificados/ComponentesTabla";
import PaginationCustom from "../Material UI - Componentes Modificados/ComponentePaginacion/PaginationCustom";
import { ChipCustom } from "../Material UI - Componentes Modificados/ChipCustom";
import AvatarCustom from "../Material UI - Componentes Modificados/AvatarCustom";
import CopiarButton from "../CopiarButton";

//Datos columna tabla
const columns = [
  {
    id: "#",
    label: "",
    minWidth: 10,
    align: "center",
  },
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
    align: "center",
  },

  {
    id: "Libreta",
    label: "Libreta",
    minWidth: 20,
    align: "center",
  },

  {
    id: "Documento",
    label: "Documento",
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
    id: "FechaInscripcion",
    label: "Inscripción",
    minWidth: 20,
    align: "center",
  },

  {
    id: "EstaInscriptoSitioWeb",
    label: "Inscripto En Web",
    minWidth: 20,
    align: "center",
  },

  {
    id: "EstaInscriptoSIU",
    label: "Inscripto En SIU",
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

/*** Componente AlumnosLista ***/
export default function AlumnosLista(props) {
  function CambiarPagina(e, page) {
    props.actualizarpagina(page);
  }

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  return (
    <>
      <TableContainer sx={{ maxHeight: "none" }}>
        <Table aria-label="Lista de inscriptos" size="small">
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

                    if (column.id === "#") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          <Box display="flex" gap={1} alignItems="center">
                            <AvatarCustom
                              // value={value}
                              valueOne={row["Apellidos"]}
                              valueTwo={row["Nombres"]}
                              outlined={true}
                              // defineColor={randomColor()}
                            />
                          </Box>
                        </TableCell1em>
                      );
                    }

                    if (column.id === "Apellidos") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          <Box display="flex" gap={1} alignItems="center">
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </Box>
                        </TableCell1em>
                      );
                    }

                    if (column.id === "Nombres") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell1em>
                      );
                    }

                    if (column.id === "Libreta") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell1em>
                      );
                    }

                    if (column.id === "Documento") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell1em>
                      );
                    }

                    if (column.id === "Email") {
                      return (
                        <TableCell1em key={column.id} align="left">
                          <CopiarButton
                            textoCopiar={
                              column.format && typeof value === "number"
                                ? column.format(value)
                                : value
                            }
                          />
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell1em>
                      );
                    }

                    if (column.id === "FechaInscripcion") {
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

                    if (column.id === "EstaInscriptoSitioWeb") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <BotonISW
                              refrescar={props.refrescar}
                              abrir={props.abrir}
                              mensaje={props.mensaje}
                              tipo={props.tipo}
                              alumno={row}
                              cursada={props.cursada}
                              inscripto={value}
                              SIU={row["EstaInscriptoSIU"]}
                            />
                          )}
                        </TableCell1em>
                      );
                    }

                    if (column.id === "EstaInscriptoSIU") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <BotonIS
                              refrescar={props.refrescar}
                              abrir={props.abrir}
                              mensaje={props.mensaje}
                              tipo={props.tipo}
                              alumno={row}
                              cursada={props.cursada}
                              inscripto={value}
                              SW={row["EstaInscriptoSitioWeb"]}
                            />
                          )}
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
                              alumno={row}
                              cursada={props.cursada}
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
