import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { BotonNota } from "./BotonNota";
import Stack from "@mui/material/Stack";
import { Box, Divider, Grid, Typography } from "@mui/material";
import FilasPorPagina from "../GestionCatedrasSuper/FilasPorPagina";
import ECContenedorPracticos from "./EnCorPracticos/ECContenedorPracticos";
import Row from "./Row";
import PaginationCustom from "../Material UI - Componentes Modificados/ComponentePaginacion/PaginationCustom";
import {
  TableCell1em,
  TableCellHead,
} from "../Material UI - Componentes Modificados/ComponentesTabla";
import AvatarCustom from "../Material UI - Componentes Modificados/AvatarCustom";

export default function NotasPracticosLista(props) {
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

  var columns2 = [
    {
      id: "Grupo",
      label: "Grupo",
      minWidth: 20,
      align: "left",
      idp: 0,
    },
  ];

  if (props.filas.res2.length > 0) {
    var nuevo = props.filas.res2.map((row) => ({
      id: "TP" + row.Orden,
      label: "TP" + row.Orden,
      minWidth: 20,
      align: "center",
      idp: row.IdPractico,
      NMA: row.NotaMinimaAprobacion,
    }));

    for (let i = 0; i < nuevo.length; i++) {
      columns.push(nuevo[i]);
    }
  }

  if (props.filas.res2.length > 0) {
    var nuevo2 = props.filas.res2.map((row) => ({
      id: "TP" + row.Orden,
      label: "TP" + row.Orden,
      minWidth: 20,
      align: "center",
      idp: row.IdPractico,
      NMA: row.NotaMinimaAprobacion,
    }));

    for (let i = 0; i < nuevo2.length; i++) {
      columns2.push(nuevo2[i]);
    }
  }

  function CambiarPagina(e, page) {
    props.actualizarpagina(page);
  }

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  /***************************************/
  //Tabla para cursadas que no tienen grupos
  if (props.cursada.TieneGrupos === "N") {
    return (
      <>
        <TableContainer sx={{ maxHeight: "none" }}>
          <Table aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  if (
                    column.id === "Apellidos" ||
                    column.id === "Nombres" ||
                    column.id === "Documento" ||
                    column.id === "avatar"
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
                        <ECContenedorPracticos
                          nombre={column.label}
                          IdPractico={column.idp}
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
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.IdUsuario}
                  >
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
                                // defineColor={randomColor()}
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
                                IdPractico={column.idp}
                                abrir={props.abrir}
                                mensaje={props.mensaje}
                                tipo={props.tipo}
                                NMA={column.NMA}
                              />
                            )}
                          </TableCell1em>
                        );
                      }
                    })}
                  </TableRow>
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

  /***************************************/
  //Tabla de grupos
  if (props.cursada.TieneGrupos === "S") {
    return (
      <>
        <TableContainer sx={{ maxHeight: "none" }} size="medium">
          <Table
            aria-label="Lista de inscriptos"
            sx={{
              mb: "1rem",
              borderCollapse: "collapse",
            }}
            size="small"
          >
            <TableHead>
              <TableRow>
                {/* <TableCell /> */}
                {columns2.map((column) => {
                  if (column.id === "Grupo") {
                    return (
                      <TableCellHead
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        sx={{ paddingY: "3px" }}
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
                        sx={{ paddingY: "3px" }}
                      >
                        <ECContenedorPracticos
                          nombre={column.label}
                          IdPractico={column.idp}
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
                  <Row
                    res={row}
                    res2={columns2}
                    cursada={props.cursada}
                    IdGrupo={row.IdGrupo}
                    abrir={props.abrir}
                    mensaje={props.mensaje}
                    tipo={props.tipo}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginacion */}
        <Grid
          justifyContent="space-between"
          container
          // pt={2.2}
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
}
