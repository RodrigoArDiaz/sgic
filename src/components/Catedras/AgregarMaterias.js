import React from "react";
//MUI
import { Button, useMediaQuery } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AddCircle } from "@mui/icons-material";
//Hooks personalizados
import { useModal } from "../useModal";
//Componentes propios
import CatedrasMateriasContenedor from "./AgregarMaterias/CatedrasMateriasContenedor";
import { useTheme } from "@emotion/react";

export const AgregarMaterias = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esMd = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <>
      <Button
        startIcon={<AddCircle />}
        size="small"
        color="secondary"
        onClick={handleOpen}
      >
        Agregar materias
      </Button>

      {/* Ventana modal */}
      <Dialog
        open={isOpen}
        maxWidth="lg"
        fullWidth
        fullScreen={esMd ? true : false}
        onClose={(event, reason) => {
          // Evita el cierre de la ventana modal al hacer clik fuera de la misma
          if (reason && reason == "backdropClick") return;
          handleClose();
        }}
        sx={{
          backdropFilter: "blur(0.8px)",
        }}
      >
        <DialogTitle>Agregar Materia - {props.catedra}</DialogTitle>
        <DialogContent>
          <CatedrasMateriasContenedor idcatedra={props.idcatedra} />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
