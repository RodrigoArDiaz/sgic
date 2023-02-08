import React, { useState } from "react";
import { Button } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Zoom } from "@mui/material";
//
import { useModal } from "../../hooks/useModal";
//
import { useSnackbar } from "notistack";
import { peticionBorrarDocente } from "../../api/super/gestionDocentesApi";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@mui/icons-material";
import DialogCustom from "../Material UI - Componentes Modificados/DialogCustom";

export const BorrarDocente = ({ docente, handleRefrescarPagina }) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  const { enqueueSnackbar } = useSnackbar();
  //
  const [isLoading, setIsLoading] = useState(false);
  //Recupero token
  const { token } = useSelector((state) => state.login);

  //
  const handleBorrarDocente = async () => {
    setIsLoading(true);
    //Realizo peticon

    try {
      const respuesta = await peticionBorrarDocente(docente.IdUsuario, token);
      //Si petiocion ok

      handleClose();
      enqueueSnackbar("Se dio borró al docente con exito.", {
        variant: "success",
      });
      //
      handleRefrescarPagina();
    } catch (error) {
      const mensaje = error.response.data.data.mensaje;
      handleClose();
      enqueueSnackbar(`Error: ${mensaje}`, {
        variant: "error",
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <Tooltip title="Borrar" TransitionComponent={Zoom} arrow>
        <span>
          {/** span: Para prevenir error de eventos provocado por el componente Tooltip cuando Button esta en estado disabled */}
          <IconButton
            color="secondary"
            onClick={handleOpen}
            size="small"
            disabled={isLoading ? true : false} //Deshabilito boton al hacer la peticion
          >
            {/* <DeleteIcon /> */}
            <DeleteOutlined />
          </IconButton>
        </span>
      </Tooltip>

      {/* Ventana modal */}
      <DialogCustom open={isOpen} onClose={handleClose} maxWidth="xs">
        <DialogTitle display="flex" flexDirection="row">
          <DeleteOutlined sx={{ alignSelf: "center", marginRight: 1 }} />
          Borrar docente
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea borrar al docente?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleBorrarDocente}>
            Aceptar
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </DialogCustom>
    </>
  );
};
