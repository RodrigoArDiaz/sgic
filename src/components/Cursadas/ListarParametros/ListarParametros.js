import React from "react";
import { Button, useMediaQuery, Zoom } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useModal } from "../../useModal";
import ParametrosContenedorLista from "./ParametrosContenedorLista";
import { useTheme } from "@emotion/react";

export const ListarParametros = (props) => {
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  const [isOpen, handleOpen, handleClose] = useModal(false);

  return (
    <>
      <Tooltip title="Listar parámetros" TransitionComponent={Zoom} arrow>
        <span>
          <IconButton color="secondary" size="small" onClick={handleOpen}>
            <ViewListIcon />
          </IconButton>
        </span>
      </Tooltip>
      {/* Ventana modal */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        fullScreen={esXs ? true : false}
        sx={{
          backdropFilter: "blur(0.8px)",
        }}
      >
        <DialogTitle>
          Parametros de {props.Materia} - {props.anio}- {props.semestre}
        </DialogTitle>
        <DialogContent>
          <ParametrosContenedorLista
            idcursada={props.idcursada}
            semestre={props.semestre}
            Materia={props.Materia}
            anio={props.anio}
          />
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
