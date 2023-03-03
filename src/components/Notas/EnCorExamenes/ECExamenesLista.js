import * as React from "react";
//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createTheme } from "@mui/material/styles";
import { esES } from "@mui/material/locale";
import Stack from "@mui/material/Stack";
import { Box, Grid, Typography } from "@mui/material";
//
import FilasPorPagina from "../../GestionCatedrasSuper/FilasPorPagina";
import { BotonAC } from "./BotonAC";
import {
  TableCell1em,
  TableCellHead,
} from "../../Material UI - Componentes Modificados/ComponentesTabla";
import PaginationCustom from "../../Material UI - Componentes Modificados/ComponentePaginacion/PaginationCustom";
import AvatarCustom from "../../Material UI - Componentes Modificados/AvatarCustom";

/*** Componente ECExamenesLista ***/
export default function ECExamenesLista(props) {
  React.useEffect(() => {
    console.log(props.filas.res);
  }, []);

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
      id: "Libreta",
      // label: "Libreta",
      label: "Documento",
      minWidth: 20,
      idp: 0,
    },

    {
      id: "Enunciado",
      label: "Enunciado",
      minWidth: 200,
      align: "center",
    },

    {
      id: "Correcciones",
      label: "Correcciones",
      minWidth: 200,
      align: "center",
    },
  ];

  function CambiarPagina(e, page) {
    props.actualizarpagina(page);
  }

  const theme = createTheme(esES);

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  return (
    <>
      <TableContainer sx={{ maxHeight: "none" }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableCellHead
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCellHead>
                );
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
                    } else if (column.id === "Libreta") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell1em>
                      );
                    } else if (column.id === "Enunciado") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {
                            <BotonAC
                              param1={props.enc}
                              param2={props.cor}
                              tipo={column.id}
                              IdExamenResultado={row.IdExamenResultado}
                              enunciado={row.Enunciado}
                              correcciones={row.Correcciones}
                              abrir={props.abrir}
                              mensaje={props.mensaje}
                              tipo2={props.tipo}
                              cursada={props.cursada}
                            />
                          }
                        </TableCell1em>
                      );
                    } else if (column.id === "Correcciones") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {
                            <BotonAC
                              param1={props.enc}
                              param2={props.cor}
                              tipo={column.id}
                              IdExamenResultado={row.IdExamenResultado}
                              enunciado={row.Enunciado}
                              correcciones={row.Correcciones}
                              abrir={props.abrir}
                              mensaje={props.mensaje}
                              tipo2={props.tipo}
                              cursada={props.cursada}
                            />
                          }
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
