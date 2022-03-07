import React from "react";
import { Button } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//import { useModal } from '../hooks/useModal';
import { useModal } from "../useModal";
//import { useModal } from '/materi';
export const AltaPractico = () => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  return (
    <>
      <Tooltip title="Alta">
        <IconButton color="secondary" onClick={handleOpen}>
          <CheckCircle />
        </IconButton>
      </Tooltip>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Alta práctico</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea dar de alta el práctico?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
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
