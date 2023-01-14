import React, { useEffect, useState } from "react";
//
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//Material UI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Typography } from "@mui/material";
//Responses
import * as Responses from "../Responses";
//Routes
import { routes } from "../../routes/index";
import DialogCustom from "../Material UI - Componentes Modificados/DialogCustom";
import { endpoints } from "../../api/endpoints";
import MensajeFeedback from "../MensajeFeedback";

export default function ActivarCuenta() {
  const navegar = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [texto, setTexto] = React.useState("");
  const [tipoError, setTipoError] = useState(false);

  const Activar = useParams();

  //***********/
  const handleClose = () => {
    setOpen(false);
    navegar(routes.iniciarSesion);
  };

  //***********/
  useEffect(() => {
    var data = {
      Codigo: Activar.codigoActivacion,
    };

    //Peticion
    Responses.consultas(data, endpoints.activarCuenta)
      .then((response) => {
        if (Responses.status === 200) {
          setTexto(response.Mensaje);
          setOpen(true);
          setTipoError(true);
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
        } else if (Responses.status === 460) {
          setTexto(response.Error);
          setOpen(true);
          setTipoError(false);
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
      });
  }, []);

  return (
    <DialogCustom
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={"sm"}
    >
      <DialogTitle id="alert-dialog-title">Activar cuenta</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <MensajeFeedback tipo="info" alertTitleVisible={true}>
            {/* {texto} */}
            Usuario dado de alta. Puede iniciar sesión.
          </MensajeFeedback>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Aceptar
        </Button>
      </DialogActions>
    </DialogCustom>
  );
}
