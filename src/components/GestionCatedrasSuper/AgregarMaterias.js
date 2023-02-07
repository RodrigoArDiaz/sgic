import React from "react";
//MUI
import {
  Button,
  IconButton,
  Tooltip,
  useMediaQuery,
  Zoom,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AddCardOutlined, AddCircle } from "@mui/icons-material";
//Hooks personalizados
import { useModal } from "../useModal";
//Componentes propios
import CatedrasMateriasContenedor from "./AgregarMaterias/CatedrasMateriasContenedor";
import { useTheme } from "@emotion/react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export const AgregarMaterias = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esMd = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <>
      <Tooltip title="Agregar materias" TransitionComponent={Zoom} arrow>
        <span>
          <IconButton color="secondary" size="small" onClick={handleOpen}>
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
        </span>
      </Tooltip>

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
        <DialogTitle display="flex" flexDirection="row">
          <AddCircleOutlineOutlinedIcon
            sx={{ alignSelf: "center", marginRight: 1 }}
          />
          Agregar Materia - {props.catedra}
        </DialogTitle>
        <DialogContent sx={{ px: 0, pb: 0 }}>
          <CatedrasMateriasContenedor idcatedra={props.idcatedra} />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
