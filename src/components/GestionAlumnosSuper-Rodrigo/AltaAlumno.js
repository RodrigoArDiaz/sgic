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
//
import { useModal } from "../../hooks/useModal";
//
import { useSnackbar } from "notistack";

export const AltaAlumno = ({ alumno }) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  //Para el manejo del snackbar
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleAltaAlumno = () => {
    //Realizo peticon

    //Si petiocion ok
    handleClose();
    enqueueSnackbar("Se dio de alta al alumno con exito.", {
      variant: "success",
    });
  };

  return (
    <>
      <Tooltip title="Alta">
        <span>
          <IconButton
            color="secondary"
            onClick={handleOpen}
            disabled={alumno.Estado == "A" ? true : false}
          >
            <CheckCircle />
          </IconButton>
        </span>
      </Tooltip>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Alta alumno</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea dar de alta al alumno?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleAltaAlumno}>
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
