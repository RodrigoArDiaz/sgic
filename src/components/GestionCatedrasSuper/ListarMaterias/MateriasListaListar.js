import * as React from "react";
//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import { Grid, Tooltip, Zoom } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
//Componentes propios
import { BotonAcciones } from "./BotonAcciones";
import {
  TableCellHead,
  TableRowElevacion,
} from "../../Material UI - Componentes Modificados/ComponentesTabla";
import MensajeFeedback from "../../MensajeFeedback";

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

//Estilos para filas de la tabla
const estilosCell = { fontSize: "1em" };

/*** Componente MateriasListaListar ***/
export default function MateriasListaListar(props) {
  // if (props.filas.res === undefined)
  //   return (
  //     <Grid container px={2}>
  //       <MensajeFeedback tipo="error">Error fatal.</MensajeFeedback>
  //     </Grid>
  //   );
  if (props.filas.res === undefined || props.filas.res.length < 1)
    return (
      <Grid container paddingX={3}>
        <MensajeFeedback>La catedra aún no tiene materias.</MensajeFeedback>
      </Grid>
    );

  return (
    <TableContainer sx={{ overflowX: "auto" }}>
      <Table aria-label="Lista de materias de la catedra" size="small">
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
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={estilosCell}
                      >
                        {row.MEstado === "A" && (
                          <Tooltip title="Activa" TransitionComponent={Zoom}>
                            <span>
                              <IconButton
                                aria-label="estado"
                                size="small"
                                color="success"
                              >
                                <CheckCircleOutlinedIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                        )}
                        {row.MEstado === "B" && (
                          <Tooltip title="Baja" TransitionComponent={Zoom}>
                            <span>
                              <IconButton
                                aria-label="estado2"
                                size="small"
                                color="error"
                              >
                                <CancelOutlinedIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                        )}
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}{" "}
                        <b>-</b> {row.MCodigoSIU}
                      </TableCell>
                    );
                  }

                  if (column.id === "Carrera") {
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={estilosCell}
                      >
                        {row.CEstado === "A" && (
                          <Tooltip title="Activa" TransitionComponent={Zoom}>
                            <span>
                              <IconButton
                                aria-label="estado"
                                size="small"
                                color="success"
                              >
                                <CheckCircleOutlinedIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                        )}
                        {row.CEstado === "B" && (
                          <Tooltip title="Baja" TransitionComponent={Zoom}>
                            <span>
                              <IconButton
                                aria-label="estado2"
                                size="small"
                                color="error"
                              >
                                <CancelOutlinedIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                        )}
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                        <b>-</b> {row.CCodigoSIU}
                      </TableCell>
                    );
                  }

                  if (column.id === "Plan") {
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={estilosCell}
                      >
                        {row.PEstado === "A" && (
                          <Tooltip title="Activo" TransitionComponent={Zoom}>
                            <span>
                              <IconButton
                                aria-label="estado"
                                size="small"
                                color="success"
                              >
                                <CheckCircleOutlinedIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                        )}
                        {row.PEstado === "B" && (
                          <Tooltip title="Baja" TransitionComponent={Zoom}>
                            <span>
                              <IconButton
                                aria-label="estado2"
                                size="small"
                                color="error"
                              >
                                <CancelOutlinedIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                        )}
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}{" "}
                        <b>-</b> {row.PCodigoSIU}
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
  );
}
