import React from "react";
//MUI
import { Button, InputAdornment, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormHelperText } from "@mui/material";
import { FormControl, InputLabel, Input } from "@mui/material";
//
import { useTheme } from "@emotion/react";
//Hooks personalizados
import { useModal } from "../../hooks/useModal";
//Componentes propios
import { BotonEstadoRegistro } from "./BotonEstadoRegistro";

export const CrearCatedra = (props) => {
  //Variable de estado y handles de eventos para la ventana modal
  const [isOpen, handleOpen, handleClose] = useModal(false);

  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  const [enombre, setNom] = React.useState("");
  const [form, setForm] = React.useState({
    nombre: "",
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

  function Crear() {
    var data = {
      Catedra: form.nombre,
      // IdCatedra:props.idcatedra,
    };

    consultas(data, "http://127.0.0.1:8000/api/crearcatedra")
      .then((response) => {
        if (response.Error === undefined) {
          //aqui va el snack
          handleClose();
          //setNom('1') ;

          props.abrir(true);
          props.mensaje("Cátedra creada con éxito");
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

  function DevolverBoton() {
    if (enombre === "1") {
      return (
        <Button variant="contained" onClick={Crear}>
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

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        fullWidth
        onClick={handleOpen}
      >
        Crear catedra
      </Button>

      {/* Ventana modal */}
      <Dialog
        open={isOpen}
        onClose={(event, reason) => {
          // Evita el cierre de la ventana modal al hacer clik fuera de la misma
          if (reason && reason == "backdropClick") return;
          handleClose();
        }}
        maxWidth="sm"
        fullWidth
        fullScreen={esXs ? true : false}
        sx={{
          backdropFilter: "blur(0.8px)",
        }}
      >
        <DialogTitle display="flex" flexDirection="row">
          <AddIcon sx={{ alignSelf: "center", marginRight: 1 }} />
          Crear catedra
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese los datos para crear la catedra.
          </DialogContentText>

          <FormControl
            error={errors.nombre ? true : false}
            margin="dense"
            fullWidth
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
                    IdCatedra: undefined,
                  };

                  consultas(data, "http://127.0.0.1:8000/api/consultarnomcat")
                    .then((response) => {
                      if (response.Error === undefined) {
                        setNom("1");
                        // console.log(response);
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
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
