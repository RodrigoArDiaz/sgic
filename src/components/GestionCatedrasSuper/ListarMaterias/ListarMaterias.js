import React from "react";
//MUI
import {
  Button,
  IconButton,
  Tooltip,
  useMediaQuery,
  Zoom,
} from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
//Hooks personalizados
import { useModal } from "../../useModal";
//Componentes propios
import CatedrasMateriasContenedorLista from "./CatedrasMateriasContenedorLista";
import { useTheme } from "@emotion/react";
import DialogCustom from "../../Material UI - Componentes Modificados/DialogCustom";
import { DeleteOutlined } from "@mui/icons-material";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";

export const ListarMaterias = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <>
      {/* <Button
        startIcon={<ViewListIcon />}
        size="small"
        color="secondary"
        onClick={handleOpen}
      >
        Listar Materias
      </Button> */}

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
