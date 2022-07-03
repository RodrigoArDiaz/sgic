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
import { BotonAcciones } from "./BotonAcciones";
import { BotonISW } from "./BotonISW";
import { BotonIS } from "./BotonIS";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";

// import  FilasPorPagina  from '../Catedras/FilasPorPagina';
import FilasPorPagina from "../GestionCatedrasSuper/FilasPorPagina";
import {
  TableCell1em,
  TableRowElevacion,
} from "../Material UI - Componentes Modificados/ComponentesTabla";
import { estilosBotonNavegacion } from "../../styles/EstilosPaginacion";

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

export default function AlumnosLista(props) {
  function CambiarPagina(e, page) {
    props.actualizarpagina(page);
  }

  const theme = createTheme(esES);

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  return (
    <>
      <TableContainer sx={{ maxHeight: "none" }}>
        <Table
          aria-label="Lista de inscriptos"
          sx={{ mb: "1rem" }}
          size="small"
        >
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
                <TableRowElevacion key={row.IdCatedra}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === "Apellidos") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
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
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell1em>
                      );
                    }

                    if (column.id === "FechaInscripcion") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
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
      <Grid justifyContent="flex-start" container pt={2}>
        <Grid item xs={6} sx={{ mt: 1 }}>
          <Stack spacing={2}>
            <Pagination
              size="large"
              color="info"
              sx={{ "& .MuiPagination-ul": { gap: "0.5rem" } }}
              variant="outlined"
              defaultPage={1}
              count={props.paginacion}
              page={props.pagina}
              onChange={(e, page) => CambiarPagina(e, page)}
            />
          </Stack>
        </Grid>

        <Grid
          item
          xs={2}
          sx={estilosBotonNavegacion}
          textAlign="end"
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={1}
          paddingY={1}
        >
          Filas por página:{" "}
          {
            <FilasPorPagina
              actualizarfilas={props.actualizarfilas}
              fpp={props.filasxpagina}
            />
          }
        </Grid>

        <Grid
          item
          xs={2}
          sx={estilosBotonNavegacion}
          textAlign="end"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="end"
        >
          Resultados: {props.resultados}
        </Grid>
      </Grid>
    </>
  );
}
