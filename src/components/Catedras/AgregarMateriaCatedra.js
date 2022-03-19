import React from "react";
import { Button } from "@mui/material";
import { Tooltip, Zoom } from "@mui/material";
import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useModal } from "../../hooks/useModal";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export const AgregarMateriaCatedra = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

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

  function AgregarMateria() {
    var data = {
      pidCa: props.idcatedra,
      pMat: props.materia,
      pPla: props.plan,
      pCar: props.carrera,
    };

    consultas(data, "http://127.0.0.1:8000/api/agregarmateria")
      .then((response) => {
        if (response.Error === undefined) {
          //aqui va el snack
          handleClose();
          //setNom('1') ;

          props.abrir(true);
          props.mensaje("Materia agregada a la cátedra");
          props.tipo("success");
          props.refrescar();

          console.log(response);
        } else {
          // Aqui actualizo los errores

          handleClose();
          props.abrir(true);
          props.mensaje(response.Error);
          props.tipo("error");
          props.refrescar();
        }
      })
      .catch((error) => {
        console.log("Error de conexión" + error);
      });
  }

  return (
    <>
      <Tooltip title="Agregar materia" TransitionComponent={Zoom}>
        <span>
          <IconButton color="secondary" size="large" onClick={handleOpen}>
            <AddCircleOutlineOutlinedIcon />
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
        <DialogTitle>{props.nombremateria}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea agregar la materia a la catedra?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={AgregarMateria}>
            Agregar
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
