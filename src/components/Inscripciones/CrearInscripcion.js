import React from "react";
import { Button, DialogContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useModal } from "../useModal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import AgregarInscripcionesContenedor from "./Agregar/AgregarInscripcionesContenedor";
import DialogFullCustom from "../Material UI - Componentes Modificados/DialogFullCustom";

export const CrearInscripcion = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

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
      <DialogFullCustom
        open={isOpen}
        onClose={handleClose}
        title="Agregar inscripción"
        // subtitle={"Integrantes: " + props.grupo.Grupo}
        icon="add"
      >
        <DialogContent>
          <AgregarInscripcionesContenedor cursada={props.cursada} />
        </DialogContent>
      </DialogFullCustom>
    </>
  );
};
