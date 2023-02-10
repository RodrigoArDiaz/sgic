import React, { useState } from "react";
//Material UI
import { Button, CircularProgress, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
//Notistack
import { useSnackbar } from "notistack";
//Hooks personalizados
import { useModal } from "../useModal";
import { CheckCircleOutline } from "@mui/icons-material";
import DialogCustom from "../Material UI - Componentes Modificados/DialogCustom";
import { peticionInscribirseEnCursada } from "../../api/alumnos/cursadasApi";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

const InscribirseEnCursada = ({ cursada }) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  const { enqueueSnackbar } = useSnackbar();
  const { Materia, Anio, IdCursada } = cursada;
  const navegar = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  //
  const handleInscribirseEnCursada = async () => {
    setIsLoading(true);

    // Realizo peticon
    try {
      const respuesta = await peticionInscribirseEnCursada(IdCursada, null);
      enqueueSnackbar("Se inscribió en la cursada con exito", {
        variant: "success",
      });
    } catch (error) {
      //Error al inscribirse
      if (error.response && error.response.status == 460)
        enqueueSnackbar(error.response.data.Error, {
          variant: "error",
        });
      //Sesion caducada (sin autorización)
      if (error.response && error.response.status == 401)
        navegar(routes.iniciarSesion);
    }
    //Se cierra ventana modal
    handleClose();
    //
    setIsLoading(false);
  };

  return (
    <>
      <Button
        size="medium"
        variant="contained"
        color="primary"
        // textAlign="center"
        endIcon={<ArrowUpwardIcon />}
        onClick={handleOpen}
      >
        Inscribirme
      </Button>

      {/* Ventana modal */}
      <DialogCustom
        open={isOpen}
        onClose={handleClose}
        maxWidth="xs"
        fullScreen={false}
      >
        <DialogTitle display="flex" flexDirection="row">
          <CheckCircleOutline sx={{ alignSelf: "center", marginRight: 1 }} />
          Confirmar inscripción
        </DialogTitle>

        <DialogContent>
          <Typography>
            Esta a punto de inscribirse en <b>{Materia + " " + Anio}</b>.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleInscribirseEnCursada}
            disabled={isLoading}
            endIcon={isLoading ? <CircularProgress size={15} /> : undefined}
          >
            Aceptar
          </Button>
          <Button onClick={handleClose} variant="outlined">
            Cancelar
          </Button>
        </DialogActions>
      </DialogCustom>
    </>
  );
};

export default InscribirseEnCursada;
