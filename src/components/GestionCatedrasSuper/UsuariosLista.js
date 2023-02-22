import * as React from "react";
//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import { Box, Chip, Grid, Typography } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { AgregarUsuarioCatedra } from "./AgregarUsuarioCatedra";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
//Componentes
import FilasPorPagina from "./FilasPorPagina";
import {
  TableCell1em,
  TableCellHead,
  TableCellMedium,
  TableRowElevacion,
} from "../Material UI - Componentes Modificados/ComponentesTabla";
import MensajeFeedback from "../MensajeFeedback";
import PaginationCustom from "../Material UI - Componentes Modificados/ComponentePaginacion/PaginationCustom";
import AvatarCustom from "../Material UI - Componentes Modificados/AvatarCustom";

//Data columna tabla
const columns = [
  {
    id: "#",
    label: "",
    minWidth: 20,
    align: "left",
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

/*** Componente UsuariosLista ***/
export default function UsuariosLista(props) {
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
                        <TableCellMedium key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCellMedium>
                      );
                    }

                    if (column.id === "Nombres") {
                      return (
                        <TableCellMedium key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCellMedium>
                      );
                    }

                    if (column.id === "Documento") {
                      return (
                        <TableCellMedium key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCellMedium>
                      );
                    }

                    if (column.id === "Email") {
                      return (
                        <TableCellMedium key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCellMedium>
                      );
                    }

                    if (column.id === "Estado") {
                      return (
                        <TableCellMedium key={column.id} align={column.align}>
                          {value === "A" && (
                            <Chip
                              variant="outlined"
                              color="success"
                              label="Alta"
                              icon={<CheckCircleOutlinedIcon />}
                            />
                          )}
                          {value === "B" && (
                            <Chip
                              variant="outlined"
                              color="error"
                              label="Baja"
                              icon={<HighlightOffOutlinedIcon />}
                            />
                          )}
                        </TableCellMedium>
                      );
                    }

                    if (column.id === "acciones") {
                      return (
                        <TableCellMedium key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <AgregarUsuarioCatedra
                              nombre={row.Catedra}
                              idcatedra={props.idcatedra}
                              catedra={row.Catedra}
                              refrescar={props.refrescar}
                              abrir={props.abrir}
                              mensaje={props.mensaje}
                              tipo={props.tipo}
                              idusuario={row.IdUsuario}
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
