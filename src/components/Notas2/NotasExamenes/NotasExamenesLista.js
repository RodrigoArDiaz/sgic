import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ECContenedorExamenes from "../EnCorExamenes/ECContenedorExamenes";
import { BotonNota } from "./BotonNota";
import Stack from "@mui/material/Stack";
import { Box, Grid, Typography } from "@mui/material";
import FilasPorPagina from "../../GestionCatedrasSuper/FilasPorPagina";
import PaginationCustom from "../../Material UI - Componentes Modificados/ComponentePaginacion/PaginationCustom";
import {
  TableCell1em,
  TableCellHead,
  TableRowElevacion,
} from "../../Material UI - Componentes Modificados/ComponentesTabla";
import AvatarCustom from "../../Material UI - Componentes Modificados/AvatarCustom";

export default function NotasExamenesLista(props) {
  //
  var columns = [
    {
      id: "Apellidos",
      label: "Apellidos",
      minWidth: 20,
      align: "left",
      idp: 0,
    },
    {
      id: "Nombres",
      label: "Nombres",
      minWidth: 20,
      align: "left",
      idp: 0,
    },

    {
      id: "Documento",
      label: "Documento",
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

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  return (
    <>
      <TableContainer sx={{ maxHeight: "none" }}>
        <Table aria-label="Lista de finales" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                if (
                  column.id === "Apellidos" ||
                  column.id === "Nombres" ||
                  column.id === "Documento"
                ) {
                  return (
                    <TableCellHead
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCellHead>
                  );
                } else {
                  return (
                    <TableCellHead
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
                    </TableCellHead>
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
                          <Box display="flex" gap={1} alignItems="center">
                            <AvatarCustom
                              // value={value}
                              valueOne={row["Apellidos"]}
                              valueTwo={row["Nombres"]}
                              outlined={true}
                            />
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </Box>
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
                    } else if (column.id === "Documento") {
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
