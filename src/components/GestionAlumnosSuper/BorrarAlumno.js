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
//Hooks personalizados
import { useModal } from "../useModal";
//React router dom
import { useNavigate } from "react-router-dom";
import DialogCustom from "../Material UI - Componentes Modificados/DialogCustom";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";

/*** Componente BorrarAlumno ***/
export const BorrarAlumno = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  //Recupero token
  const token = localStorage.getItem("tkn");

  const navegar = useNavigate();

  //Peticion
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

  function BorrarAlumno() {
    var data = {
      pidUs: props.idalumno,
      token: localStorage.getItem("tkn"),
    };

    consultas(data, endpoints.borrarAlumno)
      .then((response) => {
        console.log(response);
        if (response.Mensaje === "OK") {
          handleClose();
          props.abrir(true);
          props.mensaje("Alumno borrado con éxito");
          props.tipo("success");
          props.refrescar();
        } else {
          handleClose();
          props.abrir(true);
          props.mensaje(response.Mensaje);
          props.tipo("error");
          console.log("error");
        }
      })
      .catch((error) => {
        console.log("Error de conexión en borrar" + error);
        navegar(routes.iniciarSesion);
      });
  }

  return (
    <>
      <Tooltip title="Borrar" TransitionComponent={Zoom}>
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
          Borrar alumno
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea borrar al alumno?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={BorrarAlumno}>
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
