import React from "react";
//MUI
import { Button, CircularProgress, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useModal } from "../../hooks/useModal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Calendario from "./Calendario";
import { BotonEstadoRegistro } from "./BotonEstadoRegistro";
import { FormHelperText } from "@mui/material";
import { FormControl, InputLabel, Input, Grid } from "@mui/material";
import * as Responses from "../Responses";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";

/*** Componente CrearPractico ***/
export const CrearPractico = (props) => {
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  const navegar = useNavigate();
  const [isOpen, handleOpen, handleClose] = useModal(false);

  const [epractico, setP] = React.useState("");
  const [enotaminima, setNM] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const [form, setForm] = React.useState({
    practico: "",
    fechavencimiento: "",
    notaminima: "",
  });

  const [errors, setErrors] = React.useState({
    practico: "",
    fechavencimiento: "",
    notaminima: "",
  });

  function Crear() {
    if (form.fechavencimiento) {
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
      var fv = null;
    }

    var data = {
      pPractico: form.practico,
      pFV: fv,
      pNM: form.notaminima,
      pidCu: props.cursada.IdCursada,
    };

    setIsLoading(true);
    Responses.consultas(data, endpoints.crearPractico)
      .then((response) => {
        if (Responses.status === 200) {
          handleClose();
          setP("");
          setNM("");

          setForm({
            practico: "",
            fechavencimiento: "",
            notaminima: "",
          });

          props.abrir(true);
          props.mensaje("Práctico creado con éxito");
          props.tipo("success");
          props.refrescar();
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
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
          navegar(routes.error);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        navegar(routes.error);
        setIsLoading(false);
      });
  }

  const estiloFormControl = {
    width: "100%",
    mt: "15px",
  };

  const estiloFormControlSelect = {
    //width: fullWidth,
    mt: "15px",
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
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        fullWidth
        onClick={handleOpen}
      >
        Crear práctico
      </Button>

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
          <AddIcon sx={{ alignSelf: "center", marginRight: 1 }} />
          Crear trabajo práctico
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese los datos para crear el trabajo práctico.
          </DialogContentText>

          <Grid container spacing={2}>
            {/* Practico */}
            <Grid item xs={12} sx={{ mt: 0 }}>
              <FormControl
                variant="standard"
                fullWidth
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
                        pidP: "",
                      };

                      Responses.consultas(data, endpoints.consultarNomPractico)
                        .then((response) => {
                          if (Responses.status === 200) {
                            setP("1");
                          } else if (Responses.status === 401) {
                            navegar(routes.iniciarSesion);
                          } else if (Responses.status === 460) {
                            setP("2");
                            setErrors({
                              ...errors,
                              [e.target.name]: response.Error,
                            });
                          } else {
                            navegar(routes.error);
                          }
                        })
                        .catch((error) => {
                          navegar(routes.error);
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

            {/* Fecha de vencimiento */}
            <Grid item xs={12} sx={{ mt: 0 }}>
              <FormControl
                variant="standard"
                fullWidth
                sx={estiloFormControlSelect}
                error={errors.fechavencimiento ? true : false}
              >
                <Calendario Cambio={CambioFV} label={"Fecha De Vencimiento"} />

                <FormHelperText>{errors.fechavencimiento}</FormHelperText>
              </FormControl>
            </Grid>

            {/* Nota minima */}
            <Grid item xs={12} sx={{ mt: 0 }}>
              <FormControl
                variant="standard"
                fullWidth
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
          {/* {DevolverBoton()} */}
          {epractico === "1" && enotaminima === "1" ? (
            <Button variant="contained" onClick={Crear} disabled={isLoading}>
              Aceptar
              {isLoading && (
                <>
                  <CircularProgress size={20} sx={{ ml: 1 }} />
                </>
              )}
            </Button>
          ) : (
            <Button variant="contained" disabled onClick={handleClose}>
              Aceptar
            </Button>
          )}

          <Button onClick={handleClose} variant="outlined">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
