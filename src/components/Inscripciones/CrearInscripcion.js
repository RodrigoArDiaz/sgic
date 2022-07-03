import React from "react";
import { Button, DialogContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useModal } from "../useModal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import AgregarInscripcionesContenedor from "./Agregar/AgregarInscripcionesContenedor";

export const CrearInscripcion = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  function Volver() {
    props.refrescar();
    handleClose();
  }
  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        fullWidth
        onClick={handleOpen}
      >
        agregar inscripciones
      </Button>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} fullScreen>
        <DialogContent>
          <AgregarInscripcionesContenedor cursada={props.cursada} />
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              Volver();
            }}
          >
            Volver
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
