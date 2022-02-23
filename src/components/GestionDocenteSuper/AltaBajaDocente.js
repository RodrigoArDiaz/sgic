import React, { useEffect, useState } from "react";
//MUI
import { Button, Zoom } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
//Hooks personalizados
import { useModal } from "../../hooks/useModal";
//
import { useSnackbar } from "notistack";
import {
  peticionAltaDocente,
  peticionBajaDocente,
} from "../../api/super/gestionDocentesApi";
import { useSelector } from "react-redux";

export const AltaBajaDocente = ({ docente, handleRefrescarPagina }) => {
  //
  const [isOpen, handleOpen, handleClose] = useModal(false);
  //
  const { enqueueSnackbar } = useSnackbar();
  //Recupero token
  const { token } = useSelector((state) => state.login);

  //Funcion decide que peticion llamar dependiendo del estado actual
  const handleClik = () => {
    if (docente.Estado == "A") {
      handleBajaDocente();
    }
    if (docente.Estado == "B") {
      handleAltaDocente();
    }
  };

  //Peticion de alta
  const handleAltaDocente = async () => {
    //Realizo peticon
    try {
      const respuesta = await peticionAltaDocente(docente.IdUsuario, token);
      //Si petiocion ok
      handleClose();
      enqueueSnackbar("Se dio de alta al docente con exito.", {
        variant: "success",
      });
      //
      handleRefrescarPagina();
    } catch (error) {
      const mensaje = error.response.data.data.mensaje;
      handleClose();
      enqueueSnackbar(`Error: ${mensaje}`, {
        variant: "error",
      });
    }
  };

  //Peticion de baja
  const handleBajaDocente = async () => {
    //Realizo peticon
    try {
      const respuesta = await peticionBajaDocente(docente.IdUsuario, token);
      //Si petiocion ok
      handleClose();
      enqueueSnackbar("Se dio de baja al docente con exito.", {
        variant: "success",
      });
      //
      handleRefrescarPagina();
    } catch (error) {
      const mensaje = error.response.data.data.mensaje;
      handleClose();
      enqueueSnackbar(`Error: ${mensaje}`, {
        variant: "error",
      });
    }
  };

  return (
    <>
      <Tooltip
        title={
          (docente.Estado == "A" && "Dar de baja") ||
          (docente.Estado == "B" && "Dar de alta")
        }
        TransitionComponent={Zoom}
      >
        <span>
          {/** span: Para prevenir error de eventos provocado por el componente Tooltip cuando Button esta en estado disabled */}
          <IconButton
            color="secondary"
            onClick={handleOpen}
            // disabled={docente.Estado == "A" ? true : false}
          >
            {(docente.Estado == "A" && (
              // <CancelIcon />
              <CancelOutlinedIcon sx={{ color: "error.light" }} />
            )) ||
              (docente.Estado == "B" && (
                //<CheckCircle />
                <CheckCircleOutlinedIcon sx={{ color: "success.light" }} />
              ))}
          </IconButton>
        </span>
      </Tooltip>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>
          {(docente.Estado == "A" && "Baja") ||
            (docente.Estado == "B" && "Alta")}{" "}
          docente
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea dar de{" "}
            {(docente.Estado == "A" && "baja") ||
              (docente.Estado == "B" && "alta")}{" "}
            al docente?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClik}>
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
