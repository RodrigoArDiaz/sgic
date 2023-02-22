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
import { Box, Chip, Grid } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
//
import { BotonAcciones } from "./BotonAcciones";
import {
  TableCell1em,
  TableCellHead,
  TableCellMedium,
  TableRowElevacion,
} from "../../Material UI - Componentes Modificados/ComponentesTabla";
import MensajeFeedback from "../../MensajeFeedback";
import AvatarCustom from "../../Material UI - Componentes Modificados/AvatarCustom";

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
  },

  {
    id: "Nombres",
    label: "Nombres",
    minWidth: 20,
    align: "left",
  },

  {
    id: "Documento",
    label: "Documento",
    minWidth: 20,
    align: "left",
  },

  {
    id: "Email",
    label: "Correo",
    minWidth: 20,
    align: "left",
  },

  {
    id: "Rol",
    label: "Rol",
    minWidth: 20,
    align: "left",
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

/*** Componente CatedrasUsuariosContenedorLista ***/
export default function UsuariosListaListar(props) {
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
                            valueOne={row["Apellidos"]}
                            valueTwo={row["Nombres"]}
                            outlined={true}
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
