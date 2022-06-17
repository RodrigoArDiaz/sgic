import React from "react";
import { Button } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useModal } from "../../useModal";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import BotonTipoCalculo from "../BotonTipoCalculo";
import BotonTipoExamen from "../BotonTipoExamen";
import { BotonEstadoRegistro } from "../BotonEstadoRegistro";
import { FormHelperText } from "@mui/material";
import { FormControl, InputLabel, Input, Typography } from "@mui/material";

import * as Responses from "../../Responses";
import { useNavigate } from "react-router-dom";

export const ModificarParametro = (props) => {
  const navegar = useNavigate();

  const [isOpen, handleOpen, handleClose] = useModal(false);

  const [etipo, setT] = React.useState("1");
  const [eescala, setEs] = React.useState("1");
  const [epnt, setP] = React.useState("1");
  const [ecalculo, setC] = React.useState("1");

  const [form, setForm] = React.useState({
    tipo: props.parametro.Tipo,
    escala: props.parametro.Escala,
    pnt: props.parametro.PorcentajeNotaTotal,
    calculo: props.parametro.Calculo,
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
          //sx={estiloButton}
          onClick={() => {
            var data = {
              Tipo: form.tipo,
              Escala: form.escala,
              PNT: form.pnt,
              Calculo: form.calculo,
              IdParametro: props.parametro.IdParametro,
              IdCursada: props.idcursada,
            };

            Responses.consultas(
              data,
              "http://127.0.0.1:8000/api/modificarparametro"
            )
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
                  props.mensaje("Parámetro de examen modificado con éxito");
                  props.tipo("success");
                  props.refrescar();
                  handleClose();
                } else if (Responses.status === 401) {
                  navegar("/ingreso");
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
                  navegar("/error");
                }
              })
              .catch((error) => {
                navegar("/error");
              });
          }}
        >
          Modificar
        </Button>
      );
    } else {
      return (
        <Button variant="contained" disabled onClick={handleClose}>
          Modificar
        </Button>
      );
    }
  }

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

  const estiloContent = {
    padding: "5px 40px 40px 40px ",
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
        IdParametro: props.parametro.IdParametro,
      };

      Responses.consultas(data, "http://127.0.0.1:8000/api/consultartipoparam")
        .then((response) => {
          if (Responses.status === 200) {
            setErrors({ ...errors, tipo: "" });

            setT("1");
          } else if (Responses.status === 401) {
            navegar("/ingreso");
          } else if (Responses.status === 460) {
            setT("2");
            setErrors({ ...errors, tipo: response.Error });
          } else {
            navegar("/error");
          }
        })
        .catch((error) => {
          navegar("/error");
        });
    }
  }

  return (
    <>
      <Tooltip title="Modificar">
        <IconButton color="secondary" size="small" onClick={handleOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>
          Modificar parámetro de examen - {props.Materia} - {props.anio} -{" "}
          {props.semestre}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese los datos para modificar del parámetro de examen.
          </DialogContentText>

          <FormControl
            fullWidth
            sx={estiloFormControlSelect}
            error={errors.tipo ? true : false}
          >
            {
              <BotonTipoExamen
                Cambio={CambioTipoExamen}
                vpd={props.parametro.Tipo}
              />
            }
            <FormHelperText>{errors.tipo}</FormHelperText>
          </FormControl>

          <FormControl
            sx={estiloFormControl}
            error={errors.calculo ? true : false}
          >
            {
              <BotonTipoCalculo
                Cambio={CambioTipoCalculo}
                vpd={props.parametro.Calculo}
              />
            }

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
                    IdParametro: props.parametro.IdParametro,
                  };

                  Responses.consultas(
                    data,
                    "http://127.0.0.1:8000/api/consultarpnt"
                  )
                    .then((response) => {
                      if (Responses.status === 200) {
                        setErrors({ ...errors, pnt: "" });

                        setP("1");
                      } else if (Responses.status === 401) {
                        navegar("/ingreso");
                      } else if (Responses.status === 460) {
                        setP("2");
                        setErrors({ ...errors, pnt: response.Error });
                      } else {
                        navegar("/error");
                      }
                    })
                    .catch((error) => {
                      navegar("/error");
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
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
