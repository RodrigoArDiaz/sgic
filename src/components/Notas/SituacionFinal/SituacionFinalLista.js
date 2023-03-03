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
import { blue } from "@mui/material/colors";

import {
  Box,
  FormControl,
  Grid,
  OutlinedInput,
  Typography,
} from "@mui/material";
//Componentes propios
import BotonEstados from "./BotonEstados.js";
import BotonNC from "./BotonNC.js";
import { BotonAsistencia } from "./BotonAsistencia.js";
import { BotonNFL } from "./BotonNFL.js";
import FilasPorPagina from "../../GestionCatedrasSuper/FilasPorPagina";
import PaginationCustom from "../../Material UI - Componentes Modificados/ComponentePaginacion/PaginationCustom.js";
import {
  TableCell1em,
  TableCellHead,
} from "../../Material UI - Componentes Modificados/ComponentesTabla.js";
import { TableCellEditable } from "../../Material UI - Componentes Modificados/ComponentesNotas/ComponentesNotas.js";
import AvatarCustom from "../../Material UI - Componentes Modificados/AvatarCustom.js";

/*** Componente SituacionFinalLista ***/
export default function SituacionFinalLista(props) {
  //Datos columna tabla
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
      id: "Asistencia",
      label: "Condición de asistencia",
      minWidth: 20,
      align: "center",
      idp: 0,
    },

    {
      id: "NotaFinal",
      label: "Nota",
      minWidth: 20,
      align: "center",
      idp: 0,
    },

    {
      id: "NotaFinalLibreta",
      label: "Nota Libreta",
      minWidth: 20,
      align: "center",
      idp: 0,
    },

    {
      id: "Estado",
      label: "Estado",
      minWidth: 20,
      idp: 0,
    },
  ];

  if (props.filas.res2.length > 0) {
    var nuevo = props.filas.res2.map((row) => ({
      id: row.Tipo,
      label: row.Mensaje,
      minWidth: 20,
      align: "center",
    }));

    for (let i = 0; i < nuevo.length; i++) {
      columns.push(nuevo[i]);
    }

    for (let i = 0; i < columns2.length; i++) {
      columns.push(columns2[i]);
    }
  }

  function CambiarPagina(e, page) {
    props.actualizarpagina(page);
  }

  const theme = createTheme(esES);

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.Error !== undefined)
    return <h4>{props.filas.res.Error}</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  return (
    <>
      <TableContainer sx={{ maxHeight: "none" }} size="medium">
        <Table aria-label="Lista de alumnos y su situacion final" size="small">
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
                    } else if (column.id === "Documento") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell1em>
                      );
                    } else if (column.id === "NCEQ") {
                      return (
                        <TableCellEditable key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <BotonNC
                              Nota={row.NCEQ}
                              Cond={row.CumpleReqExQ}
                              ex="NCEQ"
                            />
                          )}
                        </TableCellEditable>
                      );
                    } else if (column.id === "NCEF") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <BotonNC
                              Nota={row.NCEF}
                              Cond={row.CumpleReqExF}
                              ex="NCEF"
                            />
                          )}
                        </TableCell1em>
                      );
                    } else if (column.id === "NCEP") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <BotonNC
                              Nota={row.NCEP}
                              Cond={row.CumpleReqExP}
                              ex="NCEP"
                            />
                          )}
                        </TableCell1em>
                      );
                    } else if (column.id === "NCPRA") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <BotonNC
                              Nota={row.NCPRA}
                              Cond={row.CumpleReqPra}
                              ex="NCPRA"
                            />
                          )}
                        </TableCell1em>
                      );
                    } else if (column.id === "Asistencia") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <BotonAsistencia
                              asistencia={row.Asistencia}
                              cursada={props.cursada}
                              pidUs={row.IdUsuario}
                            />
                          )}
                        </TableCell1em>
                      );
                    } else if (column.id === "NotaFinal") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          <FormControl
                            sx={{ m: 1, width: 60 }}
                            variant="outlined"
                          >
                            <OutlinedInput
                              sx={{
                                color: blue[900],

                                borderRadius: "0px",
                                "&>input": { paddingX: 0, textAlign: "center" },
                                "& fieldset.MuiOutlinedInput-notchedOutline": {
                                  borderWidth: "2px solid",
                                  borderColor: blue[700] + "!important",
                                  borderRadius: 0,
                                },
                              }}
                              id="outlined-adornment-weight"
                              value={Number.parseFloat(row.NotaFinal).toFixed(
                                2
                              )}
                              size="small"
                              aria-describedby="outlined-weight-helper-text"
                              inputProps={{
                                readOnly: true,
                              }}
                            />
                          </FormControl>
                        </TableCell1em>
                      );
                    } else if (column.id === "NotaFinalLibreta") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <BotonNFL
                              Nota={row.NotaFinalLibreta}
                              pidUs={row.IdUsuario}
                              cursada={props.cursada}
                              Cond1={row.CumpleReqExF}
                              Cond2={row.CumpleReqExQ}
                              Cond3={row.CumpleReqExP}
                              Cond4={row.CumpleReqPra}
                              abrir={props.abrir}
                              mensaje={props.mensaje}
                              tipo={props.tipo}
                            />
                          )}
                        </TableCell1em>
                      );
                    } else if (column.id === "Estado") {
                      return (
                        <TableCell1em key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <BotonEstados
                              estado={row.Estado}
                              pidUs={row.IdUsuario}
                              cursada={props.cursada}
                              abrir={props.abrir}
                              mensaje={props.mensaje}
                              tipo={props.tipo}
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

      {/* Paginacion */}
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
