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
  useMediaQuery,
} from "@mui/material";
import { Box, textAlign } from "@mui/system";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CoPresent from "@mui/icons-material/CoPresent";
//Componentes
import { ModificarDocente } from "./ModificarDocente";
import { AltaDocente } from "./AltaDocente";
import { BajaDocente } from "./BajaDocente";
import { BorrarDocente } from "./BorrarDocente";

import Paginacion from "../Paginacion";

export default function DocentesLista({
  docentes,
  paginacion,
  actualizaDatosPaginacion,
  handleRefrescarPagina,
}) {
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("md"));

  //Control de collapse de cada item (lista solo visible en screen xs)
  const [open, setOpen] = useState({});
  const handleClick = (id) => {
    setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  //
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
      {docentes.length == 0 ? (
        <>
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              border: "1px solid",
              borderColor: "secondary.light100",
              textAlign: "center",
              paddingY: "1rem",
            }}
          >
            No se encontraron resultados
          </Box>
        </>
      ) : (
        <>
          {!esXs ? (
            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
              <Table aria-label="Lista de Catedras">
                <TableHead>
                  <TableRow>
                    <TableCell>Apellidos</TableCell>
                    <TableCell>Nombres</TableCell>
                    <TableCell>Documento</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align="center">Estado</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {docentes.map((docente, indice) => (
                    <TableRow
                      key={indice}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {docente.Apellidos}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {docente.Nombres}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {docente.Documento}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {docente.Email}
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                        {/* {docente.Estado} */}
                        <Chip
                          variant="outlined"
                          color={docente.Estado == "A" ? "success" : "error"}
                          label={decidirEstado(docente.Estado)}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <Grid container justifyContent="space-between">
                          <Grid item item xs={12} sm="auto">
                            <ModificarDocente
                              docente={docente}
                              handleRefrescarPagina={handleRefrescarPagina}
                            />
                          </Grid>

                          <Grid item item xs={12} sm="auto">
                            <AltaDocente
                              docente={docente}
                              handleRefrescarPagina={handleRefrescarPagina}
                            />
                          </Grid>

                          <Grid item item xs={12} sm="auto">
                            <BajaDocente
                              docente={docente}
                              handleRefrescarPagina={handleRefrescarPagina}
                            />
                          </Grid>

                          <Grid item item xs={12} sm="auto">
                            <BorrarDocente
                              docente={docente}
                              handleRefrescarPagina={handleRefrescarPagina}
                            />
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
                  Docentes
                </ListSubheader>
              }
            >
              <Divider />
              {docentes.map((docente, indice) => (
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
                      primary={docente.Apellidos + " " + docente.Nombres}
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
                        <Typography>{docente.Apellidos}</Typography>
                      </ListItem>

                      <ListItem sx={{ pl: 4, justifyContent: "space-between" }}>
                        <Typography variant="subtitle2">
                          <b>Nombres:</b>
                        </Typography>
                        <Typography>{docente.Nombres}</Typography>
                      </ListItem>

                      <ListItem sx={{ pl: 4, justifyContent: "space-between" }}>
                        <Typography variant="subtitle2">
                          <b>Documento:</b>
                        </Typography>
                        <Typography>{docente.Documento}</Typography>
                      </ListItem>

                      <ListItem sx={{ pl: 4, justifyContent: "space-between" }}>
                        <Typography variant="subtitle2">
                          <b>Email:</b>
                        </Typography>
                        <Typography>{docente.Email}</Typography>
                      </ListItem>

                      <ListItem sx={{ pl: 4, justifyContent: "space-between" }}>
                        <Typography variant="subtitle2">
                          <b>Estado:</b>
                        </Typography>
                        {/* <Typography>{docente.Estado}</Typography> */}
                        <Chip
                          variant="outlined"
                          color={docente.Estado == "A" ? "success" : "error"}
                          label={decidirEstado(docente.Estado)}
                        />
                      </ListItem>

                      <ListItem sx={{ pl: 4, justifyContent: "space-between" }}>
                        <ModificarDocente
                          docente={docente}
                          handleRefrescarPagina={handleRefrescarPagina}
                        />
                        <AltaDocente
                          docente={docente}
                          handleRefrescarPagina={handleRefrescarPagina}
                        />
                        <BajaDocente
                          docente={docente}
                          handleRefrescarPagina={handleRefrescarPagina}
                        />
                        <BorrarDocente
                          docente={docente}
                          handleRefrescarPagina={handleRefrescarPagina}
                        />
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
