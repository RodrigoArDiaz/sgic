import React, { useState } from "react";
import { useTheme } from "@emotion/react";
//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Chip,
  Collapse,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
//
import { useMediaQuery } from "@mui/material";
//
import { ModificarAlumno } from "./ModificarAlumno";
import { AltaAlumno } from "./AltaAlumno";
import { BajaAlumno } from "./BajaAlumno";
import { BorrarAlumno } from "./BorrarAlumno";
import { Box } from "@mui/system";
import { CoPresent, ExpandLess, ExpandMore } from "@mui/icons-material";
import Paginacion from "../Paginacion";

export default function AlumnosLista({
  alumnos,
  paginacion,
  actualizaDatosPaginacion,
}) {
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("md"));
  //Control de collapse de cada item (lista solo visible en screen xs)
  const [open, setOpen] = useState({});
  const handleClick = (id) => {
    setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const decidirEstado = (estado) => {
    switch (estado) {
      case "A":
        return "Activo";

      case "B":
        return "Baja";
    }
  };
  return (
    <>
      {alumnos.length == 0 ? (
        <></>
      ) : (
        <>
          {!esXs ? (
            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
              <Table aria-label="Lista de alumnos">
                <TableHead>
                  <TableRow>
                    <TableCell>Apellidos</TableCell>
                    <TableCell>Nombres</TableCell>
                    <TableCell>Documento</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Libreta</TableCell>
                    <TableCell align="center">Estado</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {alumnos.map((alumno, indice) => (
                    <TableRow
                      key={indice}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {alumno.Apellidos}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {alumno.Nombres}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {alumno.Documento}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {alumno.Email}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {alumno.Libreta}
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                        {/* {alumno.Estado} */}
                        <Chip
                          variant="outlined"
                          color={alumno.Estado == "A" ? "success" : "error"}
                          label={decidirEstado(alumno.Estado)}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <Grid container justifyContent="space-between">
                          <Grid item item xs={12} sm="auto">
                            <ModificarAlumno alumno={alumno} />
                          </Grid>

                          <Grid item item xs={12} sm="auto">
                            <AltaAlumno alumno={alumno} />
                          </Grid>

                          <Grid item item xs={12} sm="auto">
                            <BajaAlumno alumno={alumno} />
                          </Grid>

                          <Grid item item xs={12} sm="auto">
                            <BorrarAlumno alumno={alumno} />
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Paginacion
                paginacion={paginacion}
                actualizaDatosPaginacion={actualizaDatosPaginacion}
              />
            </TableContainer>
          ) : (
            <List
              sx={{ width: "100%", bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Alumnos
                </ListSubheader>
              }
            >
              <Divider />
              {alumnos.map((alumno, indice) => (
                <Box
                  component="div"
                  key={indice}
                  sx={{
                    marginY: "1rem",
                    border: "1px solid",
                    borderRadius: "10px",
                    borderColor: "secondary.light100",
                    "&:hover": {
                      // borderColor: "secondary.main",
                      boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
                      "& .MuiListItemIcon-root": {
                        color: "primary.main",
                      },
                    },
                  }}
                >
                  <ListItemButton
                    sx={{ borderRadius: "10px" }}
                    onClick={() => handleClick(indice)}
                  >
                    <ListItemIcon>
                      <CoPresent
                        sx={{
                          "&:hover": {
                            color: "primary.main",
                          },
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={alumno.Apellidos + " " + alumno.Nombres}
                    />
                    {/* {selectIndex == indice ? <ExpandLess /> : <ExpandMore />} */}
                    {open[indice] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>

                  <Collapse
                    // in={selectIndex == indice}
                    in={open[indice]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List
                      component="div"
                      disablePadding
                      sx={{
                        borderTop: "1px solid",
                        borderColor: "primary.light50",
                      }}
                    >
                      <ListItem
                        sx={{
                          pl: 4,
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="subtitle2">
                          <b>Apellidos:</b>
                        </Typography>
                        <Typography>{alumno.Apellidos}</Typography>
                      </ListItem>

                      <ListItem sx={{ pl: 4, justifyContent: "space-between" }}>
                        <Typography variant="subtitle2">
                          <b>Nombres:</b>
                        </Typography>
                        <Typography>{alumno.Nombres}</Typography>
                      </ListItem>

                      <ListItem sx={{ pl: 4, justifyContent: "space-between" }}>
                        <Typography variant="subtitle2">
                          <b>Documento:</b>
                        </Typography>
                        <Typography>{alumno.Documento}</Typography>
                      </ListItem>

                      <ListItem sx={{ pl: 4, justifyContent: "space-between" }}>
                        <Typography variant="subtitle2">
                          <b>Email:</b>
                        </Typography>
                        <Typography>{alumno.Email}</Typography>
                      </ListItem>

                      <ListItem sx={{ pl: 4, justifyContent: "space-between" }}>
                        <Typography variant="subtitle2">
                          <b>Email:</b>
                        </Typography>
                        <Typography>{alumno.Libreta}</Typography>
                      </ListItem>

                      <ListItem sx={{ pl: 4, justifyContent: "space-between" }}>
                        <Typography variant="subtitle2">
                          <b>Estado:</b>
                        </Typography>
                        {/* <Typography>{alumno.Estado}</Typography> */}
                        <Chip
                          variant="outlined"
                          color={alumno.Estado == "A" ? "success" : "error"}
                          label={decidirEstado(alumno.Estado)}
                        />
                      </ListItem>

                      <ListItem sx={{ pl: 4, justifyContent: "space-between" }}>
                        <ModificarAlumno alumno={alumno} />
                        <AltaAlumno alumno={alumno} />
                        <BajaAlumno alumno={alumno} />
                        <BorrarAlumno alumno={alumno} />
                      </ListItem>
                    </List>
                  </Collapse>
                  {/* <Divider /> */}
                </Box>
              ))}
              <ListItem
              // sx={{ paddingX: { xs: "0" } }}
              >
                <Paginacion
                  paginacion={paginacion}
                  actualizaDatosPaginacion={actualizaDatosPaginacion}
                />
              </ListItem>
            </List>
          )}
        </>
      )}
    </>
  );
}
