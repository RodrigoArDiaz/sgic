import * as React from "react";
import {
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { useModal } from "../../useModal";
import DialogCustom from "../../Material UI - Componentes Modificados/DialogCustom";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  peticionBuscarEnunciadoCorreccionesPractico,
  peticionBuscarMisNotasPracticos,
} from "../../../api/alumnos/notasApi";
import { routes } from "../../../routes";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import MensajeFeedback from "../../MensajeFeedback";
import SpinnerMoonLoaderMedium from "../../Spinners/SpinnerMoonLoaderMedium";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

export const BotonAccionesPractico = ({ IdPractico, label }) => {
  //Hooks para manejo de modal
  const [isOpen, handleOpen, handleClose] = useModal(false);

  //Estado peticion
  const [isLoading, setIsLoading] = useState(false);

  //
  const [isDisabled, setIsDisabled] = useState(true);

  //Variable de estado que contiene json con datos
  const [enunciadoCorreccion, setEnunciadoCorreccion] = useState([]);

  //Recupero informacion de cursada
  const { cursada } = useSelector((state) => state.cursada);

  //Hooks para redireccionar con React Router
  const navegar = useNavigate();

  //Peticion de buscar
  const handleBuscarEnunciadoCorreccionesPractico = async () => {
    setIsLoading(true);
    setIsDisabled(true);
    //Realizo peticon
    try {
      const respuesta = await peticionBuscarEnunciadoCorreccionesPractico(
        cursada.IdCursada,
        IdPractico,
        null
      );

      //   console.log(respuesta.data.res[0]);

      setEnunciadoCorreccion(respuesta.data.res[0]);

      let enunciado = respuesta.data.res[0].Enunciado;
      if (!(enunciado == "-" || enunciado.lenght == 0)) {
        setIsDisabled(false);
      }
    } catch (error) {
      if (error.response && error.response.status == 401) {
        //Sesion caducada (sin autorización)
        navegar(routes.iniciarSesion);
      }
    }
    setIsLoading(false);
  };

  //Carga correcciones
  useEffect(() => {
    handleBuscarEnunciadoCorreccionesPractico();
  }, []);

  return (
    <Box justifyContent="space-evenly" display="flex">
      <Grid item xs={12} sm="auto">
        <Tooltip title="Ver enunciado" TransitionComponent={Zoom} arrow>
          <span>
            <IconButton
              color="secondary"
              size="small"
              onClick={() => {
                window.open(enunciadoCorreccion.Enunciado, "_blank");
              }}
              disabled={isDisabled}
            >
              <DescriptionOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Grid>

      <Grid item xs={12} sm="auto">
        <>
          <Tooltip title="Ver correcciones" TransitionComponent={Zoom} arrow>
            <span>
              <IconButton
                color="secondary"
                size="small"
                onClick={() => {
                  // handleBuscarEnunciadoCorreccionesPractico();
                  handleOpen();
                }}
              >
                <BorderColorOutlinedIcon />
              </IconButton>
            </span>
          </Tooltip>

          {/* Ventana modal */}
          <DialogCustom open={isOpen} onClose={handleClose} maxWidth="xs">
            <DialogTitle display="flex" flexDirection="row">
              <BorderColorOutlinedIcon
                sx={{ alignSelf: "center", marginRight: 1 }}
              />
              Correcciones - {label}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {isLoading && <SpinnerMoonLoaderMedium />}

                {!isLoading &&
                  enunciadoCorreccion &&
                  (enunciadoCorreccion.Correcciones == "-" ? (
                    <MensajeFeedback tipo="success">
                      <AlertTitle>Sin correcciones</AlertTitle>
                    </MensajeFeedback>
                  ) : (
                    <Box display="flex" flexDirection="column" gap={2}>
                      <MensajeFeedback tipo="info">
                        <AlertTitle>Con correcciones</AlertTitle>
                        {enunciadoCorreccion.Correcciones}
                      </MensajeFeedback>
                    </Box>
                  ))}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="outlined">
                Cancelar
              </Button>
            </DialogActions>
          </DialogCustom>
        </>
      </Grid>
    </Box>
  );
};
