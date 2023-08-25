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
//Hooks personalizados
import { useModal } from "../useModal";
import { useNavigate } from "react-router-dom";
import * as Responses from "../Responses";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";

/*** Componente BorrarExamen***/
export const BorrarExamen = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  const navegar = useNavigate();

  React.useEffect(() => {
    console.log(props.cursada);
  }, []);

  function BorrarExamen() {
    var data = {
      // pidCu: props.idcursada,
      pidCu: props.cursada.IdCursada,
      pidE: props.examen.IdExamen,
    };

    Responses.consultas(data, endpoints.borrarExamen)
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
        sx={{
          backdropFilter: "blur(0.8px)",
        }}
      >
        <DialogTitle display="flex" flexDirection="row">
          <DeleteOutlined sx={{ alignSelf: "center", marginRight: 1 }} />
          Borrar examen
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea borrar el examen?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={BorrarExamen}>
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
