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
import ECContenedorExamenes from "../EnCorExamenes/ECContenedorExamenes";
import { BotonNota } from "./BotonNota";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import FilasPorPagina from "../../GestionCatedrasSuper/FilasPorPagina";
import PaginationCustom from "../../Material UI - Componentes Modificados/ComponentePaginacion/PaginationCustom";
import ContenedorFilasPorPagina from "../../Material UI - Componentes Modificados/ComponentePaginacion/ContenedorFilasPorPagina";
import ContenedorResultados from "../../Material UI - Componentes Modificados/ComponentePaginacion/ContenedorResultados";
import {
  TableCell1em,
  TableRowElevacion,
} from "../../Material UI - Componentes Modificados/ComponentesTabla";

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

  if (props.filas.res2.length > 0) {
    var nuevo = props.filas.res2.map((row) => ({
      id: row.Tipo + row.Orden,
      label: row.Tipo + row.Orden,
      minWidth: 20,
      align: "center",
      idp: row.IdExamen,
      NMA: row.NotaMinimaAprobacion,
      Escala: row.Escala,
    }));

    for (let i = 0; i < nuevo.length; i++) {
      columns.push(nuevo[i]);
    }
  }

  function CambiarPagina(e, page) {
    props.actualizarpagina(page);
  }

  const theme = createTheme(esES);

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  return (
    <>
      <TableContainer sx={{ maxHeight: "none" }}>
        <Table aria-label="Lista de finales" sx={{ mb: "1rem" }} size="small">
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
                      <ECContenedorExamenes
                        nombre={column.label}
                        IdExamen={column.idp}
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
                <TableRowElevacion key={row.IdUsuario}>
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
                    } else if (column.id === "Nombres") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell1em>
                      );
                    } else if (column.id === "Libreta") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell1em>
                      );
                    } else {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <BotonNota
                              cursada={props.cursada}
                              Nota={value}
                              IdUsuario={row.IdUsuario}
                              IdExamen={column.idp}
                              abrir={props.abrir}
                              mensaje={props.mensaje}
                              tipo={props.tipo}
                              NMA={column.NMA}
                              Escala={column.Escala}
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
      <Grid justifyContent="flex-start" container pt={2} paddingRight={2}>
        <Grid item xs={8} sx={{ mt: 1 }}>
          <Stack spacing={2}>
            <PaginationCustom
              defaultPage={1}
              count={props.paginacion}
              page={props.pagina}
              onChange={(e, page) => CambiarPagina(e, page)}
            />
          </Stack>
        </Grid>

        <ContenedorFilasPorPagina>
          Filas por página:{" "}
          {
            <FilasPorPagina
              actualizarfilas={props.actualizarfilas}
              fpp={props.filasxpagina}
            />
          }
        </ContenedorFilasPorPagina>

        <ContenedorResultados>
          Resultados: {props.resultados}
        </ContenedorResultados>
      </Grid>
    </>
  );
}
