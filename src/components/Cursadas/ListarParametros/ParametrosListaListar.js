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
import { BotonTipo } from "../BotonTipo.js";
import { BotonAcciones } from "./BotonAcciones";
import {
  TableCell1em,
  TableRowElevacion,
} from "../../Material UI - Componentes Modificados/ComponentesTabla.js";

const columns = [
  {
    id: "Tipo",
    label: "Tipo",
    minWidth: 20,
    align: "left",
  },

  {
    id: "Calculo",
    label: "Cálculo",
    minWidth: 20,
    align: "center",
  },

  {
    id: "Escala",
    label: "Escala",
    minWidth: 20,
    align: "center",
  },

  {
    id: "PorcentajeNotaTotal",
    label: "%/Total",
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

function Transformar(param) {
  if (param === "Q") return "Quiz";

  if (param === "P") return "Parcial";
  if (param === "F") return "Final";
}

export default function StickyHeadTable(props) {
  const theme = createTheme(esES);

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  return (
    <TableContainer sx={{ maxHeight: "none", mt: 2 }}>
      <Table aria-label="Lista de parametros" sx={{ mb: "1rem" }} size="small">
        <TableHead sx={{ backgroundColor: "icons.bg" }}>
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
              <TableRowElevacion key={row.IdParametro}>
                {columns.map((column) => {
                  const value = row[column.id];

                  if (column.id === "Tipo") {
                    return (
                      <TableCell1em key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : Transformar(value)}
                      </TableCell1em>
                    );
                  }

                  if (column.id === "Calculo") {
                    return (
                      <TableCell1em key={column.id} align={column.align}>
                        {column.format && typeof value === "number" ? (
                          column.format(value)
                        ) : (
                          <BotonTipo tipo={value} />
                        )}
                      </TableCell1em>
                    );
                  }

                  if (column.id === "Escala") {
                    return (
                      <TableCell1em key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell1em>
                    );
                  }

                  if (column.id === "PorcentajeNotaTotal") {
                    return (
                      <TableCell1em key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell1em>
                    );
                  }

                  if (column.id === "acciones") {
                    return (
                      <TableCell1em key={column.id} align={column.align}>
                        {column.format && typeof value === "number" ? (
                          column.format(value)
                        ) : (
                          <BotonAcciones
                            semestre={props.semestre}
                            Materia={props.Materia}
                            anio={props.anio}
                            refrescar={props.refrescar}
                            parametro={row}
                            idcursada={props.idcursada}
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
  );
}
