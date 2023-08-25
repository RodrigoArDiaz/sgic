import * as React from "react";
import { BotonNotaGrupo } from "./BotonNotaGrupo";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import {
  TableCell1em,
  TableRowElevacion,
} from "../Material UI - Componentes Modificados/ComponentesTabla";
import { TableCellEditable } from "../Material UI - Componentes Modificados/ComponentesNotas/ComponentesNotas";
import BotonListarIntegrantesGrupo from "./BotonListarIntegrantesGrupo";

/*** Componente Row ***/
export default function Row(props) {
  const navegar = useNavigate();

  // const [open, setOpen] = React.useState(false);
  // const [est, setE] = React.useState("1");
  // const [grupos, setG] = React.useState();

  // //
  // const [isOpen, handleOpen, handleClose] = useModal(false);

  return (
    <>
      <TableRowElevacion
        sx={{
          borderBottom: "1px solid #e0e0e0",
          borderLeftColor: "secondary.light",
        }}
      >
        {props.res2.map((column) => {
          const value = props.res[column.id];
          {
            /* console.log("Row: ", props.res);
          console.log("id: ", column.id); */
          }
          if (column.id === "Grupo") {
            return (
              <TableCell1em
                key={column.id}
                align={column.align}
                sx={{ borderBottom: "0" }}
              >
                <BotonListarIntegrantesGrupo
                  IdGrupo={props.IdGrupo}
                  IdCursada={props.cursada.IdCursada}
                  NombreGrupo={value}
                />

                <Typography display="inline-flex" variant="p" marginLeft={1}>
                  {value}
                </Typography>
              </TableCell1em>
            );
          } else {
            return (
              <TableCellEditable
                key={column.id}
                align={column.align}
                sx={{ borderBottom: "0" }}
              >
                {column.format && typeof value === "number" ? (
                  column.format(value)
                ) : (
                  <BotonNotaGrupo
                    cursada={props.cursada}
                    Nota={value}
                    IdGrupo={props.res.IdGrupo}
                    IdPractico={column.idp}
                    abrir={props.abrir}
                    mensaje={props.mensaje}
                    tipo={props.tipo}
                    NMA={column.NMA}
                  />
                )}
              </TableCellEditable>
            );
          }
        })}
      </TableRowElevacion>
    </>
  );
}
