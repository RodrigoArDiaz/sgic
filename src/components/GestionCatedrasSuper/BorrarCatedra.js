import React from "react";
//MUI
import { Button, Zoom } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteOutlined } from "@mui/icons-material";
//
import { useModal } from "../useModal";
import { useNavigate } from "react-router-dom";
import DialogCustom from "../Material UI - Componentes Modificados/DialogCustom";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";

/*** Componente BorrarCatedra ***/
export const BorrarCatedra = (props) => {
  //Recupero token
  const token = localStorage.getItem("tkn");

  const [isOpen, handleOpen, handleClose] = useModal(false);

  const navegar = useNavigate();

  async function consultas(data, cadena) {
    //Adjunto token
    data = { ...data, ...{ token: token } };

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

  function BorrarCatedra() {
    var data = {
      IdCatedra: props.idcatedra,
    };

    consultas(data, endpoints.borrarCatedra)
      .then((response) => {
        console.log(response);
        if (response.Mensaje === "OK") {
          handleClose();
          props.abrir(true);
          props.mensaje("Cátedra borrada con éxito");
          props.tipo("success");
          props.refrescar();
        } else {
          handleClose();
          props.abrir(true);
          props.mensaje(response.Mensaje);
          props.tipo("error");
        }
      })
      .catch((error) => {
        console.log("Error de conexión en borrar" + error);
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
      <DialogCustom open={isOpen} onClose={handleClose} maxWidth="xs">
        <DialogTitle display="flex" flexDirection="row">
          <DeleteOutlined sx={{ alignSelf: "center", marginRight: 1 }} />
          Borrar cátedra
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea borrar la cátedra <b>{props.nombre}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={BorrarCatedra}>
            Aceptar
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </DialogCustom>
    </>
  );
};
