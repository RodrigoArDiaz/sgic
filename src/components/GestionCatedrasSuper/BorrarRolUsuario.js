import React from "react";
//MUI
import { Button } from "@mui/material";
import { Tooltip, Zoom } from "@mui/material";
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
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";

/*** Componente BorrarRolUsuario ***/
export const BorrarRolUsuario = (props) => {
  //Recupero token
  const token = localStorage.getItem("tkn");

  const [isOpen, handleOpen, handleClose] = useModal(false);

  const navegar = useNavigate();

  async function consultas(data, cadena) {
    //Adjunto token
    data = { ...data, ...{ token: token } };
    console.log(data);
    const response = await fetch(cadena, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  }

  function BorrarRolUsuario() {
    var data = {
      // IdCatedra: props.idcatedra,
      IdUsuario: props.idusuario,
      pidCa: props.idcatedra,
      pidDoc: props.documentoUsuario,
    };

    consultas(data, endpoints.borrarUsCat)
      .then((response) => {
        console.log(response);
        if (response.Mensaje === "OK") {
          handleClose();
          props.abrir(true);
          props.mensaje("Usuario borrado con éxito");
          props.tipo("success");
          props.refrescar();
        }

        if (response.Error != undefined) {
          handleClose();
          props.mensaje(response.Error);
          props.tipo("error");
          props.abrir(true);
        }
      })
      .catch((error) => {
        navegar(routes.iniciarSesion);
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
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle display="flex" flexDirection="row">
          <DeleteOutlined sx={{ alignSelf: "center", marginRight: 1 }} />
          Borrar rol usuario
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea quitar al usuario de la cátedra?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={BorrarRolUsuario}>
            Aceptar
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
