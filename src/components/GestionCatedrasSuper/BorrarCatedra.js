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
import DialogCustom from "../Material UI - Componentes Modificados/DialogCustom";

export const BorrarCatedra = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  const navegar = useNavigate();

  async function consultas(data, cadena) {
    const response = await fetch(cadena, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.json();
  }

  function BorrarCatedra() {
    var data = {
      IdCatedra: props.idcatedra,
    };

    //console.log(props.idcatedra+"ID de la catedra");
    consultas(data, "http://127.0.0.1:8000/api/borrarcatedra")
      .then((response) => {
        console.log(response);
        if (response.Mensaje === "OK") {
          handleClose();
          props.abrir(true);
          props.mensaje("Cátedra borrada con éxito");
          props.tipo("success");
          props.refrescar();
          //console.log("Borrado");
        } else {
          //console.log("No Borrado");
          //setEstado('2');
          handleClose();
          props.abrir(true);
          props.mensaje(response.Mensaje);
          props.tipo("error");
        }
      })
      .catch((error) => {
        console.log("Error de conexión en borrar" + error);
        navegar("/registrarse");
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
