import React, { useState } from "react";
//MUI
import { Button } from "@mui/material";
import { Tooltip, Zoom } from "@mui/material";
import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
//Hooks modal
import { useModal } from "../../hooks/useModal";
import { endpoints } from "../../api/endpoints";

/*** Componente AgregarMateriaCatedra ***/
export const AgregarMateriaCatedra = (props) => {
  //Recupero token
  const token = localStorage.getItem("tkn");

  const [isOpen, handleOpen, handleClose] = useModal(false);

  //Estado peticion
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

  function AgregarMateria() {
    var data = {
      pidCa: props.idcatedra,
      pMat: props.materia,
      pPla: props.plan,
      pCar: props.carrera,
    };

    setIsLoading(true);
    consultas(data, endpoints.agregarMateria)
      .then((response) => {
        if (response.Error === undefined) {
          //aqui va el snack
          handleClose();
          //setNom('1') ;

          props.abrir(true);
          props.mensaje("Materia agregada a la cátedra");
          props.tipo("success");
          props.refrescar();

          setIsLoading(false);
        } else {
          // Aqui actualizo los errores

          handleClose();
          props.abrir(true);
          props.mensaje(response.Error);
          props.tipo("error");
          props.refrescar();
          setIsLoading(false);
        }
      })
      .catch((error) => {});
  }

  return (
    <>
      <Tooltip title="Agregar materia" TransitionComponent={Zoom} arrow>
        <span>
          <IconButton color="secondary" size="small" onClick={handleOpen}>
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
        <DialogTitle display="flex" flexDirection="row">
          <AddCircleOutlineOutlinedIcon
            sx={{ alignSelf: "center", marginRight: 1 }}
          />
          {props.nombremateria}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea agregar la materia a la catedra?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={AgregarMateria}
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
