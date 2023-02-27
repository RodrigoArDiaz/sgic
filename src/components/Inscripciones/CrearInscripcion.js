import React from "react";
//MUI
import { Button, DialogContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
//
import { useModal } from "../useModal";
import AgregarInscripcionesContenedor from "./Agregar/AgregarInscripcionesContenedor";
import DialogFullCustom from "../Material UI - Componentes Modificados/DialogFullCustom";

/*** Componente CrearInscripcion ***/
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
        icon="add"
      >
        <DialogContent>
          <AgregarInscripcionesContenedor cursada={props.cursada} />
        </DialogContent>
      </DialogFullCustom>
    </>
  );
};
