import React from "react";
//MUI
import {
  Button,
  InputAdornment,
  Tooltip,
  useMediaQuery,
  Zoom,
} from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, Input, Grid, Paper } from "@mui/material";
import { FormHelperText } from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
//
import { useModal } from "../useModal";
import { BotonEstadoRegistro } from "./BotonEstadoRegistro";
import { useTheme } from "@emotion/react";
import DialogCustom from "../Material UI - Componentes Modificados/DialogCustom";

export const ModificarCatedra = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  const [enombre, setNom] = React.useState("1");
  const [form, setForm] = React.useState({
    nombre: props.catedra,
  });

  const [errors, setErrors] = React.useState({
    nombre: "",
  });

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

  function BotonEstadoRegistroDevolver(param) {
    if (param === "1") return <BotonEstadoRegistro estado={"1"} />;

    if (param === "2") return <BotonEstadoRegistro estado={"2"} />;
  }

  function DevolverBoton() {
    if (enombre === "1") {
      return (
        <Button variant="contained" onClick={Modificar}>
          Aceptar
        </Button>
      );
    } else {
      return (
        <Button variant="contained" disabled onClick={handleClose}>
          Aceptar
        </Button>
      );
    }
  }

  function Modificar() {
    var data = {
      Catedra: form.nombre,
      IdCatedra: props.idcatedra,
    };

    consultas(data, "http://127.0.0.1:8000/api/modificarcatedra")
      .then((response) => {
        if (response.Error === undefined) {
          //aqui va el snack
          handleClose();
          //setNom('1') ;

          props.abrir(true);
          props.mensaje("Cátedra modificada con éxito");
          props.tipo("success");
          props.refrescar();

          console.log(response);
        } else {
          // Aqui actualizo los errores

          setErrors({ nombre: response.Error });
          setNom("2");
        }
      })
      .catch((error) => {
        console.log("Error de conexión" + error);
      });
  }

  return (
    <>
      <Tooltip title="Modificar" TransitionComponent={Zoom} arrow>
        <span>
          <IconButton color="secondary" size="small" onClick={handleOpen}>
            <ModeEditOutlinedIcon />
          </IconButton>
        </span>
      </Tooltip>

      {/* Ventana modal */}
      <DialogCustom
        open={isOpen}
        onClose={(event, reason) => {
          // Evita el cierre de la ventana modal al hacer clik fuera de la misma
          if (reason && reason == "backdropClick") return;
          handleClose();
        }}
        maxWidth="sm"
      >
        <DialogTitle display="flex" flexDirection="row">
          <ModeEditOutlinedIcon sx={{ alignSelf: "center", marginRight: 1 }} />
          Modificar cátedra
        </DialogTitle>
        <DialogContent>
          <FormControl
            error={errors.nombre ? true : false}
            fullWidth
            margin="dense"
          >
            <InputLabel htmlFor="nombre">Nombre</InputLabel>
            <Input
              id="nombre"
              type="text"
              name="nombre"
              onChange={(e) => {
                if (errors.nombre !== "") {
                  setErrors({ ...errors, [e.target.name]: "" });
                }

                setNom("");
                setForm({
                  ...form,
                  [e.target.name]: e.target.value,
                });
              }}
              onBlur={(e) => {
                let regex = /^[a-zA-Z\s]+$/;

                if (!form.nombre.trim()) {
                  setErrors({
                    ...errors,
                    [e.target.name]: "El campo 'Nombre' es requerido.",
                  });
                  setNom("2");
                } else if (!regex.test(form.nombre.trim())) {
                  setErrors({
                    ...errors,
                    [e.target.name]:
                      "El nombre ingresado tiene un formato incorrecto.",
                  });
                  setNom("2");
                } else {
                  var data = {
                    Catedra: form.nombre,
                    IdCatedra: props.idcatedra,
                  };

                  consultas(data, "http://127.0.0.1:8000/api/consultarnomcat")
                    .then((response) => {
                      if (response.Error === undefined) {
                        setNom("1");
                        console.log(response);
                      } else {
                        setNom("2");
                        setErrors({
                          ...errors,
                          [e.target.name]: response.Error,
                        });
                      }
                    })
                    .catch((error) => {
                      console.log("Error de conexión" + error);
                    });
                }
              }}
              value={form.nombre}
              endAdornment={
                <InputAdornment position="end">
                  {enombre === "1" && <BotonEstadoRegistro estado={"1"} />}
                  {enombre === "2" && <BotonEstadoRegistro estado={"2"} />}
                </InputAdornment>
              }
            />

            <FormHelperText>{errors.nombre}</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          {DevolverBoton()}

          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </DialogCustom>
    </>
  );
};
