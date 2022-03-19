import React from "react";
import { Button, useMediaQuery } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@emotion/react";
import { useModal } from "../useModal";
import CatedrasUsuariosContenedorLista from "./ListarUsuarios/CatedrasUsuariosContenedorLista";

export const ListarUsuarios = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <>
      <Button
        startIcon={<ViewListIcon />}
        size="small"
        color="secondary"
        onClick={handleOpen}
      >
        Listar Usuarios
      </Button>

      {/* Ventana modal */}
      <Dialog
        open={isOpen}
        onClose={(event, reason) => {
          // Evita el cierre de la ventana modal al hacer clik fuera de la misma
          if (reason && reason == "backdropClick") return;
          handleClose();
        }}
        maxWidth="lg"
        fullWidth
        fullScreen={esXs ? true : false}
        sx={{
          backdropFilter: "blur(0.8px)",
        }}
      >
        <DialogTitle>Usuarios de la cátedra - {props.catedra}</DialogTitle>
        <DialogContent>
          <CatedrasUsuariosContenedorLista idcatedra={props.idcatedra} />
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
