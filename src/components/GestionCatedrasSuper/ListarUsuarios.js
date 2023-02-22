import React from "react";
//MUI
import {
  Button,
  IconButton,
  Tooltip,
  useMediaQuery,
  Zoom,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@emotion/react";
import { useModal } from "../useModal";
import CatedrasUsuariosContenedorLista from "./ListarUsuarios/CatedrasUsuariosContenedorLista";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DialogCustom from "../Material UI - Componentes Modificados/DialogCustom";

/*** Componente ListarUsuarios ***/
export const ListarUsuarios = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  //Para estilos segun tamaño screen
  const theme = useTheme();

  return (
    <>
      <Tooltip title="Listar usuarios" TransitionComponent={Zoom} arrow>
        <span>
          <IconButton color="secondary" size="small" onClick={handleOpen}>
            <PeopleAltOutlinedIcon />
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
        {/* <DialogTitle>Usuarios de la cátedra - {props.catedra}</DialogTitle> */}
        <DialogTitle display="flex" flexDirection="row">
          <PeopleAltOutlinedIcon sx={{ alignSelf: "center", marginRight: 1 }} />
          Lista de usuarios - {props.catedra}
        </DialogTitle>

        <DialogContent sx={{ paddingX: 0 }}>
          <CatedrasUsuariosContenedorLista idcatedra={props.idcatedra} />
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
