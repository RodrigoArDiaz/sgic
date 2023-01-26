import React, { useState } from "react";
import {
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
import { useModal } from "../../../hooks/useModal";
import DialogCustom from "../../Material UI - Componentes Modificados/DialogCustom";
import AvatarCustom from "../../Material UI - Componentes Modificados/AvatarCustom";
import CopiarButton from "../../CopiarButton";
import { SocialIcons } from "../../PerfilUsuario/SocialIcons";
import MensajeFeedback from "../../MensajeFeedback";

//Chequea si un string es url o no
const isValidUrl = (urlString) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

const contactosPrueba = [
  {
    Nombre: "Facebook",
    Perfil: "https://www.facebook.com/jonhsmith",
  },
  { Nombre: "Whatsapp", Perfil: "+549381102030" },
  { Nombre: "Github", Perfil: "https://github.com/..." },
  { Nombre: "Slack", Perfil: "https://slack.com/..." },
  { Nombre: "LinkedIn", Perfil: "https://linkedin.com/..." },
  { Nombre: "Gmail", Perfil: "jonhsmith2@gmail.com" },
  { Nombre: "Telefono", Perfil: "+549381102030" },
];

const VerInformacionContacto = ({ alumno, idAlumno }) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  const [contactos, setContactos] = useState(contactosPrueba);

  React.useEffect(() => {
    console.log(alumno);
  });

  return (
    <>
      <Tooltip
        title="Ver información de contacto"
        TransitionComponent={Zoom}
        arrow
      >
        <span>
          <IconButton color="secondary" size="small" onClick={handleOpen}>
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
            {contactos.length == 0 ? (
              <ListItem key="0">
                <ListItemText>
                  <MensajeFeedback>
                    El alumno aún no añadió información de contacto.
                  </MensajeFeedback>
                </ListItemText>
              </ListItem>
            ) : (
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
              })
            )}
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
