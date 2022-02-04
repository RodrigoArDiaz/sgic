import React from "react";
//Mui
import { Button } from "@mui/material";
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

export const BajaDocente = ({ estado }) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleBajaDocente = () => {
    //Realizo peticon

    //Si petiocion ok
    handleClose();
    enqueueSnackbar("Se dio de baja al docente con exito.", {
      variant: "success",
    });
  };

  return (
    <>
      <Tooltip title="Baja">
        <IconButton
          color="secondary"
          onClick={handleOpen}
          disabled={estado == "B" ? true : false}
        >
          <CancelIcon />
        </IconButton>
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
