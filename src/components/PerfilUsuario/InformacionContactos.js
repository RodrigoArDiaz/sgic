import React, { useState } from "react";
import {
  Alert,
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ContactsIcon from "@mui/icons-material/Contacts";
import { CrearContacto } from "./CrearContacto";
import { BorrarContacto } from "./BorrarContacto";
import { ModificarContacto } from "./ModificarContacto";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import { CardMain } from "../Material UI - Componentes Modificados/Componentes Inscripciones/ComponentesInscripciones";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/system";

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

const contacto = {
  idContacto: "0",
  redSocial: "Facebook",
  perfil: "https://www.facebook.com/alumno10",
};

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
          <CardActions>
            <Grid container justifyContent="end">
              <Grid item xs={12} md={6} textAlign="end">
                <CrearContacto aniadirContacto={aniadirContacto} />
              </Grid>
            </Grid>
          </CardActions>
          <Divider />
          <CardContent>
            <Grid container>
              {contactos.length == 0 && (
                <Grid item xs={12}>
                  <Grid
                    container
                    columnSpacing={2}
                    justifyContent="space-between"
                  >
                    <Grid item xs={12} sm={10}>
                      <Box
                      // display="flex"
                      // gap={1}
                      // flexWrap="wrap"

                      //    flexDirection "column", alignItems: "center" },
                      >
                        <Avatar
                          sx={{ bgcolor: "secondary.main", color: "#fff" }}
                        >
                          <ContactsIcon />
                        </Avatar>
                        <Typography pt={1}>
                          Facebook: https://www.facebook.com/alumno10
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={2} textAlign="center">
                      <ModificarContacto
                        idContacto={contacto.idContacto}
                        modificarContacto={modificarContacto}
                        contacto={contacto}
                      />
                      <BorrarContacto
                        idContacto={contacto.idContacto}
                        borrarContacto={borrarContacto}
                      />
                    </Grid>
                  </Grid>
                  <Divider sx={{ mt: "1px" }} />
                </Grid>
              )}

              {/* <Grid
                item
                xs={12}
                // lg={8}
              >
                <List>
                  {contactos.length == 0 && (
                    <>
                      <ListItem key="0">
                        <ListItemText>
                          <Alert severity="info">
                            Aún no añadió informacion de contacto. Añada nueva
                            informacion de contacto con el boton 'Añadir
                            Contacto'.
                          </Alert>
                        </ListItemText>
                      </ListItem>
                    </>
                  )}

                  {contactos.map((contacto, indice) => {
                    return (
                      <>
                        <ListItem
                          key={indice}
                          secondaryAction={
                            <>
                              <ModificarContacto
                                idContacto={contacto.idContacto}
                                modificarContacto={modificarContacto}
                                contacto={contacto}
                              />
                              <BorrarContacto
                                idContacto={contacto.idContacto}
                                borrarContacto={borrarContacto}
                              />
                            </>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar
                              sx={{ bgcolor: "secondary.main", color: "#fff" }}
                            >
                              <ContactsIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              contacto.redSocial + ": " + contacto.perfil
                            }
                            sx={{ textOverflow: "ellipsis" }}
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </>
                    );
                  })}
                </List>
              </Grid> */}
            </Grid>
          </CardContent>
        </CardMain>
      </Grid>
    </Grid>

    // <>
    //   <Grid container pt={2}>
    //     <Grid
    //       item
    //       xs={12}
    //       // lg={8}
    //       textAlign="end"
    //     >
    //       <CrearContacto aniadirContacto={aniadirContacto} />
    //     </Grid>
    //   </Grid>
    //   <Grid container>
    //     <Grid
    //       item
    //       xs={12}
    //       // lg={8}
    //     >
    //       <List>
    //         {contactos.length == 0 && (
    //           <>
    //             <ListItem key="0">
    //               <ListItemText>
    //                 <Alert severity="info">
    //                   Aún no añadió informacion de contacto. Añada nueva
    //                   informacion de contacto con el boton 'Añadir Contacto'.
    //                 </Alert>
    //               </ListItemText>
    //             </ListItem>
    //           </>
    //         )}

    //         {contactos.map((contacto, indice) => {
    //           return (
    //             <>
    //               {indice == 0 && <Divider variant="inset" component="li" />}
    //               <ListItem
    //                 key={indice}
    //                 secondaryAction={
    //                   <>
    //                     <ModificarContacto
    //                       idContacto={contacto.idContacto}
    //                       modificarContacto={modificarContacto}
    //                       contacto={contacto}
    //                     />
    //                     <BorrarContacto
    //                       idContacto={contacto.idContacto}
    //                       borrarContacto={borrarContacto}
    //                     />
    //                   </>
    //                 }
    //               >
    //                 <ListItemAvatar>
    //                   <Avatar>
    //                     <ContactsIcon />
    //                   </Avatar>
    //                 </ListItemAvatar>
    //                 <ListItemText
    //                   primary={contacto.redSocial + ": " + contacto.perfil}
    //                 />
    //               </ListItem>
    //               <Divider variant="inset" component="li" />
    //             </>
    //           );
    //         })}
    //       </List>
    //     </Grid>
    //   </Grid>
    // </>
  );
}
