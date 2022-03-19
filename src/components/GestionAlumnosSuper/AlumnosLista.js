import * as React from "react";
//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createTheme } from "@mui/material/styles";
import { esES } from "@mui/material/locale";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box, Grid } from "@mui/material";
//
import { BotonAcciones } from "./BotonAcciones";
import { BotonEstado } from "./BotonEstado.js";
import { TableRowElevacion } from "../Material UI - Componentes Modificados/ComponentesTabla";
import FilasPorPagina from "../GestionCatedrasSuper/FilasPorPagina";
import MensajeFeedback from "../MensajeFeedback";

const columns = [
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
    label: "Correo",
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

export default function StickyHeadTable(props) {
  function CambiarPagina(e, page) {
    //console.log(page);
    props.actualizarpagina(page);
  }

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (props.filas.res === undefined)
    return (
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          border: "1px solid",
          borderColor: "secondary.light100",
          textAlign: "center",
          paddingX: "1rem",
        }}
      >
        <Grid container>
          <MensajeFeedback tipo="error">Error fatal.</MensajeFeedback>
        </Grid>
      </Box>
    );

  if (props.filas.res.length < 1)
    return (
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          border: "1px solid",
          borderColor: "secondary.light100",
          textAlign: "center",
          paddingX: "1rem",
        }}
      >
        <Grid container>
          <MensajeFeedback>No se encontraron resultados.</MensajeFeedback>
        </Grid>
      </Box>
    );

  return (
    <>
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table aria-label="Lista de Catedras" sx={{ mb: "1rem" }} size="small">
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

                    if (column.id === "Nombres") {
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

                    if (column.id === "Libreta") {
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

                    if (column.id === "Documento") {
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

                    if (column.id === "Email") {
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

                    if (column.id === "Usuario") {
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
                          <BotonEstado estado={row.Estado} />
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
                              alumno={row}
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
      <Grid justifyContent="flex-start" container pt={2}>
        <Grid item xs={8} sx={{ mt: 1 }}>
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
          sx={{
            mt: 1,
            verticalAlign: "middle",
            color: "rgba(0, 0, 0, 0.80)",
            fontWeight: "500",
            fontSize: "0.875rem",
          }}
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
          sx={{
            mt: 1,
            verticalAlign: "middle",
            color: "rgba(0, 0, 0, 0.80)",
            fontWeight: "500",
            fontSize: "0.875rem",
          }}
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
