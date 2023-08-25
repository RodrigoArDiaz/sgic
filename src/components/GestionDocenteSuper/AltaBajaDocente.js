import React from "react";
//MUI
import { Button, Chip, Grid, Zoom } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";

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
      {docente.Estado === "A" && (
        <Grid item xs={12} sm="auto">
          <Chip
            variant="outlined"
            color="success"
            label="Alta"
            icon={<CheckCircleOutlineOutlined />}
            onClick={handleOpen}
          />
        </Grid>
      )}

      {docente.Estado === "B" && (
        <Grid item xs={12} sm="auto">
          <Chip
            variant="outlined"
            color="error"
            label="Baja"
            icon={<HighlightOffOutlinedIcon />}
            onClick={handleOpen}
          />
        </Grid>
      )}

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
          {(docente.Estado == "A" && (
            <HighlightOffOutlinedIcon
              sx={{ alignSelf: "center", marginRight: 1 }}
            />
          )) ||
            (docente.Estado == "B" && (
              <CheckCircleOutlineOutlined
                sx={{ alignSelf: "center", marginRight: 1 }}
              />
            ))}
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
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
