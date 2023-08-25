import * as React from "react";
//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import { Box, Grid, Typography } from "@mui/material";
//
import { BotonAcciones } from "./BotonAcciones";
import { BotonEstado } from "./BotonEstado.js";
import {
  ContentCellDestacable,
  TableCell1em,
  TableCell1emPaddingXReducido,
  TableCell1emPaddingXReducidoOverFocus,
  TableCellHead,
  TableRowElevacion,
} from "../Material UI - Componentes Modificados/ComponentesTabla";
import FilasPorPagina from "../GestionCatedrasSuper/FilasPorPagina";
import MensajeFeedback from "../MensajeFeedback";
import CopiarButton from "../CopiarButton";
import AvatarCustom from "../Material UI - Componentes Modificados/AvatarCustom";
import PaginationCustom from "../Material UI - Componentes Modificados/ComponentePaginacion/PaginationCustom";

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
    //format: (value) => value.toFixed(2),
  },

  {
    id: "Nombres",
    label: "Nombres",
    minWidth: 20,
    align: "left",
    //format: (value) => value.toFixed(2),
  },

  {
    id: "Libreta",
    label: "Libreta",
    minWidth: 20,
    align: "left",
    //format: (value) => value.toFixed(2),
  },

  {
    id: "Documento",
    label: "Documento",
    minWidth: 20,
    align: "left",
    //format: (value) => value.toFixed(2),
  },

  {
    id: "Email",
    label: "Email",
    minWidth: 20,
    align: "left",
    //format: (value) => value.toFixed(2),
  },

  {
    id: "Usuario",
    label: "Usuario",
    minWidth: 20,
    align: "left",
    //format: (value) => value.toFixed(2),
  },

  {
    id: "Estado",
    label: "Estado",
    minWidth: 20,
    align: "center",
    //format: (value) => value.toFixed(2),
  },

  {
    id: "acciones",
    label: "Acciones",
    minWidth: 20,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
];

//Estilos para filas de la tabla
const estilosCell = { fontSize: "1em" };

/*** Componente AlumnoLista ***/
export default function AlumnoLista(props) {
  function CambiarPagina(e, page) {
    props.actualizarpagina(page);
  }

  if (props.filas.res === undefined)
    return (
      <Grid container>
        <MensajeFeedback tipo="error">Error fatal.</MensajeFeedback>
      </Grid>
    );

  if (props.filas.res.length < 1)
    return (
      <Grid container paddingX={2}>
        <MensajeFeedback>No se encontraron resultados.</MensajeFeedback>
      </Grid>
    );

  return (
    <>
      <TableContainer sx={{ overflowX: "auto", maxHeight: "none" }}>
        <Table aria-label="Lista de Catedras" size="small">
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
                        <TableCell1em
                          key={column.id}
                          align={column.align}
                          // sx={estilosCell}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell1em>
                      );
                    }

                    if (column.id === "Nombres") {
                      return (
                        <TableCell1em
                          key={column.id}
                          align={column.align}
                          sx={estilosCell}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell1em>
                      );
                    }

                    if (column.id === "Libreta") {
                      return (
                        <TableCell1em
                          key={column.id}
                          align={column.align}
                          sx={estilosCell}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell1em>
                      );
                    }

                    if (column.id === "Documento") {
                      return (
                        <TableCell1em
                          key={column.id}
                          align={column.align}
                          sx={estilosCell}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell1em>
                      );
                    }

                    if (column.id === "Email") {
                      return (
                        <TableCell1emPaddingXReducidoOverFocus
                          key={column.id}
                          align={column.align}
                          sx={estilosCell}
                        >
                          <ContentCellDestacable>
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
                          </ContentCellDestacable>
                        </TableCell1emPaddingXReducidoOverFocus>
                      );
                    }

                    if (column.id === "Usuario") {
                      return (
                        <TableCell1emPaddingXReducido
                          key={column.id}
                          align={column.align}
                          sx={estilosCell}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell1emPaddingXReducido>
                      );
                    }

                    if (column.id === "Estado") {
                      return (
                        <TableCell1emPaddingXReducido
                          key={column.id}
                          align={column.align}
                          sx={estilosCell}
                        >
                          <BotonEstado estado={row.Estado} alumno={row} />
                        </TableCell1emPaddingXReducido>
                      );
                    }

                    if (column.id === "acciones") {
                      return (
                        <TableCell1emPaddingXReducido
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
                              alumno={row}
                            />
                          )}
                        </TableCell1emPaddingXReducido>
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
