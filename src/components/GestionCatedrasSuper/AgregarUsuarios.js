import React from "react";
import { Button, useMediaQuery } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useModal } from "../useModal";
import { PersonAdd } from "@mui/icons-material";
import CatedrasUsuariosContenedor from "./CatedrasUsuariosContenedor";
import { useTheme } from "@emotion/react";

export const AgregarUsuarios = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <>
      <Button
        startIcon={<PersonAdd />}
        size="small"
        color="secondary"
        onClick={handleOpen}
      >
        Agregar usuarios
      </Button>

      {/* Ventana modal */}
      <Dialog
        open={isOpen}
        onClose={(event, reason) => {
          // Evita el cierre de la ventana modal al hacer clik fuera de la misma
          if (reason && reason == "backdropClick") return;
          handleClose();
        }}
        fullScreen={esXs ? true : false}
        maxWidth="lg"
      >
        <DialogTitle>Agregar usuarios - {props.catedra}</DialogTitle>
        <DialogContent>
          <CatedrasUsuariosContenedor idcatedra={props.idcatedra} />
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
