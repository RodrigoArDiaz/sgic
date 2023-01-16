import React, { useState } from "react";
//MUI
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from "notistack";
import { Zoom } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
//hooks personalizados
import { useModal } from "../../hooks/useModal";
import { useSelector } from "react-redux";
import { peticionBorrarContacto } from "../../api/alumnos/gestionContactosApi";
import { red } from "@mui/material/colors";

export const BorrarContacto = ({ contacto, borrarContacto }) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  const { enqueueSnackbar } = useSnackbar();
  //
  const [isLoading, setIsLoading] = useState(false);
  //Recupero token
  const { token } = useSelector((state) => state.login);
  //Recupero informacion del usuario
  const { user } = useSelector((state) => state.user);

  //
  const handleBorrarContacto = async () => {
    setIsLoading(true);
    //Realizo peticion
    try {
      const respuesta = await peticionBorrarContacto(
        user.IdUsuario,
        contacto.IdContacto,
        token
      );

      borrarContacto(contacto.IdContacto);
      handleClose();
      enqueueSnackbar("Se borró el contacto con exito", {
        variant: "success",
      });
    } catch (error) {
      handleClose();
      try {
        let mensajeSnack = "";
        const data = error.response.data.data;
        if ("mensaje" in data) {
          mensajeSnack = data.mensaje;
        } else {
          mensajeSnack = data[0];
        }
        enqueueSnackbar(`Error: ${mensajeSnack}`, {
          variant: "error",
        });
      } catch (e) {}
    }
    setIsLoading(false);
  };

  return (
    <>
      <Tooltip title="Borrar" TransitionComponent={Zoom}>
        <IconButton
          edge="end"
          aria-label="delete"
          // color="secondary"
          onClick={handleOpen}
          sx={{ color: red[500] }}
        >
          <DeleteOutlined />
        </IconButton>
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
          <DeleteOutlined sx={{ alignSelf: "center", marginRight: 1 }} />
          Borrar contacto
        </DialogTitle>
        <DialogContent>
          <Typography>¿Seguro que desea borrar este contacto?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleBorrarContacto}
            disabled={isLoading ? true : false}
          >
            Aceptar
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
