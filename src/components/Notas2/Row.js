import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { BotonNotaGrupo } from "./BotonNotaGrupo";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CircularProgress from "@mui/material/CircularProgress";
import * as Responses from "../Responses";
import { useNavigate } from "react-router-dom";
import {
  TableCell1em,
  TableRowElevacion,
} from "../Material UI - Componentes Modificados/ComponentesTabla";

export default function Row(props) {
  const navegar = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [est, setE] = React.useState("1");
  const [grupos, setG] = React.useState();

  return (
    <>
      <TableRowElevacion sx={{ "& > *": { borderBottom: "unset" } }}>
        {/* <TableCell1em>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              if (est === "2") {
                setOpen(false);
                setE("1");
              } else if (est === "1" && grupos !== undefined) {
                setOpen(true);
                setE("2");
              } else {
                var data = {
                  pidG: props.IdGrupo,

                  Offset: 0,

                  pidCu: props.cursada.IdCursada,
                };
                setE("3");
                Responses.consultas(
                  data,
                  "http://127.0.0.1:8000/api/listarintegrantes"
                )
                  .then((response) => {
                    if (Responses.status === 200) {
                      setG(response.res);
                      setE("2");
                      setOpen(true);
                    } else if (Responses.status === 401) {
                      navegar("/ingreso");
                    } else {
                      navegar("/error");
                    }
                  })
                  .catch((error) => {
                    navegar("/error");
                  });
              }
            }}
          >
            {est === "1" && <KeyboardArrowUpIcon />}
            {est === "2" && <KeyboardArrowDownIcon />}
            {est === "3" && <KeyboardArrowDownIcon />}
            // {est === "3" && <CircularProgress />} 
          </IconButton>
        </TableCell1em> */}

        {props.res2.map((column) => {
          const value = props.res[column.id];

          if (column.id === "Grupo") {
            return (
              <TableCell1em
                key={column.id}
                align={column.align}
                sx={{ borderBottom: "0" }}
              >
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => {
                    if (est === "2") {
                      setOpen(false);
                      setE("1");
                    } else if (est === "1" && grupos !== undefined) {
                      setOpen(true);
                      setE("2");
                    } else {
                      var data = {
                        pidG: props.IdGrupo,

                        Offset: 0,

                        pidCu: props.cursada.IdCursada,
                      };
                      setE("3");
                      Responses.consultas(
                        data,
                        "http://127.0.0.1:8000/api/listarintegrantes"
                      )
                        .then((response) => {
                          if (Responses.status === 200) {
                            setG(response.res);
                            setE("2");
                            setOpen(true);
                          } else if (Responses.status === 401) {
                            navegar("/ingreso");
                          } else {
                            navegar("/error");
                          }
                        })
                        .catch((error) => {
                          navegar("/error");
                        });
                    }
                  }}
                >
                  {est === "1" && <KeyboardArrowDownIcon />}
                  {est === "2" && <KeyboardArrowUpIcon />}
                  {est === "3" && <KeyboardArrowDownIcon />}
                  {/* {est === "3" && <CircularProgress />} */}
                </IconButton>
                {column.format && typeof value === "number"
                  ? column.format(value)
                  : value}
              </TableCell1em>
            );
          } else {
            console.log(column.NMA);
            return (
              <TableCell
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
              </TableCell>
            );
          }
        })}
      </TableRowElevacion>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Integrantes
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Apellidos</TableCell>
                    <TableCell>Nombres</TableCell>
                    <TableCell align="right">Libreta</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {est === "2" &&
                    grupos.map((g) => (
                      <TableRow key={g.Libreta}>
                        <TableCell component="th" scope="row">
                          {g.Apellidos}
                        </TableCell>
                        <TableCell>{g.Nombres}</TableCell>
                        <TableCell align="right">{g.Libreta}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
