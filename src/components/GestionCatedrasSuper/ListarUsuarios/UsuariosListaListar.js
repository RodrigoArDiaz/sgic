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
import IconButton from "@mui/material/IconButton";
import { Grid, Tooltip } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
//
import { BotonAcciones } from "./BotonAcciones";
import {
  TableCellMedium,
  TableRowElevacion,
} from "../../Material UI - Componentes Modificados/ComponentesTabla";
import MensajeFeedback from "../../MensajeFeedback";

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
    id: "Rol",
    label: "Rol",
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

export default function StickyHeadTable(props) {
  function CambiarPagina(e, page) {
    //console.log(page);
    props.actualizarpagina(page);
  }

  const theme = createTheme(esES);

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  var cuenta;

  if (props.filas.res === undefined)
    return (
      <Grid container>
        <MensajeFeedback tipo="error">Error fatal.</MensajeFeedback>
      </Grid>
    );
  if (props.filas.res.length < 1)
    return (
      <Grid container>
        <MensajeFeedback>La catedra aún no tiene usuarios.</MensajeFeedback>
      </Grid>
    );

  //console.log(props.filas.res);

  return (
    <TableContainer sx={{ overflowX: "auto" }}>
      <Table
        aria-label="Lista de usuarios de la catedra"
        sx={{ mb: "1rem" }}
        size="small"
      >
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

                  if (column.id === "Rol") {
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
                          <Tooltip title="Activo">
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
                        {value === "B" && (
                          <Tooltip title="Baja">
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
                      </TableCellMedium>
                    );
                  }

                  if (column.id === "acciones") {
                    return (
                      <TableCell key={column.id} align={column.align}>
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
