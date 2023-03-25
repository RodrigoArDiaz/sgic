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
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { FormHelperText } from "@mui/material";
import { FormControl, InputLabel, Input, Grid } from "@mui/material";
//
import * as Responses from "../Responses";
import { useNavigate } from "react-router-dom";
import Calendario from "./Calendario";
import { BotonEstadoRegistro } from "./BotonEstadoRegistro";
import BotonTipo from "./BotonTipo";
//Hooks pers
import { useModal } from "../../hooks/useModal";
import { useTheme } from "@emotion/react";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";

/*** Componente ModificarExamen***/
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

    Responses.consultas(data, endpoints.modificarExamen)
      .then((response) => {
        if (Responses.status === 200) {
          handleClose();
          props.abrir(true);
          props.mensaje("Examen modificado con éxito");
          props.tipo("success");
          props.refrescar();
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
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
          console.log(response);
          // navegar(routes.error);
        }
      })
      .catch((error) => {
        console.log(error);
        // navegar(routes.error);
      });
  }

  function DevolverBoton() {
    if (eexamen === "1" && enotaminima === "1" && etipo === "1") {
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
          Modificar examen
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese los datos para modificar el examen.
          </DialogContentText>

          <Grid container spacing={2}>
            {/* Examen */}
            <Grid item xs={12} sx={{ mt: 1 }}>
              <FormControl
                variant="standard"
                fullWidth
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

                      Responses.consultas(data, endpoints.consultarNomExamen)
                        .then((response) => {
                          if (Responses.status === 200) {
                            setE("1");
                          } else if (Responses.status === 401) {
                            navegar(routes.iniciarSesion);
                          } else if (Responses.status === 460) {
                            setE("2");
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

            {/* Fecha de vencimiento */}
            <Grid item xs={12}>
              <FormControl
                variant="standard"
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

            {/* Tipo */}
            <Grid item xs={12}>
              <FormControl
                variant="standard"
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

            {/* Nota minima */}
            <Grid item xs={12}>
              <FormControl
                variant="standard"
                fullWidth
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
          <Button onClick={handleClose} variant="outlined">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
