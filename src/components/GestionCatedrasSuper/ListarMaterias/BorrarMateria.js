import React from "react";
//MUI
import { Button } from "@mui/material";
import { Tooltip, Zoom } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteOutlined } from "@mui/icons-material";
//Hooks modal
import { useModal } from "../../useModal";
//Router dom
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../../api/endpoints";
import { routes } from "../../../routes";

/*** Componente BorrarMateria ***/
export const BorrarMateria = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  const navegar = useNavigate();

  async function consultas(data, cadena) {
    const response = await fetch(cadena, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.json();
  }

  function BorrarMateria() {
    var data = {
      pidCa: props.idcatedra,
      pMat: props.materia,
    };

    consultas(data, endpoints.borrarMateria)
      .then((response) => {
        console.log(response);
        if (response.Mensaje === "OK") {
          handleClose();
          props.abrir(true);
          props.mensaje("Materia borrada con éxito");
          props.tipo("success");
          props.refrescar();
        } else {
          handleClose();
          props.refrescar();
        }
      })
      .catch((error) => {
        navegar(routes.iniciarSesion);
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
        maxWidth="sm"
        fullWidth
        sx={{
          backdropFilter: "blur(0.8px)",
        }}
      >
        <DialogTitle display="flex" flexDirection="row">
          <DeleteOutlined sx={{ alignSelf: "center", marginRight: 1 }} />
          Borrar materia - {props.nombremateria}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea quitar la materia de la catedra?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={BorrarMateria}>
            Aceptar
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
