import React from "react";
import { Button, useMediaQuery, Zoom } from "@mui/material";
import { useModal } from "../../hooks/useModal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Calendario from "./Calendario";
import { BotonEstadoRegistro } from "./BotonEstadoRegistro";
import { FormHelperText } from "@mui/material";
import {
  FormControl,
  InputLabel,
  Input,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import * as Responses from "../Responses";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

export const ModificarPractico = (props) => {
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  const navegar = useNavigate();
  const [isOpen, handleOpen, handleClose] = useModal(false);

  const [epractico, setP] = React.useState("1");

  const [enotaminima, setNM] = React.useState("1");

  const [form, setForm] = React.useState({
    practico: props.practico.Practico,
    fechavencimiento: props.practico.FechaVencimiento,
    notaminima: props.practico.NotaMinimaAprobacion,
  });

  const [errors, setErrors] = React.useState({
    practico: "",
    fechavencimiento: "",
    notaminima: "",
  });

  function FormatoFecha(param) {
    if (!(param === "" || param === null)) {
      let indice = param.indexOf("-");
      let extraida = param.substring(0, indice);

      let param2 = param.substr(indice + 1);

      let indice2 = param2.indexOf("-");
      let extraida2 = param2.substring(0, indice2);

      let param3 = param2.substr(indice2 + 1);

      var fecha = param3.concat("-", extraida2);
      fecha = fecha.concat("-", extraida);

      var fecha2 = fecha.concat("T00:00:00");
      console.log(fecha2);
      return fecha2;
    }
  }

  function Modificar() {
    if (form.fechavencimiento.length === 0) {
      var fv = null;
    } else if (form.fechavencimiento.toString().length > 11) {
      let p = form.fechavencimiento.toLocaleDateString();

      let indice = p.indexOf("/");
      let extraida = p.substring(0, indice);

      let param2 = p.substr(indice + 1);

      let indice2 = param2.indexOf("/");
      let extraida2 = param2.substring(0, indice2);

      let param3 = param2.substr(indice2 + 1);

      var fv = param3.concat("-", extraida2);
      var fv = fv.concat("-", extraida);
    } else {
      let p = form.fechavencimiento;

      let indice = p.indexOf("-");
      let extraida = p.substring(0, indice);

      let param2 = p.substr(indice + 1);

      let indice2 = param2.indexOf("-");
      let extraida2 = param2.substring(0, indice2);

      let param3 = param2.substr(indice2 + 1);

      var fv = param3.concat("-", extraida2);
      var fv = fv.concat("-", extraida);
    }

    var data = {
      pPractico: form.practico,
      pFV: fv,
      pNM: form.notaminima,
      pidP: props.practico.IdPractico,
      pidCu: props.cursada.IdCursada,
    };

    Responses.consultas(data, "http://127.0.0.1:8000/api/modificarpractico")
      .then((response) => {
        if (Responses.status === 200) {
          handleClose();
          props.abrir(true);
          props.mensaje("Práctico modificado con éxito");
          props.tipo("success");
          props.refrescar();
        } else if (Responses.status === 401) {
          navegar("/ingreso");
        } else if (Responses.status === 460) {
          if (response.practico !== undefined) {
            setErrors({ ...errors, practico: response.practico });
            setP("2");
          }

          if (response.fechavencimiento !== undefined) {
            setErrors({
              ...errors,
              fechavencimiento: response.fechavencimiento,
            });
          }

          if (response.notaminima !== undefined) {
            setErrors({ ...errors, notaminima: response.notaminima });
            setNM("2");
          }
        } else {
          navegar("/error");
        }
      })
      .catch((error) => {
        navegar("/error");
      });
  }

  function DevolverBoton() {
    if (epractico === "1" && enotaminima === "1") {
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

  const estiloFormControl = {
    width: "100%",
    mt: "25px",
  };

  const estiloFormControlSelect = {
    //width: fullWidth,
    mt: "25px",
  };

  function CambioFV(param) {
    if (param === "" || param === null) {
      setForm({ ...form, fechavencimiento: "" });
    } else {
      setForm({ ...form, fechavencimiento: param });
    }
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
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        fullScreen={esXs ? true : false}
        sx={{
          backdropFilter: "blur(0.8px)",
        }}
      >
        <DialogTitle display="flex" flexDirection="row">
          <ModeEditOutlinedIcon sx={{ alignSelf: "center", marginRight: 1 }} />
          Modificar trabajo práctico
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese los datos para modificar el trabajo práctico.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <FormControl
                sx={estiloFormControl}
                error={errors.practico ? true : false}
              >
                <InputLabel htmlFor="practico">Práctico</InputLabel>
                <Input
                  id="practico"
                  type="text"
                  name="practico"
                  onChange={(e) => {
                    if (errors.practico !== "") {
                      setErrors({ ...errors, [e.target.name]: "" });
                    }

                    setP("");
                    setForm({
                      ...form,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  onBlur={(e) => {
                    let regex = /^[0-9a-zA-Z\s]+$/;
                    if (!form.practico.trim()) {
                      setErrors({
                        ...errors,
                        [e.target.name]: "El campo 'Práctico' es requerido.",
                      });
                      setP("2");
                    } else if (!regex.test(form.practico.trim())) {
                      setErrors({
                        ...errors,
                        [e.target.name]:
                          "El práctico ingresado tiene un formato incorrecto.",
                      });
                      setP("2");
                    } else {
                      var data = {
                        pPractico: form.practico,
                        pidCu: props.cursada.IdCursada,
                        pidP: props.practico.IdPractico,
                      };

                      Responses.consultas(
                        data,
                        "http://127.0.0.1:8000/api/consultarnompractico"
                      )
                        .then((response) => {
                          if (Responses.status === 200) {
                            setP("1");
                          } else if (Responses.status === 401) {
                            navegar("/ingreso");
                          } else if (Responses.status === 460) {
                            setP("2");
                            setErrors({
                              ...errors,
                              [e.target.name]: response.Error,
                            });
                          } else {
                            navegar("/error");
                          }
                        })
                        .catch((error) => {
                          navegar("/error");
                        });
                    }
                  }}
                  value={form.practico}
                  endAdornment={
                    (epractico === "1" && (
                      <BotonEstadoRegistro estado={"1"} />
                    )) ||
                    (epractico === "2" && <BotonEstadoRegistro estado={"2"} />)
                  }
                />

                {/* {epractico === "1" && <BotonEstadoRegistro estado={"1"} />}
                {epractico === "2" && <BotonEstadoRegistro estado={"2"} />} */}

                <FormHelperText>{errors.practico}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <FormControl
                fullWidth
                sx={estiloFormControlSelect}
                error={errors.fechavencimiento ? true : false}
              >
                <Calendario
                  Cambio={CambioFV}
                  label={"Fecha De Vencimiento"}
                  vpd={FormatoFecha(props.practico.FechaVencimiento)}
                />

                <FormHelperText>{errors.fechavencimiento}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ mt: 1 }}>
              <FormControl
                sx={estiloFormControl}
                error={errors.notaminima ? true : false}
              >
                <InputLabel htmlFor="notaminima">
                  Nota mínima de aprobación
                </InputLabel>
                <Input
                  id="notaminima"
                  type="text"
                  name="notaminima"
                  onChange={(e) => {
                    if (errors.notaminima !== "") {
                      setErrors({ ...errors, [e.target.name]: "" });
                    }

                    setNM("");
                    setForm({
                      ...form,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  onBlur={(e) => {
                    let regex = /^[0-9]+$/;
                    if (!form.notaminima.trim()) {
                      setErrors({
                        ...errors,
                        [e.target.name]:
                          "El campo 'Nota mínima de aprobación' es requerido.",
                      });
                      setNM("2");
                    } else if (!regex.test(form.notaminima.trim())) {
                      setErrors({
                        ...errors,
                        [e.target.name]:
                          "La nota mínima ingresada tiene un formato incorrecto.",
                      });
                      setNM("2");
                    } else if (parseInt(form.notaminima) < 1) {
                      setErrors({
                        ...errors,
                        [e.target.name]:
                          "La nota mínima ingresada debe ser mayor que 0.",
                      });
                      setNM("2");
                    } else if (
                      parseInt(form.notaminima) >
                      parseInt(props.cursada.EscalaPracticos)
                    ) {
                      setErrors({
                        ...errors,
                        [e.target.name]:
                          "La nota mínima ingresada debe ser menor que " +
                          props.cursada.EscalaPracticos,
                      });
                      setNM("2");
                    } else setNM("1");
                  }}
                  value={form.notaminima}
                  endAdornment={
                    (enotaminima === "1" && (
                      <BotonEstadoRegistro estado={"1"} />
                    )) ||
                    (enotaminima === "2" && (
                      <BotonEstadoRegistro estado={"2"} />
                    ))
                  }
                />

                {/* {enotaminima === "1" && <BotonEstadoRegistro estado={"1"} />}
                {enotaminima === "2" && <BotonEstadoRegistro estado={"2"} />} */}

                <FormHelperText>{errors.notaminima}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {DevolverBoton()}
          <Button onClick={handleClose} variant="outlined">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
