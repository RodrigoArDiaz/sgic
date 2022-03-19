import React, { useEffect, useState } from "react";
//Redux
import { useSelector } from "react-redux";
//
import { useTheme } from "@emotion/react";
//MUI
import { Box } from "@mui/system";
import {
  Alert,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
//
import { CrearContacto } from "./CrearContacto";
import { BorrarContacto } from "./BorrarContacto";
import { ModificarContacto } from "./ModificarContacto";
import { CardMain } from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";
import { TableRowElevacion } from "../Material UI - Componentes Modificados/ComponentesTabla";

import { peticionListarContactos } from "../../api/alumnos/gestionContactosApi";

const contactosPrueba = [];

//Estilos para filas de la tabla
const estilosCell = { fontSize: "1em" };

export default function InformacionDeContactos() {
  const [contactos, setContactos] = useState(contactosPrueba);
  //Varible para mostrar el spinner o progress
  const [isLoading, setIsLoading] = useState(true);
  //Recupero token
  const { token } = useSelector((state) => state.login);
  //Recupero informacion del usuario
  const { user } = useSelector((state) => state.user);
  //Para estilos reponsives
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  //Carga de la lista de contactos del usuario
  useEffect(() => {
    listarContactos();
  }, []);

  /******************************************
   * Funcion para cargar los contactos del usuario
   */
  const listarContactos = async () => {
    setIsLoading(true);
    //Realizo peticion
    try {
      const respuesta = await peticionListarContactos(user.IdUsuario, token);
      setContactos(respuesta.data.data.contactos);
    } catch (error) {
      //Ocurrio un error
      // const response = error.response.data;
      // setErrors(response.data);
    }
    setIsLoading(false);
  };

  //Refresca la lista de contacto (realiza nuevamente la peticion)
  const refrescarListaContactos = () => {
    listarContactos();
  };

  //Crear usuario
  const crearContacto = (nuevoContacto) => {
    setContactos([...contactos, nuevoContacto]);
  };

  //ModificarContacto
  const modificarContacto = (nuevoContacto) => {
    //Actualizo los datos del contacto modificado
    //No se utiliza refrescarListarContactos para ahorrar el tiempo de la peticion
    const result = contactos.slice();
    result.map((contacto, indice) => {
      if (contacto.IdContacto == nuevoContacto.IdContacto) {
        contacto.Perfil = nuevoContacto.Perfil;
        contacto.Nombre = nuevoContacto.Nombre;
      }
    });
    //Se guardan
    setContactos(result);
  };

  //Elimina contacto de la lista de contacto luego de la confirmacion de la peticion de borrardo
  //No se utiliza refrescarListarContactos para ahorrar el tiempo de la peticion
  const borrarContacto = (IdContacto) => {
    setContactos((prev) => [
      ...prev.filter((contacto, indice) => contacto.IdContacto !== IdContacto),
    ]);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} xl={8}>
        <CardMain
          sx={{
            border: "1px solid",
            borderColor: "secondary.light100",
            "&:hover": {
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            },
          }}
        >
          <CardHeader
            avatar={<PermContactCalendarOutlinedIcon size="large" />}
            title={<Typography variant="p">Informacion de contacto</Typography>}
            action={<CrearContacto crearContacto={crearContacto} />}
          />
          <Divider />
          <CardContent>
            {isLoading ? (
              <Grid container>
                <Grid item xs={12}>
                  <LinearProgress />
                </Grid>
              </Grid>
            ) : (
              <Grid container>
                {contactos.length == 0 ? (
                  <>
                    <ListItem key="0">
                      <ListItemText>
                        <Alert severity="info">
                          Aún no añadió informacion de contacto. .
                        </Alert>
                      </ListItemText>
                    </ListItem>
                  </>
                ) : esXs ? (
                  contactos.map((contacto, indice) => {
                    return (
                      <>
                        <Grid item xs={12} key={indice}>
                          <Grid
                            container
                            columnSpacing={2}
                            justifyContent="space-between"
                            key={indice}
                          >
                            <Grid item xs={12} sm={9} md={10}>
                              <Box
                                display="flex"
                                gap={1}
                                flexWrap="wrap"
                                flexDirection={esXs ? "column" : "row"}
                                alignItems={esXs ? "center" : "start"}
                                paddingY={1}
                              >
                                <PermContactCalendarOutlinedIcon color="secondary" />
                                <Typography pt={1}>
                                  {contacto.Nombre + ": " + contacto.Perfil}
                                </Typography>
                              </Box>
                            </Grid>

                            <Grid item xs={12} sm={3} md={2} textAlign="center">
                              <Box
                                display="flex"
                                justifyContent="space-evenly"
                                padding={1}
                                backgroundColor="primary"
                                sx={{
                                  "&:hover": {
                                    background: "primary.main",
                                  },
                                }}
                              >
                                <ModificarContacto
                                  contacto={contacto}
                                  modificarContacto={modificarContacto}
                                />
                                <BorrarContacto
                                  contacto={contacto}
                                  borrarContacto={borrarContacto}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                          <Divider sx={{ mt: "0.5rem" }} />
                        </Grid>
                      </>
                    );
                  })
                ) : (
                  <TableContainer component={Box} sx={{ overflowX: "auto" }}>
                    <Table
                      aria-label="Lista de Catedras"
                      sx={{ mb: "1rem" }}
                      size="small"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Red social</TableCell>
                          <TableCell>Perfil</TableCell>
                          <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {contactos.map((contacto, indice) => (
                          <TableRowElevacion key={indice}>
                            <TableCell
                              component="th"
                              scope="row"
                              sx={estilosCell}
                            >
                              <IconButton>
                                <PermContactCalendarOutlinedIcon color="secondary" />
                              </IconButton>

                              {contacto.Nombre}
                            </TableCell>

                            <TableCell
                              component="th"
                              scope="row"
                              sx={estilosCell}
                            >
                              {contacto.Perfil}
                            </TableCell>

                            <TableCell align="center">
                              <Grid container justifyContent="space-evenly">
                                <Grid item xs={12} sm="auto">
                                  <ModificarContacto
                                    contacto={contacto}
                                    modificarContacto={modificarContacto}
                                  />
                                </Grid>

                                <Grid item xs={12} sm="auto">
                                  <BorrarContacto
                                    contacto={contacto}
                                    borrarContacto={borrarContacto}
                                  />
                                </Grid>
                              </Grid>
                            </TableCell>
                          </TableRowElevacion>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Grid>
            )}
          </CardContent>
        </CardMain>
      </Grid>
    </Grid>
  );
}
