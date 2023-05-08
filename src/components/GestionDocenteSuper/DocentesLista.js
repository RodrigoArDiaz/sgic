import React, { useContext, useState } from "react";
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
  Alert,
  Chip,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  Zoom,
} from "@mui/material";
// import { Box, textAlign } from "@mui/system";
import { Box } from "@mui/material";
import { ContentCopy, ExpandLess, ExpandMore } from "@mui/icons-material";
import CoPresent from "@mui/icons-material/CoPresent";

//Componentes
import { ModificarDocente } from "./ModificarDocente";
import { AltaDocente } from "./AltaDocente";
import { BajaDocente } from "./BajaDocente";
import { BorrarDocente } from "./BorrarDocente";

import Paginacion from "../Paginacion";
import { AltaBajaDocente } from "./AltaBajaDocente";
import {
  TableCell1em,
  TableCellComun,
  TableCellDestacada,
  TableCellHead,
  TableRowElevacion,
} from "../Material UI - Componentes Modificados/ComponentesTabla";
import CopiarButton from "../CopiarButton";
import MensajeFeedback from "../MensajeFeedback";
import AvatarCustom from "../Material UI - Componentes Modificados/AvatarCustom";
import { PaginacionContext } from "./PaginacionContext";

export default function DocentesLista({
  docentes,
  // paginacion,
  // actualizaDatosPaginacion,
  handleRefrescarPagina,
}) {
  //Recuperacion de variables de contexto PaginacionContext
  const {
    filasPorPagina,
    totalPaginas,
    paginaActual,
    setPaginaActual,
    setFilasPorPagina,
    cantidadResultados,
  } = useContext(PaginacionContext);

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
        <Grid container>
          <Grid item xs={12} paddingX={2}>
            <MensajeFeedback>No se encontraron resultados.</MensajeFeedback>
          </Grid>
        </Grid>
      ) : (
        <>
          {/* {!esXs ? ( */}
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table
              aria-label="Lista de Catedras"
              sx={{ mb: "1rem" }}
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCellHead></TableCellHead>
                  <TableCellHead>Apellidos</TableCellHead>
                  <TableCellHead>Nombres</TableCellHead>
                  <TableCellHead>Documento</TableCellHead>
                  <TableCellHead>Email</TableCellHead>
                  <TableCellHead>Usuario</TableCellHead>
                  <TableCellHead align="center">Estado</TableCellHead>
                  <TableCellHead align="center">Acciones</TableCellHead>
                </TableRow>
              </TableHead>

              <TableBody>
                {docentes.map((docente, indice) => (
                  <TableRowElevacion key={indice}>
                    <TableCell1em>
                      <Box display="flex" gap={1} alignItems="center">
                        <AvatarCustom
                          valueOne={docente.Apellidos}
                          valueTwo={docente.Nombres}
                          outlined={true}
                        />
                      </Box>
                    </TableCell1em>
                    <TableCell1em component="th" scope="row">
                      {docente.Apellidos}
                    </TableCell1em>

                    <TableCell1em component="th" scope="row">
                      {docente.Nombres}
                    </TableCell1em>

                    <TableCell1em component="th" scope="row">
                      {docente.Documento}
                    </TableCell1em>

                    <TableCell1em component="th" scope="row">
                      <CopiarButton textoCopiar={docente.Email} />
                      {docente.Email}
                    </TableCell1em>

                    <TableCell1em component="th" scope="row">
                      {docente.Usuario}
                    </TableCell1em>

                    <TableCell component="th" scope="row" align="center">
                      <AltaBajaDocente
                        docente={docente}
                        handleRefrescarPagina={handleRefrescarPagina}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Grid container justifyContent="space-evenly">
                        <Grid item xs={12} sm="auto">
                          <ModificarDocente
                            docente={docente}
                            handleRefrescarPagina={handleRefrescarPagina}
                          />
                        </Grid>

                        <Grid item xs={12} sm="auto">
                          <BorrarDocente
                            docente={docente}
                            handleRefrescarPagina={handleRefrescarPagina}
                          />
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRowElevacion>
                ))}
              </TableBody>
            </Table>

            {/* Paginación */}
            <Grid
              justifyContent="space-between"
              container
              pt={2.2}
              paddingX={2}
              sx={{
                justifyContent: { xs: "center", md: "space-between" },
                gap: 2.5,
              }}
            >
              <Paginacion
                paginacion={{ filasPorPagina, totalPaginas, paginaActual }}
                setPaginaActual={setPaginaActual}
                setFilasPorPagina={setFilasPorPagina}
                cantidadResultados={cantidadResultados}
              />
            </Grid>
          </TableContainer>
          {/* ) : (
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

                  {open[indice] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={open[indice]} timeout="auto" unmountOnExit>
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
                      <AltaBajaDocente
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
              </Box>
            ))}
            <ListItem>
              <Paginacion
                paginacion={paginacion}
                actualizaDatosPaginacion={actualizaDatosPaginacion}
              />
            </ListItem>
          </List>
          )} */}
        </>
      )}
    </>
  );
}
