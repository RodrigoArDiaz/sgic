import React from "react";
import { Button } from "@mui/material";
import { Tooltip, Zoom } from "@mui/material";
import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useModal } from "../useModal";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@mui/icons-material";

export const BorrarRolUsuario = (props) => {
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

  function BorrarRolUsuario() {
    var data = {
      IdCatedra: props.idcatedra,
      IdUsuario: props.idusuario,
    };

    //console.log(props.idcatedra+"ID de la catedra");
    consultas(data, "http://127.0.0.1:8000/api/borraruscat")
      .then((response) => {
        console.log(response);
        if (response.Mensaje === "OK") {
          handleClose();
          props.abrir(true);
          props.mensaje("Usuario borrado con éxito");
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
      <Tooltip title="Borrar" TransitionComponent={Zoom}>
        <span>
          <IconButton color="secondary" size="large" onClick={handleOpen}>
            <DeleteOutlined />
          </IconButton>
        </span>
      </Tooltip>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Borrar rol usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea quitar al usuario de la catedra?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={BorrarRolUsuario}>
            Aceptar
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
