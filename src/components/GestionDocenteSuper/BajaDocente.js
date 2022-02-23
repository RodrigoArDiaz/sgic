import React from "react";
//Mui
import { Button, Zoom } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//Hooks personalizados
import { useModal } from "../../hooks/useModal";
//
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { peticionBajaDocente } from "../../api/super/gestionDocentesApi";

export const BajaDocente = ({ docente, handleRefrescarPagina }) => {
  //
  const [isOpen, handleOpen, handleClose] = useModal(false);
  //
  const { enqueueSnackbar } = useSnackbar();
  //Recupero token
  const { token } = useSelector((state) => state.login);

  //
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
      <Tooltip title="Baja" TransitionComponent={Zoom}>
        <span>
          {/** span: Para prevenir error de eventos provocado por el componente Tooltip cuando Button esta en estado disabled */}
          <IconButton
            color="secondary"
            onClick={handleOpen}
            disabled={docente.Estado == "B" ? true : false}
          >
            <CancelIcon />
          </IconButton>
        </span>
      </Tooltip>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Baja docente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea dar de baja al docente?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleBajaDocente}>
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
