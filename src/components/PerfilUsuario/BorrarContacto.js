import React from "react";
//MUI
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
//hooks personalizados
import { useModal } from "../../hooks/useModal";

export const BorrarContacto = ({ idContacto, borrarContacto }) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleBorrarContacto = () => {
    borrarContacto(idContacto);

    //Si se realizo con exito
    handleClose();
    enqueueSnackbar("Se borro el contacto con exito", {
      variant: "success",
    });
  };

  return (
    <>
      <Tooltip title="Borrar">
        <IconButton
          edge="end"
          aria-label="delete"
          color="secondary"
          onClick={handleOpen}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Borrar contacto</DialogTitle>
        <DialogContent>
          <Typography>¿Seguro que desea borrar este contacto?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleBorrarContacto}>
            Borrar
          </Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
