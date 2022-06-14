import React from "react";
import { Button } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useModal } from "../useModal";
import { BotonEstadoRegistro } from "./BotonEstadoRegistro";

import {
  FormControl,
  InputLabel,
  Input,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
// import { Box } from "@mui/material";
import Box from "@mui/material";
import Link from "@mui/material/Link";

import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
//import { useForm } from '../hooks/useForm';
import { FormHelperText } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";
//import {BotonEstadoRegistro} from './BotonEstadoRegistro';

const estiloPaper = {
  height: "auto",
  width: { xs: "100%", sm: "490px" },
  margin: { xs: "0 auto", sm: "20px auto" },
  boxShadow: { xs: 0, sm: 8 },
};

const estiloFormControl = {
  width: "100%",
  mt: "25px",
};

const estiloButton = {
  mt: "50px",
};

const estiloLink = {
  mt: "30px",
};

const estiloHeader = {
  backgroundColor: "primary.main",
  color: "white",
  py: "15px",
  borderRadius: { xs: "none", md: "4px 4px 0 0" },
  mb: "10px",
  borderBottom: "2px solid",
  borderColor: "secondary.light",
};

const estiloContent = {
  padding: "5px 40px 40px 40px ",
};

export const ModificarCursada = (props) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);

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
      <Tooltip title="Modificar">
        <IconButton color="secondary" size="small" onClick={handleOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Modificar catedra</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
                        Ingrese los datos a modificar
                    </DialogContentText> */}

          <Grid>
            <Paper sx={estiloPaper}>
              <Grid sx={estiloContent}>
                <FormControl
                  sx={estiloFormControl}
                  error={errors.nombre ? true : false}
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

                        consultas(
                          data,
                          "http://127.0.0.1:8000/api/consultarnomcat"
                        )
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
                  />

                  {enombre === "1" && <BotonEstadoRegistro estado={"1"} />}
                  {enombre === "2" && <BotonEstadoRegistro estado={"2"} />}

                  <FormHelperText>{errors.nombre}</FormHelperText>
                </FormControl>
              </Grid>
            </Paper>
          </Grid>
        </DialogContent>
        <DialogActions>
          {DevolverBoton()}

          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

//<Button variant='contained' disabled onClick={handleClose}>Aceptar</Button>
