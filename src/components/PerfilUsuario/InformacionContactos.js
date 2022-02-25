import React, { useState } from "react";
import { useTheme } from "@emotion/react";
//MUI
import { Box } from "@mui/system";
import {
  Alert,
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Paper,
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
import ContactsIcon from "@mui/icons-material/Contacts";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
//
import { CrearContacto } from "./CrearContacto";
import { BorrarContacto } from "./BorrarContacto";
import { ModificarContacto } from "./ModificarContacto";
import { CardMain } from "../Material UI - Componentes Modificados/Componentes Inscripciones/ComponentesInscripciones";
import { TableRowElevacion } from "../Material UI - Componentes Modificados/ComponentesTabla";

const contactosPrueba = [
  // {
  //   idContacto: "0",
  //   redSocial: "Facebook",
  //   perfil: "https://www.facebook.com/alumno10",
  // },
  // {
  //   idContacto: "1",
  //   redSocial: "Github",
  //   perfil: "https://github.com/Alumno10",
  // },
  // {
  //   idContacto: "2",
  //   redSocial: "WhatsApp",
  //   perfil: "+549381200100",
  // },
];

//Estilos para filas de la tabla
const estilosCell = { fontSize: "1em" };

export default function InformacionDeContactos() {
  const [contactos, setContactos] = useState(contactosPrueba);
  //
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  //Prueba
  const aniadirContacto = (nuevoContacto) => {
    //Se debe hacer la peticion

    //Simulacion del caso exitoso
    const nuevoContactoGuardado = {
      idContacto: Math.random(),
      redSocial: nuevoContacto.redSocial,
      perfil: nuevoContacto.perfil,
    };
    setContactos((prev) => [...prev, nuevoContactoGuardado]);
  };

  //Prueba
  const borrarContacto = (idContacto) => {
    // const result = contactos.filter((contacto, indice) => indice != idContacto);
    // setContactos(result);
    setContactos((prev) => [
      ...prev.filter((contacto, indice) => contacto.idContacto !== idContacto),
    ]);
  };

  //Prueba
  const modificarContacto = (idContacto, contactoModificado) => {
    console.log(idContacto);

    //Simulacion caso exitoso
    const result = contactos.slice();
    result.map((contacto, indice) => {
      if (contacto.idContacto == idContacto) {
        contacto.perfil = contactoModificado.perfil;
        contacto.redSocial = contactoModificado.redSocial;
      }
    });
    //Se guardaria el resultado de la peticion
    setContactos(result);
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
          {/* <CardActions>
            <Grid container justifyContent="end">
              <Grid item xs={12} md={6} textAlign="end">
                <CrearContacto aniadirContacto={aniadirContacto} />
              </Grid>
            </Grid>
          </CardActions> */}
          <CardHeader
            avatar={<PermContactCalendarOutlinedIcon size="large" />}
            title={<Typography variant="p">Informacion de contacto</Typography>}
            action={<CrearContacto aniadirContacto={aniadirContacto} />}
          />
          <Divider />
          <CardContent>
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
                              {/* <Avatar
                                sx={{
                                  bgcolor: "secondary.main",
                                  color: "#fff",
                                }}
                              > */}
                              <PermContactCalendarOutlinedIcon color="secondary" />
                              {/* </Avatar> */}
                              <Typography pt={1}>
                                {contacto.redSocial + ": " + contacto.perfil}
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
                                idContacto={contacto.idContacto}
                                modificarContacto={modificarContacto}
                                contacto={contacto}
                              />
                              <BorrarContacto
                                idContacto={contacto.idContacto}
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
                    {" "}
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

                            {contacto.redSocial}
                          </TableCell>

                          <TableCell
                            component="th"
                            scope="row"
                            sx={estilosCell}
                          >
                            {contacto.perfil}
                          </TableCell>

                          <TableCell align="center">
                            <Grid container justifyContent="space-evenly">
                              <Grid item item xs={12} sm="auto">
                                <ModificarContacto
                                  idContacto={contacto.idContacto}
                                  modificarContacto={modificarContacto}
                                  contacto={contacto}
                                />
                              </Grid>

                              <Grid item item xs={12} sm="auto">
                                <BorrarContacto
                                  idContacto={contacto.idContacto}
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
          </CardContent>
        </CardMain>
      </Grid>
    </Grid>
  );
}

{
  /* {contactos.map((contacto, indice) => {
                return (
                  <>
                    <Grid item xs={12} key={indice}>
                      <Grid
                        container
                        columnSpacing={2}
                        justifyContent="space-between"
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
                            <Avatar
                              sx={{ bgcolor: "secondary.main", color: "#fff" }}
                            >
                              <ContactsIcon />
                            </Avatar>
                            <Typography pt={1}>
                              {contacto.redSocial + ": " + contacto.perfil}
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
                              idContacto={contacto.idContacto}
                              modificarContacto={modificarContacto}
                              contacto={contacto}
                            />
                            <BorrarContacto
                              idContacto={contacto.idContacto}
                              borrarContacto={borrarContacto}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                      <Divider sx={{ mt: "0.5rem" }} />
                    </Grid>
                  </>
                );
              })} */
}
