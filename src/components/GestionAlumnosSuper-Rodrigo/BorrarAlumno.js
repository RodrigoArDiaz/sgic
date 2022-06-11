import React, { useEffect, useState } from "react";
//MUI
import { Button } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
//
import { useModal } from "../../hooks/useModal";
//
import { useSnackbar } from "notistack";

export const BorrarAlumno = () => {
  //Control de la ventana modal
  const [isOpen, handleOpen, handleClose] = useModal(false);
  //
  const { enqueueSnackbar } = useSnackbar();

  //
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    console.log(error);
  }, [error]);

  const handleBorrarAlumno = () => {
    const x = Math.floor(Math.random() * (10 + 1));
    console.log(x);
    if (x % 2 == 0) {
      console.log("No hay error");
      setError(false);
      setMensaje("");
      handleClose();
      enqueueSnackbar("Se borro al alumno con exito.", {
        variant: "success",
      });
    } else {
      console.log("Hay error");
      setError(true);
      setMensaje("Hubo un error");
    }
  };

  return (
    <>
      <Tooltip title="Borrar">
        <IconButton color="secondary" onClick={handleOpen}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Borrar alumno</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea borrar al alumno?
          </DialogContentText>
        </DialogContent>
        <Box>{mensaje}</Box>
        <DialogActions>
          <Button variant="contained" onClick={handleBorrarAlumno}>
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
