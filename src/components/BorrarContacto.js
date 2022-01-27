import React from "react";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useModal } from "../hooks/useModal";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";

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
