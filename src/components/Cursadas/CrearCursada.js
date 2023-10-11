import React from "react";
//MUI
import { Box, Button, CircularProgress, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddLinkOutlinedIcon from "@mui/icons-material/AddLinkOutlined";
import { FormHelperText } from "@mui/material";
import { FormControl, InputLabel, Input, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
//
import { useNavigate } from "react-router-dom";
//Componentes
import * as Responses from "../Responses";
import { BotonEstadoRegistro } from "./BotonEstadoRegistro";
import BotonAnio from "./BotonAnio";
import BotonSemestre from "./BotonSemestre";
import BotonTieneGrupo from "./BotonTieneGrupo";
import BotonTipoCalculo from "./BotonTipoCalculo";
import Calendario from "./Calendario";
import { useModal } from "../../hooks/useModal";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";

/*** Componente CrearCursada ***/
export const CrearCursada = (props) => {
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  const navegar = useNavigate();

  const [isOpen, handleOpen, handleClose] = useModal(false);

  const [enn, setNom] = React.useState("");
  const [eanio, setAn] = React.useState("");
  const [esemestre, setSem] = React.useState("");
  const [efinicio, setFi] = React.useState("");
  const [effin, setFf] = React.useState("");
  const [eprograma, setPr] = React.useState("");
  const [etieneg, setTg] = React.useState("");
  const [emaxintg, setMx] = React.useState("");
  const [eescala, setEs] = React.useState("");
  const [epnt, setP] = React.useState("");
  const [ecalculo, setC] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  const [form, setForm] = React.useState({
    anio: "",
    semestre: "",
    finicio: "",
    ffin: "",
    programa: "",
    tieneg: "",
    maxintg: "",
    escala: "",
    pnt: "",
    calculo: "",
  });

  const [errors, setErrors] = React.useState({
    anio: "",
    semestre: "",
    finicio: "",
    ffin: "",
    programa: "",
    tieneg: "",
    maxintg: "",
    escala: "",
    pnt: "",
    calculo: "",
  });

  function Crear() {
    let p = form.finicio.toLocaleDateString();

    let indice = p.indexOf("/");
    let extraida = p.substring(0, indice);

    let param2 = p.substr(indice + 1);

    let indice2 = param2.indexOf("/");
    let extraida2 = param2.substring(0, indice2);

    let param3 = param2.substr(indice2 + 1);

    var fi = param3.concat("-", extraida2);
    var fi = fi.concat("-", extraida);

    let pp = form.ffin.toLocaleDateString();

    let iindice = pp.indexOf("/");
    let eextraida = pp.substring(0, iindice);

    let pparam2 = pp.substr(iindice + 1);

    let iindice2 = pparam2.indexOf("/");
    let eextraida2 = pparam2.substring(0, iindice2);

    let pparam3 = pparam2.substr(iindice2 + 1);

    var ff = pparam3.concat("-", eextraida2);
    var ff = ff.concat("-", eextraida);

    var data = {
      Anio: form.anio,
      Semestre: form.semestre,
      FechaInicio: fi,
      FechaFin: ff,
      Programa: form.programa,
      TieneGrupos: form.tieneg,
      MaximoIntGrupos: form.maxintg,
      EscalaPracticos: form.escala,
      PorcentajeNotaTotalPracticos: form.pnt,
      CalculoPracticos: form.calculo,
      IdMateria: props.idmateria,
    };

    setIsLoading(true);
    Responses.consultas(data, endpoints.crearCursada)
      .then((response) => {
        if (Responses.status === 200) {
          handleClose();

          setAn("");
          setSem("");
          setFi("");
          setFf("");
          setPr("");
          setTg("");
          setMx("");
          setEs("");
          setP("");
          setC("");

          setForm({
            anio: "",
            semestre: "",
            finicio: "",
            ffin: "",
            programa: "",
            tieneg: "",
            maxintg: "",
            escala: "",
            pnt: "",
            calculo: "",
          });

          props.abrir(true);
          props.mensaje("Cursada creada con éxito");
          props.tipo("success");
          props.refrescar();
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
        } else if (Responses.status === 460) {
          if (response.anio !== undefined) {
            setErrors({ ...errors, anio: response.anio });
            setAn("2");
          }

          if (response.semestre !== undefined) {
            setErrors({ ...errors, semestre: response.semestre });
            setSem("2");
          }

          if (response.finicio !== undefined) {
            setErrors({ ...errors, finicio: response.finicio });
            setFi("2");
          }

          if (response.ffin !== undefined) {
            setErrors({ ...errors, ffin: response.ffin });
            setFf("2");
          }

          if (response.programa !== undefined) {
            setErrors({ ...errors, programa: response.programa });
            setPr("2");
          }

          if (response.tieneg !== undefined) {
            setErrors({ ...errors, tieneg: response.tieneg });
            setTg("2");
          }

          if (response.maxintg !== undefined) {
            setErrors({ ...errors, maxintg: response.maxintg });
            setMx("2");
          }

          if (response.calculo !== undefined) {
            setErrors({ ...errors, calculo: response.calculo });
            setC("2");
          }

          if (response.escala !== undefined) {
            setErrors({ ...errors, escala: response.escala });
            setEs("2");
          }

          if (response.pnt !== undefined) {
            setErrors({ ...errors, pnt: response.pnt });
            setP("2");
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
    mt: "25px",
  };

  const estiloFormControlSelect = {
    //width: fullWidth,
    mt: "25px",
  };

  function CambioAnio(param) {
    setForm({ ...form, anio: param });

    if (form.semestre !== "" && param !== "") {
      var data = {
        Anio: param.trim(),
        Semestre: form.semestre,
        IdMateria: props.idmateria,
      };

      Responses.consultas(data, endpoints.consultarAnioSem)
        .then((response) => {
          if (Responses.status === 200) {
            setErrors({ ...errors, semestre: "", anio: "" });

            setSem("1");
            setAn("1");
          } else if (Responses.status === 401) {
            navegar(routes.iniciarSesion);
          } else if (Responses.status === 460) {
            setAn("1");
            setSem("2");
            setErrors({ ...errors, semestre: response.Error });
          } else {
            navegar(routes.error);
          }
        })
        .catch((error) => {
          navegar(routes.error);
        });
    } else {
      if (param === "") {
        setForm({ ...form, anio: param });
        setAn("2");
      } else {
        setForm({ ...form, anio: param });
        setAn("1");
      }
    }
  }

  function CambioSemestre(param) {
    setForm({ ...form, semestre: param });

    if ((form.anio !== "" || form.anio !== null) && param !== "") {
      var data = {
        Anio: form.anio.trim(),
        Semestre: param.trim(),
        IdMateria: props.idmateria,
      };

      Responses.consultas(data, endpoints.consultarAnioSem)
        .then((response) => {
          if (Responses.status === 200) {
            setErrors({ ...errors, semestre: "" });

            setSem("1");
          } else if (Responses.status === 401) {
            navegar(routes.iniciarSesion);
          } else if (Responses.status === 460) {
            setSem("2");
            setErrors({ ...errors, semestre: response.Error });
          } else {
            navegar(routes.error);
          }
        })
        .catch((error) => {
          navegar(routes.error);
        });
    } else {
      setErrors({ ...errors, semestre: "" });
      if (param === "") {
        setSem("2");
      } else {
        setSem("1");
      }
    }
  }

  function CambioFi(param) {
    if (errors.finicio !== "" || errors.ffin !== "") {
      setErrors({ ...errors, finicio: "", ffin: "" });
    }
    setFi("");
    if (param === "" || param === null) {
      setErrors({ ...errors, finicio: "La fecha es inválida" });
      setForm({ ...form, finicio: "" });
      setFi("2");
    } else if (param > form.ffin && form.ffin !== "") {
      setErrors({ ...errors, ffin: "La fecha debe ser mayor" });
      setForm({ ...form, finicio: param });
      setFf("2");
      setFi("1");
    } else {
      setForm({ ...form, finicio: param });
      setFi("1");
    }
  }

  function CambioFf(param) {
    if (errors.ffin !== "") {
      setErrors({ ...errors, ffin: "" });
    }
    setFf("");

    if (param === "") {
      setErrors({ ...errors, ffin: "La fecha es inválida" });
      setForm({ ...form, ffin: "" });
      setFf("2");
    } else if (form.finicio > param) {
      setErrors({ ...errors, ffin: "La fecha debe ser mayor" });
      setForm({ ...form, ffin: param });
      setFf("2");
    } else {
      setForm({ ...form, ffin: param });
      setFf("1");
    }
  }

  function CambioTG(param) {
    if (param === "") {
      setForm({ ...form, tieneg: param });
      setTg("2");
    } else if (param === "N") {
      setForm({ ...form, tieneg: param });
      setTg("1");
      setErrors({ ...errors, maxintg: "" });

      setMx("1");
    } else {
      setForm({ ...form, tieneg: param });
      setTg("1");
    }
  }

  function CambioTipoCalculo(param) {
    if (param === "") {
      setForm({ ...form, calculo: param });
      setC("2");
    } else {
      setForm({ ...form, calculo: param });
      setC("1");
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
        Crear cursada
      </Button>

      {/* Ventana modal */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        fullScreen={esXs ? true : false}
        sx={{
          backdropFilter: "blur(0.8px)",
        }}
      >
        <DialogTitle display="flex" flexDirection="row">
          <AddIcon sx={{ alignSelf: "center", marginRight: 1 }} />
          Crear cursada
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Ingrese los datos para crear la cursada.
          </DialogContentText>

          {/* Año y semestre */}
          <Grid container spacing={2}>
            {/* Año */}
            <Grid item xs={6} sx={{ mt: 0 }}>
              <FormControl
                variant="standard"
                fullWidth
                sx={estiloFormControlSelect}
                error={errors.anio ? true : false}
              >
                {<BotonAnio Cambio={CambioAnio} />}
                <FormHelperText>{errors.anio}</FormHelperText>
              </FormControl>
            </Grid>
            {/* Semestre */}
            <Grid item xs={6} sx={{ mt: 0 }}>
              <Box sx={{ minWidth: 50 }}>
                <FormControl
                  variant="standard"
                  fullWidth
                  sx={estiloFormControlSelect}
                  error={errors.semestre ? true : false}
                  disabled={eanio !== "1" ? true : false}
                >
                  {<BotonSemestre Cambio={CambioSemestre} />}
                  <FormHelperText>{errors.semestre}</FormHelperText>
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          {/* Fecha inicio y fecha fin */}
          <Grid container spacing={2}>
            {/* Fecha inicio */}
            <Grid item xs={6} sx={{ mt: 1 }}>
              <FormControl
                variant="standard"
                fullWidth
                sx={estiloFormControlSelect}
                error={errors.finicio ? true : false}
              >
                <Calendario Cambio={CambioFi} label={"Fecha De Inicio"} />

                <FormHelperText>{errors.finicio}</FormHelperText>
              </FormControl>
            </Grid>

            {/* Fecha fin */}
            <Grid item xs={6} sx={{ mt: 1 }}>
              <Box sx={{ minWidth: 50 }}>
                <FormControl
                  fullWidth
                  sx={estiloFormControlSelect}
                  error={errors.ffin ? true : false}
                >
                  <Calendario Cambio={CambioFf} label={"Fecha De Fin"} />

                  <FormHelperText>{errors.ffin}</FormHelperText>
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          {/* Programa */}
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <FormControl
                fullWidth
                variant="standard"
                sx={estiloFormControl}
                error={errors.programa ? true : false}
              >
                <InputLabel htmlFor="programa">Programa</InputLabel>
                <Input
                  id="programa"
                  type="text"
                  name="programa"
                  onChange={(e) => {
                    if (errors.programa !== "") {
                      setErrors({ ...errors, [e.target.name]: "" });
                    }

                    setPr("");
                    setForm({
                      ...form,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  onBlur={(e) => {
                    setPr("1");
                  }}
                  value={form.programa}
                  endAdornment={
                    (eprograma === "1" && (
                      <BotonEstadoRegistro estado={"1"} />
                    )) ||
                    (eprograma === "2" && <BotonEstadoRegistro estado={"2"} />)
                  }
                  startAdornment={
                    <AddLinkOutlinedIcon sx={{ marginRight: 1 }} />
                  }
                />

                {/* {eprograma === "1" && <BotonEstadoRegistro estado={"1"} />}
            {eprograma === "2" && <BotonEstadoRegistro estado={"2"} />} */}

                <FormHelperText>{errors.programa}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          {/* Permite grupos y max. integrantes */}
          <Grid container spacing={2}>
            {/* Permite grupos */}
            <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
              <FormControl
                fullWidth
                variant="standard"
                sx={estiloFormControl}
                error={errors.tieneg ? true : false}
              >
                {<BotonTieneGrupo Cambio={CambioTG} />}

                <FormHelperText>{errors.tieneg}</FormHelperText>
              </FormControl>
            </Grid>

            {/* Maximo integrantes */}
            <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
              <FormControl
                fullWidth
                variant="standard"
                sx={estiloFormControl}
                error={errors.maxintg ? true : false}
                disabled={
                  form.tieneg === "N" || form.tieneg === "" || etieneg !== "1"
                    ? true
                    : false
                }
              >
                <InputLabel htmlFor="maxintg">Maximo Integrantes</InputLabel>
                <Input
                  id="maxintg"
                  type="text"
                  name="maxintg"
                  onChange={(e) => {
                    if (errors.maxintg !== "") {
                      setErrors({ ...errors, [e.target.name]: "" });
                    }

                    setMx("");
                    setForm({
                      ...form,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  onBlur={(e) => {
                    let regex = /^[0-9]+$/;

                    if (!form.maxintg.trim()) {
                      setErrors({
                        ...errors,
                        [e.target.name]: "El campo es requerido.",
                      });
                      setMx("2");
                    } else if (!regex.test(form.maxintg.trim())) {
                      setErrors({
                        ...errors,
                        [e.target.name]:
                          "El campo tiene un formato incorrecto.",
                      });
                      setMx("2");
                    } else if (parseInt(form.maxintg.trim()) < 1) {
                      setErrors({
                        ...errors,
                        [e.target.name]: "El campo debe ser mayor.",
                      });
                      setMx("2");
                    } else {
                      setMx("1");
                    }
                  }}
                  value={form.maxintg}
                  endAdornment={
                    (emaxintg === "1" && (
                      <BotonEstadoRegistro estado={"1"} />
                    )) ||
                    (emaxintg === "2" && <BotonEstadoRegistro estado={"2"} />)
                  }
                />

                {/* {emaxintg === "1" && <BotonEstadoRegistro estado={"1"} />}
            {emaxintg === "2" && <BotonEstadoRegistro estado={"2"} />} */}

                <FormHelperText>{errors.maxintg}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          {/* Tipo de calculo */}
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Box sx={{ minWidth: 50 }}>
                <FormControl
                  variant="standard"
                  fullWidth
                  sx={estiloFormControl}
                  error={errors.calculo ? true : false}
                >
                  {<BotonTipoCalculo Cambio={CambioTipoCalculo} />}

                  <FormHelperText>{errors.calculo}</FormHelperText>
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          {/* Escala y  porcentaje total */}
          <Grid container columnSpacing={2}>
            {/* Escala */}
            <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
              <FormControl
                fullWidth
                variant="standard"
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
                        [e.target.name]:
                          "Ls escala tiene un formato incorrecto.",
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
            </Grid>
            {/* Porcentaje total */}
            <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
              <FormControl
                fullWidth
                variant="standard"
                sx={estiloFormControl}
                error={errors.pnt ? true : false}
              >
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
                      setP("1");
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
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {eanio === "1" &&
          esemestre === "1" &&
          efinicio === "1" &&
          effin === "1" &&
          eprograma === "1" &&
          etieneg === "1" &&
          emaxintg === "1" &&
          eescala === "1" &&
          epnt === "1" &&
          ecalculo === "1" ? (
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
