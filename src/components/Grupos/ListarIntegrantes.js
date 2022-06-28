import React from "react";
//MUI
import { Button, Zoom } from "@mui/material";
import { useModal } from "../useModal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
//
import ListarIntegrantesContenedor from "./ListarIntegrantes/ListarIntegrantesContenedor";

export const ListarIntegrantes = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  function Volver() {
    handleClose();
  }
  return (
    <>
      <Tooltip title="Listar integrantes" TransitionComponent={Zoom} arrow>
        <span>
          <IconButton
            aria-label="listar"
            size="small"
            color="secondary"
            onClick={handleOpen}
          >
            <SupervisorAccountIcon />
          </IconButton>
        </span>
      </Tooltip>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} fullScreen>
        <DialogTitle>Integrantes de {props.grupo.Grupo}</DialogTitle>

        <ListarIntegrantesContenedor
          cursada={props.cursada}
          grupo={props.grupo}
        />

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
