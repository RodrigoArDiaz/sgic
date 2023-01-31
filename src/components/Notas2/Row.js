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
import { TableCellEditable } from "../Material UI - Componentes Modificados/ComponentesNotas/ComponentesNotas";
import {
  Avatar,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Tooltip,
  Zoom,
} from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { blue, deepOrange, orange, red } from "@mui/material/colors";
import { useModal } from "../../hooks/useModal";
import DialogFullCustom from "../Material UI - Componentes Modificados/DialogFullCustom";
import DialogCustom from "../Material UI - Componentes Modificados/DialogCustom";
import { MoonLoader } from "react-spinners";
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../styles/EstilosSpinners";
import BotonListarIntegrantesGrupo from "./BotonListarIntegrantesGrupo";

//Retorna un color
const RandomColor = (num) => {
  switch (num) {
    case 0:
      return blue[500];
      break;

    case 1:
      return deepOrange[500];
      break;

    case 2:
      return red[500];
      break;

    default:
      break;
  }
};

export default function Row(props) {
  const navegar = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [est, setE] = React.useState("1");
  const [grupos, setG] = React.useState();

  //
  const [isOpen, handleOpen, handleClose] = useModal(false);

  React.useEffect(() => {
    console.log(props.res2.length);
  }, []);

  return (
    <>
      <TableRowElevacion
        sx={{
          // "& > *": {
          //   // borderBottom: "unset",
          //   borderBottom: "1px solid black",
          // },
          // borderTop: "1px solid #e0e0e0",
          borderBottom: "1px solid #e0e0e0",
          // borderLeft: open ? "2px solid" : "none",
          borderLeftColor: "secondary.light",
        }}
      >
        {props.res2.map((column) => {
          const value = props.res[column.id];

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
                {/* <Tooltip
                  title="Listar integrantes"
                  TransitionComponent={Zoom}
                  arrow
                >
                  <IconButton
                    color="secondary"
                    aria-label="expand row"
                    size="small"
                    onClick={() => {
                      //se abre modal
                      handleOpen();

                      //Peticion
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
                    {est === "1" && <GroupsOutlinedIcon />}
                    {est === "2" && <GroupsOutlinedIcon />}
                    {est === "3" && <GroupsOutlinedIcon />}
                  </IconButton>
                </Tooltip> */}
                <Typography display="inline-flex" variant="p" marginLeft={1}>
                  {value}
                </Typography>
              </TableCell1em>
            );
          } else {
            console.log(column.NMA);
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

      {/* Ventana modal
      <DialogCustom open={isOpen} onClose={handleClose}>
        <DialogTitle display="flex" flexDirection="row">
          <GroupsOutlinedIcon sx={{ alignSelf: "center", marginRight: 1 }} />
          Integrantes
        </DialogTitle>
        <DialogContent>
          {est == 1 && (
            <Box component="div" display="flex" justifyContent="center">
              <MoonLoader color={colorMainSpinner} size={sizeMainSpinner} />
            </Box>
          )}

          {est == 3 && (
            <Box component="div" display="flex" justifyContent="center">
              <MoonLoader color={colorMainSpinner} size={sizeMainSpinner} />
            </Box>
          )}

          {est == 2 && (
            <Table
              size="small"
              aria-label="purchases"
              sx={{ borderCollapse: "collapse" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Apellidos</TableCell>
                  <TableCell>Nombres</TableCell>
                  <TableCell align="right">Libreta</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {est === "2" &&
                  grupos.map((g, index) => (
                    <TableRow
                      hover
                      key={g.Libreta}
                      sx={{
                        borderTop: "1px solid #e0e0e0",
                        borderBottom: "none",
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Avatar
                          sx={{
                            width: 24,
                            height: 24,
                            fontSize: "0.7em",
                            display: "inline-flex",
                            marginRight: "0.5rem",
                            bgcolor: RandomColor(index),
                          }}
                        >
                          {g.Apellidos &&
                            g.Nombres &&
                            g.Apellidos.toString().charAt(0) +
                              "" +
                              g.Nombres.toString().charAt(0)}
                        </Avatar>
                        {g.Apellidos}
                      </TableCell>
                      <TableCell>{g.Nombres}</TableCell>
                      <TableCell align="right">{g.Libreta}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
      </DialogCustom> */}

      {/* <TableRow
        sx={{
          borderBottom: "none",
          borderLeft: "1px solid black",
          borderLeft: open ? "2px solid" : "none",
          borderLeftColor: "secondary.light",
        }}
      >
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={props.res2.length}
          sx={{
            borderBottom: "none",
          }}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container>
              <Grid item xs={12} md={9} lg={6} paddingY={1} paddingX={4}>
                <Paper variant="outlined">
                  <CardHeader
                    title={<Typography variant="h6">Integrantes</Typography>}
                    avatar={<GroupsOutlinedIcon sx={{ color: "icons.main" }} />}
                    sx={{ paddingY: "10px" }}
                  ></CardHeader>
                  <Divider></Divider>
                  <CardContent sx={{ padding: "0" }}>
                    <Table
                      size="small"
                      aria-label="purchases"
                      sx={{ borderCollapse: "collapse" }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Apellidos</TableCell>
                          <TableCell>Nombres</TableCell>
                          <TableCell align="right">Libreta</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {est === "2" &&
                          grupos.map((g, index) => (
                            <TableRow
                              hover
                              key={g.Libreta}
                              sx={{
                                borderTop: "1px solid #e0e0e0",
                                borderBottom: "none",
                              }}
                            >
                              <TableCell component="th" scope="row">
                                <Avatar
                                  sx={{
                                    width: 24,
                                    height: 24,
                                    fontSize: "0.7em",
                                    display: "inline-flex",
                                    marginRight: "0.5rem",
                                    bgcolor: RandomColor(index),
                                  }}
                                >
                                  {g.Apellidos &&
                                    g.Nombres &&
                                    g.Apellidos.toString().charAt(0) +
                                      "" +
                                      g.Nombres.toString().charAt(0)}
                                </Avatar>
                                {g.Apellidos}
                              </TableCell>
                              <TableCell>{g.Nombres}</TableCell>
                              <TableCell align="right">{g.Libreta}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Paper>
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </>
  );
}
