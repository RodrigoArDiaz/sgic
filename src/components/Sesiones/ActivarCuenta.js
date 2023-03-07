import React, { useEffect, useState } from "react";
//
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//Material UI
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, Typography } from "@mui/material";

//Responses
import * as Responses from "../Responses";
//Routes
import { routes } from "../../routes/index";
import DialogCustom from "../Material UI - Componentes Modificados/DialogCustom";
import { endpoints } from "../../api/endpoints";
import MensajeFeedback from "../MensajeFeedback";
import { MoonLoader } from "react-spinners";
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../styles/EstilosSpinners";

export default function ActivarCuenta() {
  const navegar = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [texto, setTexto] = React.useState("");
  const [tipoError, setTipoError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const Activar = useParams();

  //***********/
  const handleClose = () => {
    setOpen(false);
    navegar(routes.iniciarSesion);
  };

  //***********/
  useEffect(() => {
    setIsLoading(false);

    var data = {
      Codigo: Activar.codigoActivacion,
    };

    //Peticion
    Responses.consultas(data, endpoints.activarCuenta)
      .then((response) => {
        setIsLoading(true);
        if (Responses.status === 200) {
          //Usuario activado correctamente
          setTexto(response.Mensaje);
          setOpen(true);
          setTipoError(false);
        } else if (Responses.status === 401) {
          //Usuario sin autenticar
          navegar(routes.iniciarSesion);
        } else if (Responses.status === 460) {
          //Error al activar
          setTexto(response.Error);
          setOpen(true);
          setTipoError(true);
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
      });
  }, []);

  return (
    <>
      {/* <CardMainPage visibleHeader={false} sx={{ p: 3 }}> */}
      {!isLoading && (
        <>
          <Box component="div" display="flex" justifyContent="center">
            <MoonLoader color={colorMainSpinner} size={sizeMainSpinner} />
          </Box>
          <Typography variant="h5" margin={2}>
            Activando cuenta
          </Typography>
        </>
      )}
      {/* </CardMainPage> */}

      <DialogCustom
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Activar cuenta</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <MensajeFeedback
              tipo={tipoError ? "error" : "info"}
              alertTitleVisible={true}
            >
              {/* {texto} */}

              {tipoError
                ? texto
                : "  Usuario dado de alta. Puede iniciar sesión."}
            </MensajeFeedback>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Aceptar
          </Button>
        </DialogActions>
      </DialogCustom>
    </>
  );
}
