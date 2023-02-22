import React from "react";
//MUI components
import { Button, useMediaQuery, Zoom } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AddCircleOutline } from "@mui/icons-material";
import { FormHelperText } from "@mui/material";
import { FormControl, InputLabel, Input } from "@mui/material";
//Elementos propios
import BotonTipoCalculo from "./BotonTipoCalculo";
import BotonTipoExamen from "./BotonTipoExamen";
import { BotonEstadoRegistro } from "./BotonEstadoRegistro";
//Peticiones
import * as Responses from "../Responses";
//Hooks propios
import { useModal } from "../useModal";
//React redux
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";

/*** Componente AgregarParametro ***/
export const AgregarParametro = (props) => {
  const navegar = useNavigate();
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  const [isOpen, handleOpen, handleClose] = useModal(false);

  const [etipo, setT] = React.useState("");
  const [eescala, setEs] = React.useState("");
  const [epnt, setP] = React.useState("");
  const [ecalculo, setC] = React.useState("");

  const [form, setForm] = React.useState({
    tipo: "",
    escala: "",
    pnt: "",
    calculo: "",
  });

  const [errors, setErrors] = React.useState({
    tipo: "",
    escala: "",
    pnt: "",
    calculo: "",
  });

  function DevolverBoton() {
    if (etipo === "1" && ecalculo === "1" && eescala === "1" && epnt === "1") {
      return (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            var data = {
              Tipo: form.tipo,
              Escala: form.escala,
              PNT: form.pnt,
              Calculo: form.calculo,
              IdCursada: props.idcursada,
            };

            Responses.consultas(data, endpoints.agregarParametro)
              .then((response) => {
                if (Responses.status === 200) {
                  setT("");
                  setC("");
                  setP("");
                  setEs("");

                  setForm({
                    tipo: "",
                    calculo: "",
                    pnt: "",
                    escala: "",
                  });

                  props.abrir(true);
                  props.mensaje("Parámetro de examen agregado con éxito");
                  props.tipo("success");
                  handleClose();
                } else if (Responses.status === 401) {
                  navegar(routes.iniciarSesion);
                } else if (Responses.status === 460) {
                  if (response.tipo !== undefined) {
                    setErrors({ ...errors, tipo: response.tipo });
                    setT("2");
                  }

                  if (response.calculo !== undefined) {
                    setErrors({ ...errors, calculo: response.calculo });
                    setC("2");
                  }

                  if (response.pnt !== undefined) {
                    setErrors({ ...errors, pnt: response.pnt });
                    setP("2");
                  }

                  if (response.escala !== undefined) {
                    setErrors({ ...errors, escala: response.escala });
                    setEs("2");
                  }
                } else {
                  navegar(routes.error);
                }
              })
              .catch((error) => {
                navegar(routes.error);
              });
          }}
        >
          Agregar
        </Button>
      );
    } else {
      return (
        <Button variant="contained" disabled onClick={handleClose}>
          Agregar
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

  function CambioTipoCalculo(param) {
    if (param === "") {
      setForm({ ...form, calculo: param });
      setC("2");
    } else {
      setForm({ ...form, calculo: param });
      setC("1");
    }
  }

  function CambioTipoExamen(param) {
    setForm({ ...form, tipo: param });
    setErrors({ ...errors, tipo: "" });

    if (param === "") {
      setT("2");
    } else {
      var data = {
        Tipo: param,
        IdCursada: props.idcursada,
        IdParametro: null,
      };

      Responses.consultas(
        data,

        endpoints.consultarTipoParam
      )
        .then((response) => {
          if (Responses.status === 200) {
            setErrors({ ...errors, tipo: "" });

            setT("1");
          } else if (Responses.status === 401) {
            navegar(routes.iniciarSesion);
          } else if (Responses.status === 460) {
            setT("2");
            setErrors({ ...errors, tipo: response.Error });
          } else {
            navegar(routes.error);
          }
        })
        .catch((error) => {
          navegar(routes.error);
        });
    }
  }

  return (
    <>
      <Tooltip title="Agregar parámetro" TransitionComponent={Zoom} arrow>
        <span>
          <IconButton
            color="secondary"
            size="small"
            onClick={handleOpen}
            // sx={{ color: "icons.secondary" }}
          >
            <AddCircleOutline />
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
          <AddCircleOutline sx={{ alignSelf: "center", marginRight: 1 }} />
          Agregar parámetro de examen
        </DialogTitle>

        <DialogContent>
          <DialogContentText marginBottom={1}>
            {props.Materia} - {props.anio} - {props.semestre}
          </DialogContentText>
          <DialogContentText>
            Ingrese los datos para agregar el parámetro de examen.
          </DialogContentText>

          <FormControl
            fullWidth
            sx={estiloFormControlSelect}
            error={errors.tipo ? true : false}
          >
            {<BotonTipoExamen Cambio={CambioTipoExamen} />}
            <FormHelperText>{errors.tipo}</FormHelperText>
          </FormControl>

          <FormControl
            sx={estiloFormControl}
            error={errors.calculo ? true : false}
          >
            {<BotonTipoCalculo Cambio={CambioTipoCalculo} />}

            <FormHelperText>{errors.calculo}</FormHelperText>
          </FormControl>

          <FormControl
            sx={estiloFormControl}
            error={errors.escala ? true : false}
          >
            <InputLabel htmlFor="escala">Escala</InputLabel>
            <Input
              id="escala"
              type="text"
              name="escala"
              onChange={(e) => {
                if (errors.escala !== "") {
                  setErrors({ ...errors, [e.target.name]: "" });
                }

                setEs("");
                setForm({
                  ...form,
                  [e.target.name]: e.target.value,
                });
              }}
              onBlur={(e) => {
                let regex = /^[0-9]+$/;

                if (!form.escala.trim()) {
                  setErrors({
                    ...errors,
                    [e.target.name]: "El campo 'Escala' es requerido.",
                  });
                  setEs("2");
                } else if (!regex.test(form.escala.trim())) {
                  setErrors({
                    ...errors,
                    [e.target.name]: "Ls escala tiene un formato incorrecto.",
                  });
                  setEs("2");
                } else {
                  setEs("1");
                }
              }}
              value={form.escala}
              endAdornment={
                (eescala === "1" && <BotonEstadoRegistro estado={"1"} />) ||
                (eescala === "2" && <BotonEstadoRegistro estado={"2"} />)
              }
            />

            {/* {eescala === "1" && <BotonEstadoRegistro estado={"1"} />}
            {eescala === "2" && <BotonEstadoRegistro estado={"2"} />} */}

            <FormHelperText>{errors.escala}</FormHelperText>
          </FormControl>

          <FormControl sx={estiloFormControl} error={errors.pnt ? true : false}>
            <InputLabel htmlFor="pnt">%/Total</InputLabel>
            <Input
              id="pnt"
              type="text"
              name="pnt"
              onChange={(e) => {
                if (errors.pnt !== "") {
                  setErrors({ ...errors, [e.target.name]: "" });
                }

                setP("");
                setForm({
                  ...form,
                  [e.target.name]: e.target.value,
                });
              }}
              onBlur={(e) => {
                let regex = /^[0-9]+$/;

                if (!form.pnt.trim()) {
                  setErrors({
                    ...errors,
                    [e.target.name]: "El campo '%/Total' es requerido.",
                  });
                  setP("2");
                } else if (!regex.test(form.pnt.trim())) {
                  setErrors({
                    ...errors,
                    [e.target.name]:
                      "El %/Total ingresado tiene un formato incorrecto.",
                  });
                  setP("2");
                } else if (
                  parseInt(form.pnt.trim(), 10) < 1 ||
                  parseInt(form.pnt.trim(), 10) > 100
                ) {
                  setErrors({
                    ...errors,
                    [e.target.name]: "El %/Total debe estar entre 1 - 100.",
                  });
                  setP("2");
                } else {
                  var data = {
                    PNT: form.pnt,
                    IdCursada: props.idcursada,
                    IdParametro: null,
                  };

                  Responses.consultas(data, endpoints.consultarPnt)
                    .then((response) => {
                      if (Responses.status === 200) {
                        setErrors({ ...errors, pnt: "" });

                        setP("1");
                      } else if (Responses.status === 401) {
                        navegar(routes.iniciarSesion);
                      } else if (Responses.status === 460) {
                        setP("2");
                        setErrors({ ...errors, pnt: response.Error });
                      } else {
                        navegar(routes.error);
                      }
                    })
                    .catch((error) => {
                      navegar(routes.error);
                    });
                }
              }}
              value={form.pnt}
              endAdornment={
                (epnt === "1" && <BotonEstadoRegistro estado={"1"} />) ||
                (epnt === "2" && <BotonEstadoRegistro estado={"2"} />)
              }
            />

            {/* {epnt === "1" && <BotonEstadoRegistro estado={"1"} />}
            {epnt === "2" && <BotonEstadoRegistro estado={"2"} />} */}

            <FormHelperText>{errors.pnt}</FormHelperText>
          </FormControl>
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
