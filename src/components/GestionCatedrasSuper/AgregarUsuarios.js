import React from "react";
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
import { useModal } from "../useModal";
import { PersonAdd, PersonAddOutlined } from "@mui/icons-material";
import CatedrasUsuariosContenedor from "./CatedrasUsuariosContenedor";
import { useTheme } from "@emotion/react";
import DialogCustom from "../Material UI - Componentes Modificados/DialogCustom";

export const AgregarUsuarios = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <>
      <Tooltip title="Agregar usuarios" TransitionComponent={Zoom} arrow>
        <span>
          <IconButton color="secondary" size="small" onClick={handleOpen}>
            <PersonAddOutlined />
          </IconButton>
        </span>
      </Tooltip>

      {/* Ventana modal */}
      <DialogCustom
        open={isOpen}
        onClose={(event, reason) => {
          // Evita el cierre de la ventana modal al hacer clik fuera de la misma
          if (reason && reason == "backdropClick") return;
          handleClose();
        }}
        fullScreen={esXs ? true : false}
        maxWidth="lg"
      >
        <DialogTitle display="flex" flexDirection="row">
          <PersonAddOutlined sx={{ alignSelf: "center", marginRight: 1 }} />
          Agregar usuarios - {props.catedra}
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          <CatedrasUsuariosContenedor idcatedra={props.idcatedra} />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cerrar
          </Button>
        </DialogActions>
      </DialogCustom>
    </>
  );
};
