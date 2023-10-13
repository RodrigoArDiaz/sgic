import React from "react";
//MUI
import { Button, CircularProgress, useMediaQuery, Zoom } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useModal } from "../useModal";
import { useNavigate } from "react-router-dom";
import * as Responses from "../Responses";
import { useTheme } from "@emotion/react";
import { DeleteOutlined } from "@mui/icons-material";
import { endpoints } from "../../api/endpoints";
import { useState } from "react";

/*** Componente BorrarPractico ***/
export const BorrarPractico = (props) => {
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  const [isOpen, handleOpen, handleClose] = useModal(false);

  const [isLoading, setIsLoading] = useState(false);

  const navegar = useNavigate();

  function BorrarPractico() {
    var data = {
      pidCu: props.cursada.IdCursada,
      pidP: props.practico.IdPractico,
    };

    setIsLoading(true);

    Responses.consultas(data, endpoints.borrarPractico)
      .then((response) => {
        if (Responses.status === 200) {
          handleClose();
          props.abrir(true);
          props.mensaje(response.Mensaje);
          props.tipo("success");
          props.refrescar();
        } else if (Responses.status === 401) {
          navegar("/ingreso");
        } else if (Responses.status === 460) {
          handleClose();
          props.abrir(true);
          props.mensaje(response.Error);
          props.tipo("error");
        } else {
          navegar("/error");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        navegar("/error");
        setIsLoading(false);
      });
  }

  return (
    <>
      <Tooltip title="Borrar" TransitionComponent={Zoom} arrow>
        <span>
          <IconButton color="secondary" size="small" onClick={handleOpen}>
            <DeleteOutlined />
          </IconButton>
        </span>
      </Tooltip>

      {/* Ventana modal */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        fullScreen={esXs ? true : false}
        sx={{
          backdropFilter: "blur(0.8px)",
        }}
      >
        <DialogTitle display="flex" flexDirection="row">
          <DeleteOutlined sx={{ alignSelf: "center", marginRight: 1 }} />
          Borrar trabajo práctico
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea borrar el trabajo práctico?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={BorrarPractico}
            disabled={isLoading}
          >
            Aceptar
            {isLoading && (
              <>
                <CircularProgress size={20} sx={{ ml: 1 }} />
              </>
            )}
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
