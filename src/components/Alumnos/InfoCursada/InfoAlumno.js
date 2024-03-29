import React from "react";
import { useState } from "react";
import { useEffect } from "react";
//MUI
import {
  Box,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
//
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  peticionBuscarMiSituacionFinal,
  peticionListarIntegrantesGrupo,
} from "../../../api/alumnos/notasApi";
import { routes } from "../../../routes";
import AvatarCustom from "../../Material UI - Componentes Modificados/AvatarCustom";
import CardMainPage from "../../Material UI - Componentes Modificados/CardMainPage";
import {
  TableCell1em,
  TableRowElevacion,
} from "../../Material UI - Componentes Modificados/ComponentesTabla";

const estilosCell = {
  fontWeight: "500",
  color: "rgba(58, 53, 65, 0.87)",
  fontSize: "0.875rem",
};

//Determina label segun el estado
const determinarEstado = (estado) => {
  switch (estado) {
    case "C":
      return "Cursando";

    case "R":
      return "Regular";

    case "A":
      return "Aprobado";

    case "P":
      return "Promocionado";

    case "L":
      return "Libre";
  }
};

/*** Componente const InfoAlumno ***/
const InfoAlumno = ({ infoCursada }) => {
  //Recupero informacion de la cursada
  const { cursada } = useSelector((state) => state.cursada);
  //Recupero informacion de del alumno
  const { user } = useSelector((state) => state.user);

  //
  const navegar = useNavigate();

  //Varible de estado que indica el estado de usuario
  const [estadoAlumno, setEstadoAlumno] = useState("");
  const [isLoadingEstado, setIsLoadingEstado] = useState(false);

  const [alumnoSinGrupo, setAlumnoSinGrupo] = useState(false);

  //
  const [grupo, setGrupo] = useState([]);
  const [isLoadingGrupo, setIsLoadingGrupo] = useState(false);

  //Handle peticion situacion final
  const handleBuscarMiSituacionFinal = async () => {
    setIsLoadingEstado(true);
    //Realizo peticon
    try {
      const respuesta = await peticionBuscarMiSituacionFinal(
        cursada.IdCursada,
        null
      );

      console.log(respuesta.data.res[0]);

      setEstadoAlumno(determinarEstado(respuesta.data.res[0].Estado));
    } catch (error) {
      if (error.response && error.response.status == 401) {
        //Sesion caducada (sin autorización)
        navegar(routes.iniciarSesion);
      }
    }
    setIsLoadingEstado(false);
  };

  //Handle peticion info grupo
  const handleListarIntegrantesGrupo = async () => {
    setIsLoadingGrupo(true);
    //Realizo peticon
    try {
      const respuesta = await peticionListarIntegrantesGrupo(
        cursada.IdCursada,
        user.IdUsuario,
        null
      );
      console.log(respuesta.data.res);
      setGrupo(respuesta.data.res);
    } catch (error) {
      if (error.response && error.response.status == 460) {
        setAlumnoSinGrupo(true);
      }

      if (error.response && error.response.status == 401) {
        //Sesion caducada (sin autorización)
        navegar(routes.iniciarSesion);
      }
    }
    setIsLoadingGrupo(false);
  };

  //Carga de las cursadas del alumno
  useEffect(() => {
    handleBuscarMiSituacionFinal();
    handleListarIntegrantesGrupo();
  }, []);

  return (
    <Grid container spacing={3}>
      {/* Mi estado */}
      <Grid item xs={6} sm={3} md={4} lg={2}>
        <CardMainPage visibleHeader={false}>
          <Box textAlign="center" paddingTop={3} paddingBottom={3}>
            {estadoAlumno != undefined && (
              <Chip
                label={estadoAlumno}
                variant="outlined"
                color="success"
                size="large"
              />
            )}

            <Typography
              marginTop={1}
              variant="subtitle2"
              sx={{ opacity: "0.75" }}
            >
              Mi estado
            </Typography>
          </Box>
        </CardMainPage>
      </Grid>

      {infoCursada.PermiteGrupos == "S" && !alumnoSinGrupo && (
        <Grid item xs={6}>
          <CardMainPage visibleHeader={false}>
            <List sx={{ paddingY: 0 }}>
              <ListItem sx={{ paddingX: 2, flexWrap: "wrap" }}>
                <ListItemText>
                  <Typography variant="h6" fontSize="1rem">
                    Grupo
                  </Typography>
                </ListItemText>
              </ListItem>
            </List>
            <Divider />
            <CardContent
              sx={{
                padding: 0,
                "&.MuiCardContent-root:last-child": { paddingBottom: 0 },
              }}
            >
              {!isLoadingGrupo && !alumnoSinGrupo && (
                <TableContainer component={Box} sx={{ overflowX: "auto" }}>
                  <Table aria-label="Lista de Catedras" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Apellidos</TableCell>
                        <TableCell>Nombres</TableCell>
                        <TableCell align="center">Email</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {grupo.map((integrante) => (
                        <TableRowElevacion key={integrante.IdUsuario}>
                          <TableCell1em
                            component="th"
                            scope="row"
                            // sx={estilosCell}
                          >
                            <Box display="flex" gap={1} alignItems="center">
                              <AvatarCustom
                                // value={value}
                                valueOne={integrante.Apellidos}
                                valueTwo={integrante.Nombres}
                                outlined={true}
                                // defineColor={randomColor()}
                              />
                              {integrante.Apellidos}
                            </Box>
                          </TableCell1em>

                          <TableCell1em
                            component="th"
                            scope="row"
                            //  sx={estilosCell}
                          >
                            {/* <CopiarButton textoCopiar={contacto.Perfil} /> */}
                            {integrante.Nombres}
                          </TableCell1em>
                          <TableCell1em
                            component="th"
                            scope="row"
                            sx={estilosCell}
                            align="center"
                          >
                            {/* <CopiarButton textoCopiar={contacto.Perfil} /> */}
                            {integrante.Email}
                          </TableCell1em>
                        </TableRowElevacion>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {!isLoadingGrupo && alumnoSinGrupo && (
                <Box paddingX={2} paddingY={1.8}>
                  <Chip
                    label="Alumno sin grupo"
                    variant="outlined"
                    color="error"
                  />
                </Box>
              )}
            </CardContent>
          </CardMainPage>
        </Grid>
      )}

      {/* Mi estado */}
      {infoCursada.PermiteGrupos == "S" && alumnoSinGrupo && (
        <Grid item xs={6} sm={3} md={4} lg={2}>
          <CardMainPage visibleHeader={false}>
            <Box textAlign="center" paddingTop={3} paddingBottom={3}>
              {estadoAlumno != undefined && (
                <Chip
                  label="Alumno sin grupo"
                  variant="outlined"
                  color="error"
                  size="large"
                />
              )}

              <Typography
                marginTop={1}
                variant="subtitle2"
                sx={{ opacity: "0.75" }}
              >
                Grupo
              </Typography>
            </Box>
          </CardMainPage>
        </Grid>
      )}
    </Grid>
  );
};

export default InfoAlumno;
