import React from "react";
//MUI
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import BuildIcon from "@mui/icons-material/Build";
//Hooks personalizados
import { useModal } from "../useModal";
//Componentes propios
import CursadasContenedor from "../Cursadas/CursadasContenedor";

export const GestionarCursadas = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<BuildIcon />}
        fullWidth
        color="secondary"
        onClick={handleOpen}
      >
        Gestionar cursadas
      </Button>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} maxWidth="lg" fullScreen>
        <DialogContent>
          <CursadasContenedor
          // Materia={props.Materia}
          // idmateria={props.idmateria}
          />
        </DialogContent>
        <DialogActions>
          {/* <Button variant='contained' onClick={handleClose}>Aceptar</Button> */}
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Volver
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
