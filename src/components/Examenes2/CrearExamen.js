import React from "react";
import { Button, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useModal } from "../../hooks/useModal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";

export const CrearExamen = (props) => {
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  const navegar = useNavigate();

  // const [dato, setParam] = React.useState(props.parametros);

  const [isOpen, handleOpen, handleClose] = useModal(false);

  const [eexamen, setE] = React.useState("");
  const [enotaminima, setNM] = React.useState("");
  const [etipo, setT] = React.useState("");

  const [notamincomp, setNMC] = React.useState("");
  const [aod, setAOD] = React.useState(true);
  //const [banderacarga, setBC] = React.useState('2');

  const [tipo, setTipo] = React.useState("");

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

  const [form, setForm] = React.useState({
    examen: "",
    fechavencimiento: "",
    notaminima: "",
    tipo: "",
  });

  const [errors, setErrors] = React.useState({
    examen: "",
    fechavencimiento: "",
    notaminima: "",
    tipo: "",
  });

  function Crear() {
    if (form.fechavencimiento.length > 0) {
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
      pExamen: form.examen,
      pFV: fv,
      pNM: form.notaminima,
      pTipo: tipo,
      // pidCu: cursada.IdCursada,
      pidCu: props.cursada.IdCursada,
    };

    Responses.consultas(data, "http://127.0.0.1:8000/api/crearexamen")
      .then((response) => {
        if (Responses.status === 200) {
          handleClose();

          setE("");
          setNM("");

          setT("");

          setForm({
            practico: "",
            fechavencimiento: "",
            notaminima: "",
            tipo: "",
          });

          props.abrir(true);
          props.mensaje("Examen creado con éxito");
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
        <Button variant="contained" onClick={Crear}>
          Crear
        </Button>
      );
    } else {
      return (
        <Button variant="contained" disabled onClick={handleClose}>
          Crear
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
    setTipo(param);

    if (param === "" || param === undefined || param === null) {
      setForm({ ...form, tipo: param });

      setT("2");
    } else {
      setForm({ ...form, tipo: param });
      setT("1");
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
        Crear examen
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
        <DialogTitle>Crear examen</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese los datos para crear el examen.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
                        // pidCu: cursada.IdCursada,
                        pidCu: props.cursada.IdCursada,
                        pidE: "",
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

            <Grid item xs={12}>
              <FormControl
                fullWidth
                sx={estiloFormControlSelect}
                error={errors.fechavencimiento ? true : false}
              >
                <Calendario Cambio={CambioFV} label={"Fecha De Vencimiento"} />

                <FormHelperText>{errors.fechavencimiento}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl
                fullWidth
                sx={estiloFormControlSelect}
                error={errors.tipo ? true : false}
              >
                {
                  <BotonTipo
                    Cambio={CambioTipo}
                    cursada={props.cursada}
                    // dato={dato}
                    dato={props.parametros}
                    CambioNM={NotaMinima}
                  />
                }
                <FormHelperText>{errors.tipo}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
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
                          "La nota mínima ingresada debe ser menor o igual a " +
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
