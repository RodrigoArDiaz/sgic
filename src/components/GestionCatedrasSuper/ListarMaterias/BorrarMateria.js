import React, { useState } from "react";
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
  //Recupero token
  const token = localStorage.getItem("tkn");
  //Hooks modal
  const [isOpen, handleOpen, handleClose] = useModal(false);
  //Funcion para rediereccionar
  const navegar = useNavigate();
  //Estado de peticion
  const [isLoading, setIsLoading] = useState(false);

  async function consultas(data, cadena) {
    //Adjunto token
    data = { ...data, ...{ token: token } };

    const response = await fetch(cadena, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  }

  function BorrarMateria() {
    var data = {
      pidCa: props.idcatedra,
      pMat: props.materia,
    };
    setIsLoading(true);
    consultas(data, endpoints.borrarMateria)
      .then((response) => {
        if (response.Mensaje === "OK") {
          handleClose();
          props.abrir(true);
          props.mensaje("Materia borrada con éxito");
          props.tipo("success");
          props.refrescar();
        }

        if (response.Error != undefined) {
          handleClose();
          props.mensaje(response.Error);
          props.tipo("error");
          props.abrir(true);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // navegar(routes.iniciarSesion);
        // setIsLoading(false);
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
          <Button
            variant="contained"
            onClick={BorrarMateria}
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
  );
};
