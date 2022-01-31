import React from "react";
//Material UI
import { Button, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
//Notistack
import { useSnackbar } from "notistack";
//Hooks personalizados
import { useModal } from "../hooks/useModal";

const InscribirseEnCursada = ({ cursada, inscribirseEnCursada }) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  const { enqueueSnackbar } = useSnackbar();
  const { materia, anio, idCursada } = cursada;

  const handleInscribirseEnCursada = () => {
    //Realizo la peticion

    //En caso de exito
    handleClose();
    enqueueSnackbar("Se inscribio en la cursada con exito", {
      variant: "success",
    });
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
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Confirmar inscripcion</DialogTitle>
        <DialogContent>
          <Typography>
            Esta a punto de inscribirse en <b>{materia + " " + anio}</b>.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleInscribirseEnCursada}>
            Confirmar
          </Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InscribirseEnCursada;
