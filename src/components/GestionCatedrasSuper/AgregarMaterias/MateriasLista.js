import * as React from "react";
//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import { Box, Grid, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Tooltip, Zoom } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
//Componentes propios
import FilasPorPagina from "../FilasPorPagina";
import { BotonAcciones } from "./BotonAcciones";
import {
  TableCellHead,
  TableCellMedium,
  TableRowElevacion,
} from "../../Material UI - Componentes Modificados/ComponentesTabla";
import MensajeFeedback from "../../MensajeFeedback";
import PaginationCustom from "../../Material UI - Componentes Modificados/ComponentePaginacion/PaginationCustom";

//Datos columna tabla
const columns = [
  {
    id: "Materia",
    label: "Materia - Código SIU",
    minWidth: 20,
    align: "left",
    //format: (value) => value.toFixed(2),
  },

  {
    id: "Carrera",
    label: "Carrera - Código SIU",
    minWidth: 20,
    align: "left",
    //format: (value) => value.toFixed(2),
  },

  {
    id: "Plan",
    label: "Plan De Estudio - Código SIU",
    minWidth: 20,
    align: "left",
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

/*** Componente MateriasLista ***/
export default function MateriasLista(props) {
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
      <Grid container>
        <MensajeFeedback>No se encontraron resultados.</MensajeFeedback>
      </Grid>
    );

  return (
    <>
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table
          aria-label="Lista de materia de la catedra"
          sx={{ mb: "1rem" }}
          size="small"
        >
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
                    if (column.id === "Materia") {
                      return (
                        <TableCellMedium key={column.id} align={column.align}>
                          {row.MEstado === "A" && (
                            <Tooltip title="Activa" TransitionComponent={Zoom}>
                              <IconButton
                                aria-label="estado"
                                size="small"
                                color="success"
                              >
                                <CheckCircleOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          {row.MEstado === "B" && (
                            <Tooltip
                              title="Baja"
                              TransitionComponent={Zoom}
                              arrow
                            >
                              <IconButton
                                aria-label="estado2"
                                size="small"
                                color="error"
                              >
                                <CancelOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}{" "}
                          <b>-</b> {row.MCodigoSIU} <b>-</b>
                        </TableCellMedium>
                      );
                    }

                    if (column.id === "Carrera") {
                      return (
                        <TableCellMedium key={column.id} align={column.align}>
                          {row.CEstado === "A" && (
                            <Tooltip title="Activa" TransitionComponent={Zoom}>
                              <IconButton
                                aria-label="estado"
                                size="small"
                                color="success"
                              >
                                <CheckCircleOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          {row.CEstado === "B" && (
                            <Tooltip
                              title="Baja"
                              TransitionComponent={Zoom}
                              arrow
                            >
                              <IconButton
                                aria-label="estado2"
                                size="small"
                                color="error"
                              >
                                <CancelOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}{" "}
                          <b>-</b> {row.CCodigoSIU} <b>-</b>
                        </TableCellMedium>
                      );
                    }

                    if (column.id === "Plan") {
                      return (
                        <TableCellMedium key={column.id} align={column.align}>
                          {row.PEstado === "A" && (
                            <Tooltip
                              title="Activo"
                              TransitionComponent={Zoom}
                              arrow
                            >
                              <IconButton
                                aria-label="estado"
                                size="small"
                                color="success"
                              >
                                <CheckCircleOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          {row.PEstado === "B" && (
                            <Tooltip title="Baja" TransitionComponent={Zoom}>
                              <IconButton
                                aria-label="estado2"
                                size="small"
                                color="error"
                              >
                                <CancelOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}{" "}
                          <b>-</b> {row.PCodigoSIU} <b>-</b>
                        </TableCellMedium>
                      );
                    }

                    if (column.id === "acciones") {
                      return (
                        <TableCellMedium key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <BotonAcciones
                              nombre={row.Catedra}
                              idcatedra={props.idcatedra}
                              catedra={row.Catedra}
                              refrescar={props.refrescar}
                              abrir={props.abrir}
                              mensaje={props.mensaje}
                              tipo={props.tipo}
                              idusuario={row.IdUsuario}
                              materia={row.IdMateria}
                              plan={row.IdPlanEstudio}
                              carrera={row.IdCarrera}
                              nombremateria={row.Materia}
                            />
                          )}
                        </TableCellMedium>
                      );
                    }
                  })}
                </TableRowElevacion>
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
