import React from "react";
import { Button } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useModal } from "../../hooks/useModal";
//
import { useSnackbar } from "notistack";

export const BorrarDocente = ({ docente }) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleBorrarDocente = () => {
    //Realizo peticon

    //Si petiocion ok
    handleClose();
    enqueueSnackbar("Se borro al docente con exito.", {
      variant: "success",
    });
  };

  return (
    <>
      <Tooltip title="Alta">
        <IconButton color="secondary" onClick={handleOpen}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Borrar docente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea borrar al docente?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleBorrarDocente}>
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
