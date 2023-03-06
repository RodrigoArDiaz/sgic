import React from "react";
//MUI
import { Button } from "@mui/material";
import { Tooltip, Zoom } from "@mui/material";
import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useModal } from "../useModal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
//
import { BotonEstadoRegistro } from "./BotonEstadoRegistro";
import { endpoints } from "../../api/endpoints";

/*** Componente AgregarUsuarioCatedra ***/
export const AgregarUsuarioCatedra = (props) => {
  //Recupero token
  const token = localStorage.getItem("tkn");

  const [isOpen, handleOpen, handleClose] = useModal(false);

  const [age, setAge] = React.useState("");
  const [erol, setR] = React.useState("");

  const [errors, setErrors] = React.useState({
    rol: "",
  });

  function handleChange(e) {
    setAge(e.target.value);

    if (e.target.value === 2) {
      var data = {
        IdCatedra: props.idcatedra,
      };

      consultas(data, endpoints.consultarUsCat)
        .then((response) => {
          if (response.Error === undefined) {
            setR("1");
          } else {
            setR("2");
            setErrors({ rol: response.Error });
          }
        })
        .catch((error) => {});
    } else {
      setErrors({ rol: "" });
      setR("1");
    }
  }

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

  function DevolverBoton() {
    if (erol === "1") {
      return (
        <Button variant="contained" onClick={AgregarUsuarioRol}>
          Agregar
        </Button>
      );
    } else {
      return (
        <Button variant="contained" disabled>
          Agregar
        </Button>
      );
    }
  }

  function AgregarUsuarioRol() {
    var data = {
      IdCatedra: props.idcatedra,
      IdRol: age,
      IdDocente: props.idusuario,
    };

    consultas(data, endpoints.agregarUsCat)
      .then((response) => {
        if (response.Error === undefined) {
          //aqui va el snack
          handleClose();
          //setNom('1') ;

          props.abrir(true);
          props.mensaje("Usuario agregado a la cátedra");
          props.tipo("success");
          props.refrescar();
        } else {
          // Aqui actualizo los errores
          setErrors({ rol: response.Error });
          setR("2");
        }
      })
      .catch((error) => {});
  }

  return (
    <>
      <Tooltip title="Agregar usuario" TransitionComponent={Zoom} arrow>
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
        <DialogTitle>Seleccione el rol del usuario</DialogTitle>
        <DialogContent>
          <FormControl
            variant="standard"
            fullWidth
            error={errors.rol ? true : false}
          >
            <InputLabel id="demo-simple-select-standard-label">Rol</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              // value={age}
              onChange={handleChange}
              label="Rol"
              size="large"
            >
              <MenuItem value={1}>Docente</MenuItem>
              <MenuItem value={2}>Administrador</MenuItem>
            </Select>
            <FormHelperText>{errors.rol}</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          {erol === "1" && <BotonEstadoRegistro estado={"1"} />}
          {erol === "2" && <BotonEstadoRegistro estado={"2"} />}

          {DevolverBoton()}

          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
