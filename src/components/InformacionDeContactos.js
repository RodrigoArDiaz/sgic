import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import {
  Alert,
  Avatar,
  Button,
  Chip,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Edit, EditAttributes, Lock } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import ContactsIcon from "@mui/icons-material/Contacts";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { CrearContacto } from "./CrearContacto";
import { BorrarContacto } from "./BorrarContacto";
import { ModificarContacto } from "./ModificarContacto";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";

const contactosPrueba = [
  {
    // tipo: "facebook",
    link: "https://www.facebook.com/...",
  },
  {
    // tipo: "github",
    link: "https://github.com/...",
  },
  {
    // tipo: "whatsapp",
    link: "+5",
  },
];

export default function InformacionDeContactos() {
  const [contactos, setContactos] = useState(contactosPrueba);

  //Prueba
  const aniadirContacto = (nuevoContacto) => {
    // setContactos([...contactos, nuevoContacto]);
    setContactos((prev) => [...prev, nuevoContacto]);
  };

  //Prueba
  const borrarContacto = (idContacto) => {
    // const result = contactos.filter((contacto, indice) => indice != idContacto);
    // setContactos(result);
    setContactos((prev) => [
      ...prev.filter((contacto, indice) => indice !== idContacto),
    ]);
  };

  //Prueba
  const modificarContacto = (idContacto, contactoModificado) => {
    const result = contactos.slice();
    result[idContacto].link = contactoModificado;
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

            {contactos.map((contacto, indice) => {
              return (
                <>
                  {indice == 0 && <Divider variant="inset" component="li" />}
                  <ListItem
                    key={indice}
                    secondaryAction={
                      <>
                        <ModificarContacto
                          idContacto={indice}
                          modificarContacto={modificarContacto}
                          contacto={contacto.link}
                        />
                        <BorrarContacto
                          idContacto={indice}
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
                    <ListItemText primary={contacto.link} />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </>
  );
}
