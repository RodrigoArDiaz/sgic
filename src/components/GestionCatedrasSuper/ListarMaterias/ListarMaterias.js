import React from "react";
//MUI
import { Button, IconButton, Tooltip, Zoom } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
//Hooks personalizados
import { useModal } from "../../useModal";
//Componentes propios
import CatedrasMateriasContenedorLista from "./CatedrasMateriasContenedorLista";
import DialogCustom from "../../Material UI - Componentes Modificados/DialogCustom";

/*** Componente ListarMaterias ***/
export const ListarMaterias = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  return (
    <>
      <Tooltip title=" Listar Materias" TransitionComponent={Zoom} arrow>
        <span>
          <IconButton color="secondary" size="small" onClick={handleOpen}>
            <FormatListBulletedOutlinedIcon />
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
        maxWidth="lg"
      >
        <DialogTitle display="flex" flexDirection="row">
          <FormatListBulletedOutlinedIcon
            sx={{ alignSelf: "center", marginRight: 1 }}
          />
          Materias de la cátedra - {props.catedra}
        </DialogTitle>

        <DialogContent sx={{ px: 0 }}>
          <CatedrasMateriasContenedorLista idcatedra={props.idcatedra} />
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
