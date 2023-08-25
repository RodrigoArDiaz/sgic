import React from "react";
//MUI
import { Button, Zoom } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useModal } from "../../useModal";
import { useNavigate } from "react-router-dom";
//
import * as Responses from "../../Responses";
import { endpoints } from "../../../api/endpoints";
import { routes } from "../../../routes";
import { useState } from "react";

/*** Componente BorrarDeGrupo***/
export const BorrarDeGrupo = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  //Estado peticion
  const [isLoading, setIsLoading] = useState(false);

  const navegar = useNavigate();
  const [est, setE] = React.useState("1");

  function Inscribir() {
    setE("3");
    var data = {
      pidUs: props.alumno.IdUsuario,
      pidCu: props.cursada.IdCursada,
      pidG: props.grupo.IdGrupo,
    };
    setIsLoading(true);
    Responses.consultas(data, endpoints.borrarAlumnoGrupo)
      .then((response) => {
        if (Responses.status === 200) {
          handleClose();
          props.abrir(true);
          props.mensaje(response.Mensaje);
          props.tipo("success");
          setE("2");
          setIsLoading(false);
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
        } else if (Responses.status === 460) {
          handleClose();
          props.abrir(true);
          props.mensaje(response.Error);
          props.tipo("error");
          setE("1");
          setIsLoading(false);
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
      });
  }

  return (
    <>
      {est === "1" && (
        <>
          <Tooltip title="Borrar" TransitionComponent={Zoom} arrow>
            <span>
              <IconButton
                olor="secondary"
                size="small"
                onClick={() => {
                  handleOpen();
                }}
              >
                <DoNotDisturbOnOutlinedIcon color="secondary" />
              </IconButton>
            </span>
          </Tooltip>

          <Dialog
            open={isOpen}
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
            sx={{
              backdropFilter: "blur(0.8px)",
            }}
          >
            <DialogTitle display="flex" flexDirection="row">
              <DoNotDisturbOnOutlinedIcon
                sx={{ alignSelf: "center", marginRight: 1 }}
              />
              Borrar integrante
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Seguro que desea borrar el alumno del grupo?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => {
                  Inscribir();
                }}
                disabled={isLoading ? true : false}
              >
                Aceptar
              </Button>
              <Button variant="outlined" color="primary" onClick={handleClose}>
                Cancelar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      {est === "2" && (
        <Tooltip title="Borrado">
          <IconButton aria-label="error" size="small" color="error">
            <HighlightOffIcon />
          </IconButton>
        </Tooltip>
      )}

      {est === "3" && (
        <Tooltip title="Cargando">
          <IconButton aria-label="esperando" size="small">
            <CircularProgress size={21} />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};
