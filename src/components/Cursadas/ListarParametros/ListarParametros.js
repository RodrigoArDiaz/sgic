import React from "react";
//MUI
import { Button, DialogContentText, useMediaQuery, Zoom } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@emotion/react";
import { ViewListOutlined } from "@mui/icons-material";
import ParametrosContenedorLista from "./ParametrosContenedorLista";
import { useModal } from "../../useModal";

/*** Componente ListarParametros ***/
export const ListarParametros = (props) => {
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  const [isOpen, handleOpen, handleClose] = useModal(false);

  return (
    <>
      <Tooltip title="Listar parámetros" TransitionComponent={Zoom} arrow>
        <span>
          <IconButton
            color="secondary"
            size="small"
            onClick={handleOpen}
            // sx={{ color: "icons.secondary" }}
          >
            <ViewListOutlined />
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
        <DialogTitle display="flex" flexDirection="row">
          <ViewListOutlined sx={{ alignSelf: "center", marginRight: 1 }} />
          Lista de parámetros
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.Materia} - {props.anio} - {props.semestre}
          </DialogContentText>
          <ParametrosContenedorLista
            idcursada={props.idcursada}
            semestre={props.semestre}
            Materia={props.Materia}
            anio={props.anio}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
