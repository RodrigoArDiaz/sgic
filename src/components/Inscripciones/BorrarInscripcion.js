import React from "react";
//MUI
import { Button, Zoom } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteOutlined } from "@mui/icons-material";
//
import { useModal } from "../useModal";
import { useNavigate } from "react-router-dom";
import * as Responses from "../Responses";
import { estiloModalMain } from "../../styles/EstilosModal";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";

/*** Componente BorrarInscripcion ***/
export const BorrarInscripcion = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  const navegar = useNavigate();

  function BorrarAlumno() {
    var data = {
      pidUs: props.idalumno,
      pidCu: props.idcursada,
    };

    Responses.consultas(data, endpoints.borrarInscripcion)
      .then((response) => {
        if (Responses.status === 200) {
          handleClose();
          props.abrir(true);
          props.mensaje(response.Mensaje);
          props.tipo("success");
          props.refrescar();
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
        } else if (Responses.status === 460) {
          handleClose();
          props.abrir(true);
          props.mensaje(response.Error);
          props.tipo("error");
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
      });
  }

  return (
    <>
      <Tooltip title="Borrar" TransitionComponent={Zoom} arrow>
        <span>
          <IconButton color="secondary" size="small" onClick={handleOpen}>
            <DeleteOutlined />
          </IconButton>
        </span>
      </Tooltip>

      {/* Ventana modal */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        sx={estiloModalMain}
      >
        <DialogTitle display="flex" flexDirection="row">
          <DeleteOutlined sx={{ alignSelf: "center", marginRight: 1 }} />
          Borrar inscripción
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea borrar la inscripción?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={BorrarAlumno}>
            Aceptar
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
