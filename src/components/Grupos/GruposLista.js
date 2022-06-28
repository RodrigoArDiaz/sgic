import * as React from "react";
//MUI
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { esES } from "@mui/material/locale";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
//Componentes propios
import { BotonAcciones } from "./BotonAcciones";
import { BotonEstado } from "./BotonEstado.js";
import FilasPorPagina from "../GestionCatedrasSuper/FilasPorPagina";
import {
  TableRowElevacion,
  TableCell1em,
} from "../Material UI - Componentes Modificados/ComponentesTabla";

const columns = [
  {
    id: "Grupo",
    label: "Grupo",
    minWidth: 20,
    align: "left",
  },

  {
    id: "Tema",
    label: "Tema",
    minWidth: 20,
    align: "center",
  },

  {
    id: "Modulo",
    label: "Modulo",
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
export default function StickyHeadTable(props) {
  function CambiarPagina(e, page) {
    props.actualizarpagina(page);
  }

  const theme = createTheme(esES);

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  return (
    <>
      <TableContainer sx={{ maxHeight: "none" }}>
        <Table aria-label="Lista de grupos" sx={{ mb: "1rem" }} size="small">
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
                    if (column.id === "Grupo") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell1em>
                      );
                    }

                    if (column.id === "Tema") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell1em>
                      );
                    }

                    if (column.id === "Modulo") {
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
                            idgrupo={row.IdGrupo}
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
                              grupo={row}
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
