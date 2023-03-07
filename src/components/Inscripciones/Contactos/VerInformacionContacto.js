import React, { useState, useEffect } from "react";
//MUI
import {
  Box,
  Button,
  CardHeader,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
//
import { useModal } from "../../../hooks/useModal";
import DialogCustom from "../../Material UI - Componentes Modificados/DialogCustom";
import AvatarCustom from "../../Material UI - Componentes Modificados/AvatarCustom";
import CopiarButton from "../../CopiarButton";
import { SocialIcons } from "../../PerfilUsuario/SocialIcons";
import MensajeFeedback from "../../MensajeFeedback";
import { isValidUrl } from "../../../helpers/valiidarUrl";
import { peticionListarContactos } from "../../../api/alumnos/gestionContactosApi";
import SpinnerMoonLoaderMedium from "../../Spinners/SpinnerMoonLoaderMedium";

//

/*** Componente VerInformacionContacto ***/
const VerInformacionContacto = ({ alumno, idAlumno, idcursada }) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  const [contactos, setContactos] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  /******************************************
   * Funcion para cargar los contactos del usuario
   */
  const listarContactos = async () => {
    setIsLoading(true);
    //Realizo peticion
    try {
      const respuesta = await peticionListarContactos(
        idAlumno,
        idcursada,
        null
      );
      console.log(respuesta.data.data.contactos);
      setContactos(respuesta.data.data.contactos);
    } catch (error) {
      //Ocurrio un error
      // const response = error.response.data;
      // setErrors(response.data);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Tooltip
        title="Ver información de contacto"
        TransitionComponent={Zoom}
        arrow
      >
        <span>
          <IconButton
            color="secondary"
            size="small"
            onClick={() => {
              handleOpen();
              listarContactos();
            }}
          >
            <ContactsOutlinedIcon sx={{ fontSize: "1.4rem" }} />
          </IconButton>
        </span>
      </Tooltip>

      <DialogCustom open={isOpen} onClose={handleClose}>
        <DialogTitle display="flex" flexDirection="row">
          <ContactsOutlinedIcon sx={{ alignSelf: "center", marginRight: 1 }} />
          Información de contacto
        </DialogTitle>

        <DialogContent>
          <Divider />
          <CardHeader
            avatar={
              <AvatarCustom
                sx={{
                  height: 40,
                  width: 40,
                }}
                valueOne={alumno.Apellidos}
                valueTwo={alumno.Nombres}
                outlined={true}
              />
            }
            title={
              <Typography
                gutterBottom
                variant="subtitle2"
                sx={{ fontSize: "1.2rem", mb: "0" }}
                padding={0}
              >
                {alumno.Apellidos + " " + alumno.Nombres}
              </Typography>
            }
            subheader={
              <Typography
                variant="body2"
                color="text.secondary"
                display="flex"
                alignItems="center"
                justifyContent="left"
                textAlign="center"
              >
                {alumno.Email}
              </Typography>
            }
          />
          <Divider />

          <List>
            {isLoading && (
              <Box component="div" display="flex" justifyContent="center">
                <SpinnerMoonLoaderMedium />
              </Box>
            )}

            {!isLoading && contactos.length == 0 && (
              <ListItem key="0">
                <ListItemText>
                  <MensajeFeedback>
                    El alumno aún no añadió información de contacto.
                  </MensajeFeedback>
                </ListItemText>
              </ListItem>
            )}

            {!isLoading &&
              contactos.length != 0 &&
              contactos.map((contacto, indice) => {
                return (
                  <ListItem
                    secondaryAction={
                      <CopiarButton textoCopiar={contacto.Perfil} />
                    }
                  >
                    <ListItemAvatar>
                      <IconButton>
                        <SocialIcons name={contacto.Nombre} />
                      </IconButton>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        isValidUrl(contacto.Perfil) ? (
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
                        )
                      }
                      secondary={contacto.Nombre}
                    ></ListItemText>
                  </ListItem>
                );
              })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            // color="secondary"
            onClick={() => {
              handleClose();
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </DialogCustom>
    </>
  );
};

export default VerInformacionContacto;
