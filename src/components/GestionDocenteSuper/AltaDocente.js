import React from "react";
//MUI
import { Button } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//Hooks personalizados
import { useModal } from "../../hooks/useModal";
//
import { useSnackbar } from "notistack";

export const AltaDocente = ({ docente }) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  //
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleAltaDocente = () => {
    //Realizo peticon

    //Si petiocion ok
    handleClose();
    enqueueSnackbar("Se dio de alta al docente con exito.", {
      variant: "success",
    });
  };

  return (
    <>
      <Tooltip title="Alta">
        <span>
          {/** span: Para prevenir error de eventos provocado por el componente Tooltip cuando Button esta en estado disabled */}
          <IconButton
            color="secondary"
            onClick={handleOpen}
            disabled={docente.Estado == "A" ? true : false}
          >
            <CheckCircle />
          </IconButton>
        </span>
      </Tooltip>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Alta docente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea dar de alta al docente?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleAltaDocente}>
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
