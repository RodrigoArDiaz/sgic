import React, { useEffect, useState } from "react";
//Redux
import { useSelector } from "react-redux";
//
import { useTheme } from "@emotion/react";
//MUI
import { Box } from "@mui/material";
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
//
import { CrearContacto } from "./CrearContacto";
import { BorrarContacto } from "./BorrarContacto";
import { ModificarContacto } from "./ModificarContacto";
import { TableRowElevacion } from "../Material UI - Componentes Modificados/ComponentesTabla";

import { peticionListarContactos } from "../../api/alumnos/gestionContactosApi";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import { SocialIcons } from "./SocialIcons";
import Link from "@mui/material/Link";
import { MoonLoader } from "react-spinners";

const contactosPrueba = [
  {
    Nombre: "Facebook",
    Perfil: "https://www.facebook.com/jonhsmith",
  },
  { Nombre: "Whatsapp", Perfil: "+549381102030" },
  // { Nombre: "Whatsapp", Perfil: "+549386421392" },
  { Nombre: "Github", Perfil: "https://github.com/..." },
  { Nombre: "Slack", Perfil: "https://slack.com/..." },
  { Nombre: "LinkedIn", Perfil: "https://linkedin.com/..." },
  // { Nombre: "Twitter", Perfil: "https://github.com/..." },
  { Nombre: "Gmail", Perfil: "jonhsmith2@gmail.com" },
  // { Nombre: "Outlook", Perfil: "jonhsmith2" },
  { Nombre: "Telefono", Perfil: "+549381102030" },
  // { Nombre: "Correo", Perfil: "diaz" },
];

//Estilos para filas de la tabla
const estilosCell = {
  // fontSize: "1em",
  fontWeight: "500",
  color: "rgba(58, 53, 65, 0.87)",
  fontSize: "0.875rem",
  borderBottom: "none",
};

//Chequea si un string es url o no
const isValidUrl = (urlString) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

/*** Componente PanelInformacionDeContactos ***/
export default function PanelInformacionDeContactos() {
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
  //
  const colorBgSpinner = theme.palette.secondary.main;

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
    <CardMainPage visibleHeader={false}>
      <CardHeader
        title={
          <Typography variant="h6" fontWeight={400}>
            Información de contacto agregada
          </Typography>
        }
        subheader="Utilizá el boton 'Crear contacto' para añadir información de contacto."
        action={<CrearContacto crearContacto={crearContacto} />}
      />
      <Divider />
      <CardContent>
        {isLoading ? (
          <Grid container>
            <Grid item xs={12}>
              {/* <LinearProgress /> */}
              <Box component="div" display="flex" justifyContent="center">
                {/* <PropagateLoader color={color} size={15} /> */}
                <MoonLoader color={colorBgSpinner} size={30} />
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            {contactos.length == 0 ? (
              <>
                <ListItem key="0">
                  <ListItemText>
                    <Alert
                      severity="info"
                      sx={
                        {
                          // bgcolor: "secondary.main50",
                          // color: "secondary.main",
                        }
                      }
                    >
                      Aún no añadió informacion de contacto.
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
                            <Box
                              display="flex"
                              flexDirection="row"
                              textAlign="center"
                              sx={{ alignItems: "center" }}
                            >
                              <IconButton>
                                <SocialIcons name={contacto.Nombre} />
                              </IconButton>

                              <Typography>{contacto.Nombre}</Typography>
                            </Box>

                            <Typography pt={1}>{contacto.Perfil}</Typography>
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
                        <TableCell component="th" scope="row" sx={estilosCell}>
                          <IconButton>
                            <SocialIcons name={contacto.Nombre} />
                          </IconButton>

                          {contacto.Nombre}
                        </TableCell>

                        <TableCell component="th" scope="row" sx={estilosCell}>
                          {/* <CopiarButton textoCopiar={contacto.Perfil} /> */}
                          {isValidUrl(contacto.Perfil) ? (
                            <Link
                              href={contacto.Perfil}
                              target="__blank"
                              rel="noreferrer"
                              sx={{
                                color: "inherit",
                                textDecorationColor: "inherit",
                              }}
                            >
                              {contacto.Perfil}
                            </Link>
                          ) : (
                            contacto.Perfil
                          )}
                        </TableCell>

                        <TableCell align="center" sx={estilosCell}>
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
    </CardMainPage>
  );
}
