import React from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useModal } from "../useModal";

import CursadasContenedor from "../Cursadas/CursadasContenedor";
import BuildIcon from "@mui/icons-material/Build";

//Redux
import { useSelector } from "react-redux";

export const GestionarCursadas = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  //Manejo del titulo e items del menu
  const { jsonMateria } = useSelector((state) => state.materia);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<BuildIcon />}
        //size='small'
        fullWidth
        color="primary"
        onClick={handleOpen}
      >
        Gestionar cursadas
      </Button>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} maxWidth="lg" fullScreen>
        <DialogContent>
          <CursadasContenedor
            Materia={props.Materia}
            idmateria={jsonMateria.IdMateria}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Volver
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
