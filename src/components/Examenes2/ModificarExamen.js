import React from "react";
//MUI
import { Button, useMediaQuery, Zoom } from "@mui/material";
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
import BotonTipo from "./BotonTipo";
import { FormHelperText } from "@mui/material";
import {
  FormControl,
  InputLabel,
  Input,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import * as Responses from "../Responses";
import { useNavigate } from "react-router-dom";

//Hooks pers
import { useModal } from "../../hooks/useModal";
import { useTheme } from "@emotion/react";

export const ModificarExamen = (props) => {
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  const navegar = useNavigate();

  const [isOpen, handleOpen, handleClose] = useModal(false);
  const [dato, setParam] = React.useState(props.parametros);

  const [eexamen, setE] = React.useState("1");
  const [efechavencimiento, setFV] = React.useState("1");
  const [enotaminima, setNM] = React.useState("1");
  const [etipo, setT] = React.useState("1");

  const [notamincomp, setNMC] = React.useState("");
  const [aod, setAOD] = React.useState(false);
  //const [banderacarga, setBC] = React.useState('2');

  const [tipo, setTipo] = React.useState(props.examen.IdParametro);

  const [form, setForm] = React.useState({
    examen: props.examen.Examen,
    fechavencimiento: props.examen.FechaVencimiento,
    notaminima: props.examen.NotaMinimaAprobacion,
    tipo: props.examen.IdParametro,
  });

  const [errors, setErrors] = React.useState({
    examen: "",
    fechavencimiento: "",
    notaminima: "",
    tipo: "",
  });

  function NotaMinima(param) {
    setNM("");
    setErrors({ ...errors, notaminima: "" });
    setForm({ ...form, notaminima: "" });

    if (param === "") {
      setNMC("");
      setAOD(true);
    } else {
      setNMC(param);
      setAOD(false);
    }
  }

  function FormatoFecha(param) {
    if (param) {
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
      pExamen: form.examen,
      pFV: fv,
      pNM: form.notaminima,
      pTipo: tipo,
      pidE: props.examen.IdExamen,
      pidCu: props.cursada.IdCursada,
    };

    Responses.consultas(data, "http://127.0.0.1:8000/api/modificarexamen")
      .then((response) => {
        if (Responses.status === 200) {
          handleClose();
          props.abrir(true);
          props.mensaje("Examen modificado con éxito");
          props.tipo("success");
          props.refrescar();
        } else if (Responses.status === 401) {
          navegar("/ingreso");
        } else if (Responses.status === 460) {
          if (response.examen !== undefined) {
            setErrors({ ...errors, examen: response.examen });
            setE("2");
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
    if (eexamen === "1" && enotaminima === "1" && etipo === "1") {
      return (
        <Button variant="contained" onClick={Modificar}>
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

  const estiloFormControlSelect = {
    //width: fullWidth,
    mt: "25px",
  };

  const estiloContent = {
    padding: "5px 40px 40px 40px ",
  };

  function CambioFV(param) {
    if (param === "" || param === null) {
      setForm({ ...form, fechavencimiento: "" });
    } else {
      setForm({ ...form, fechavencimiento: param });
    }
  }

  function CambioTipo(param) {
    setForm({ ...form, tipo: param });
    setTipo(param);

    if (param === "" || param === undefined || param === null) {
      setT("2");
    } else {
      setT("1");
    }
  }

  return (
    <>
      <Tooltip title="Modificar" TransitionComponent={Zoom} arrow>
        <span>
          <IconButton color="secondary" size="small" onClick={handleOpen}>
            <EditIcon />
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
        <DialogTitle>Modificar examen</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese los datos para modificar el examen.
          </DialogContentText>

          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <FormControl
                sx={estiloFormControl}
                error={errors.examen ? true : false}
              >
                <InputLabel htmlFor="examen">Examen</InputLabel>
                <Input
                  id="examen"
                  type="text"
                  name="examen"
                  onChange={(e) => {
                    if (errors.examen !== "") {
                      setErrors({ ...errors, [e.target.name]: "" });
                    }

                    setE("");
                    setForm({
                      ...form,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  onBlur={(e) => {
                    let regex = /^[0-9a-zA-Z\s]+$/;
                    if (!form.examen.trim()) {
                      setErrors({
                        ...errors,
                        [e.target.name]: "El campo 'Examen' es requerido.",
                      });
                      setE("2");
                    } else if (!regex.test(form.examen.trim())) {
                      setErrors({
                        ...errors,
                        [e.target.name]:
                          "El examen ingresado tiene un formato incorrecto.",
                      });
                      setE("2");
                    } else {
                      var data = {
                        pExamen: form.examen,
                        pidCu: props.cursada.IdCursada,
                        pidE: props.examen.IdExamen,
                      };

                      Responses.consultas(
                        data,
                        "http://127.0.0.1:8000/api/consultarnomexamen"
                      )
                        .then((response) => {
                          if (Responses.status === 200) {
                            setE("1");
                          } else if (Responses.status === 401) {
                            navegar("/ingreso");
                          } else if (Responses.status === 460) {
                            setE("2");
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
                  value={form.examen}
                  endAdornment={
                    (eexamen === "1" && <BotonEstadoRegistro estado={"1"} />) ||
                    (eexamen === "2" && <BotonEstadoRegistro estado={"2"} />)
                  }
                />

                {/* {eexamen === "1" && <BotonEstadoRegistro estado={"1"} />}
                {eexamen === "2" && <BotonEstadoRegistro estado={"2"} />} */}

                <FormHelperText>{errors.examen}</FormHelperText>
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
                  vpd={FormatoFecha(props.examen.FechaVencimiento)}
                />

                <FormHelperText>{errors.fechavencimiento}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ mt: 1 }}>
              <FormControl
                fullWidth
                sx={estiloFormControlSelect}
                error={errors.tipo ? true : false}
              >
                {
                  <BotonTipo
                    Cambio={CambioTipo}
                    vpd={props.examen.IdParametro}
                    cursada={props.cursada}
                    dato={dato}
                    CambioNM={NotaMinima}
                  />
                }
                <FormHelperText>{errors.tipo}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ mt: 1 }}>
              <FormControl
                sx={estiloFormControl}
                error={errors.notaminima ? true : false}
                disabled={aod}
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
                      parseInt(form.notaminima) > parseInt(notamincomp)
                    ) {
                      setErrors({
                        ...errors,
                        [e.target.name]:
                          "La nota mínima ingresada debe ser menor o igual que " +
                          notamincomp,
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
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
