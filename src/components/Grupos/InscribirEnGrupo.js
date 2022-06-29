import React from "react";
import { Button, DialogContent, Zoom } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import RedoIcon from "@mui/icons-material/Redo";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useModal } from "../useModal";
import ListarIntegrantesContenedor from "./InscribirEnGrupo/ListarIntegrantesContenedor";

export const InscribirEnGrupo = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  function Volver() {
    handleClose();
  }

  return (
    <>
      <Tooltip title="Inscribir alumnos" TransitionComponent={Zoom} arrow>
        <span>
          <IconButton color="primary" onClick={handleOpen}>
            <RedoIcon />
          </IconButton>
        </span>
      </Tooltip>

      {/* Ventana modal */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        //maxWidth="xs"
        fullScreen
      >
        <DialogContent>
          <ListarIntegrantesContenedor
            grupo={props.grupo}
            cursada={props.cursada}
          />
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
