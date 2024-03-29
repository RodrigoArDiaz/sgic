import React from "react";
//MUI
import { Button, CircularProgress, Zoom } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteOutlineOutlined } from "@mui/icons-material";
//
import { useModal } from "../useModal";
import { useNavigate } from "react-router-dom";
import * as Responses from "../Responses";
//
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";
import { useState } from "react";

/*** Componente BorrarCursada ***/
export const BorrarCursada = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  const [isLoading, setIsLoading] = useState(false);

  const navegar = useNavigate();

  function BorrarCursada() {
    var data = {
      IdCursada: props.idcursada,
    };

    setIsLoading(true);

    Responses.consultas(data, endpoints.borrarCursada)
      .then((response) => {
        if (Responses.status === 200) {
          handleClose();
          props.abrir(true);
          props.mensaje("Cursada borrada con éxito");
          props.tipo("success");
          props.refrescar();
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
        } else if (Responses.status === 460) {
          handleClose();
          props.abrir(true);
          props.mensaje(response.Error);
          props.tipo("error");
        } else {
          navegar(routes.error);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        navegar(routes.error);
        setIsLoading(false);
      });
  }

  return (
    <>
      <Tooltip title="Borrar" TransitionComponent={Zoom} arrow>
        <span>
          <IconButton
            color="secondary"
            size="small"
            onClick={handleOpen}
            // sx={{ color: "icons.error" }}
          >
            <DeleteOutlineOutlined />
            {/* <DeleteTwoToneIcon /> */}
          </IconButton>
        </span>
      </Tooltip>

      {/* Ventana modal */}
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
          <DeleteOutlineOutlined sx={{ alignSelf: "center", marginRight: 1 }} />
          Borrar cursada
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea borrar la cursada{" "}
            <b>
              {props.Materia} - {props.anio} - {props.semestre}
            </b>
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={BorrarCursada}
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
