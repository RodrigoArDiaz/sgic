import React, { useState } from "react";
import { Alert, Avatar, Divider, Grid } from "@mui/material";
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

const contactosPrueba = [
  {
    // tipo: "facebook",
    idContacto: "0",
    redSocial: "Facebook",
    perfil: "https://www.facebook.com/alumno10",
  },
  {
    idContacto: "1",
    redSocial: "Github",
    perfil: "https://github.com/Alumno10",
  },
  {
    idContacto: "2",
    redSocial: "WhatsApp",
    perfil: "+549381200100",
  },
];

export default function InformacionDeContactos() {
  const [contactos, setContactos] = useState(contactosPrueba);

  //Prueba
  const aniadirContacto = (nuevoContacto) => {
    //Se debe hacer la peticion

    //Simulacion del caso exitoso
    const nuevoContactoGuardado = {
      id: Math.random(),
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
    <>
      <Grid container pt={2}>
        <Grid item xs={12} lg={8} textAlign="end">
          <CrearContacto aniadirContacto={aniadirContacto} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} lg={8}>
          <List>
            {contactos.length == 0 && (
              <>
                <ListItem key="0">
                  <ListItemText>
                    <Alert severity="info">
                      Aún no añadió informacion de contacto. Añada nueva
                      informacion de contacto con el boton 'Añadir Contacto'.
                    </Alert>
                  </ListItemText>
                </ListItem>
              </>
            )}

            {/* <TransitionGroup> */}
            {contactos.map((contacto, indice) => {
              return (
                <>
                  {/* <Collapse key={contacto.id}> */}
                  {indice == 0 && <Divider variant="inset" component="li" />}
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
                      <Avatar>
                        <ContactsIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={contacto.redSocial + ": " + contacto.perfil}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  {/* </Collapse> */}
                </>
              );
            })}
            {/* </TransitionGroup> */}
          </List>
        </Grid>
      </Grid>
    </>
  );
}
