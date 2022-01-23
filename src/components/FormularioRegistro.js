import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Grid,
  Paper,
  Typography,
  FormHelperText,
  LinearProgress,
  Collapse,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  estiloPaper,
  estiloFormControl,
  estiloButton,
  estiloLink,
  estiloHeader,
  estiloContent,
} from "../styles/EstilosFormularioRegistro";

import { peticionRegistrarUsuario } from "../api/sgicApi";

const valoresInicialesForm = {
  nombres: "",
  apellidos: "",
  usuario: "",
  email: "",
  dni: "",
  libreta: "",
  contrasenia: "",
  repetirContrasenia: "",
};

const regexSoloNumeros = /^\d+$/;
const regexContrasenia = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,10}$/;

const validaciones = yup.object({
  nombres: yup.string().required("Este campo es obligatorio"),
  apellidos: yup.string().required("Este campo es obligatorio"),
  usuario: yup.string().required("Este campo es obligatorio"),
  email: yup
    .string()
    .email("El email ingresado tiene un formato incorrecto.")
    .required("Este campo es obligatorio"),
  dni: yup
    .string()
    .matches(regexSoloNumeros, "Este campo solo admite valores numericos.")
    .required("Este campo es obligatorio"),
  libreta: yup.string().required("Este campo es obligatorio"),
  contrasenia: yup
    .string()
    .matches(
      regexContrasenia,
      "La contraseña debe tener un minimo de 8 caracteres y un maximo de 10. Debe contener al menos un numero, una letra en minuscula y una letra en mayuscula."
    )
    .required("Este campo es obligatorio"),
  repetirContrasenia: yup
    .string()
    .oneOf([yup.ref("contrasenia"), null], "Las contraseñas deben coincidir.")
    .required("Este campo es obligatorio"),
});

/**
 * Componente FormularioRegistro.
 * @returns
 */
function FormularioRegistro() {
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [mostrarRepetirContrasenia, setMostrarRepetirContrasenia] =
    useState(false);
  const [mostrarErrorRegistro, setMostrarErrorRegistro] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: valoresInicialesForm,
    validationSchema: validaciones,
    onSubmit: (values) => {
      registrarUsuario(values);
    },
  });

  const handleClickMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
  };

  const handleClickRepetirMostrarContrasenia = () => {
    setMostrarRepetirContrasenia(!mostrarRepetirContrasenia);
  };

  const registrarUsuario = async (values) => {
    setIsLoading(true);
    try {
      const res = await peticionRegistrarUsuario(values);
      console.log(res.data.mensaje);
      navigate(`/registro_exitoso/${res.data.Mensaje}`);
    } catch (error) {
      console.log(error.response.data.errors.Contrasena);
      setMostrarErrorRegistro(true);
      setMensajeError(error.response.data.errors.Contrasena);
      setTimeout(() => {
        setMostrarErrorRegistro(false);
        setMensajeError("");
      }, 5000);
    }

    setIsLoading(false);
  };

  return (
    <Grid>
      <Paper sx={estiloPaper}>
        <Grid align="center" sx={estiloHeader}>
          <Typography variant="h5">Registro</Typography>
        </Grid>

        <Grid sx={estiloContent}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              sx={estiloFormControl}
              error={formik.touched.nombres && Boolean(formik.errors.nombres)}
            >
              <InputLabel htmlFor="nombres">Nombre/s</InputLabel>
              <Input
                id="nombres"
                type="text"
                name="nombres"
                value={formik.values.nombres}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>
                {formik.touched.nombres && formik.errors.nombres}
              </FormHelperText>
            </FormControl>

            <FormControl
              sx={estiloFormControl}
              error={
                formik.touched.apellidos && Boolean(formik.errors.apellidos)
              }
            >
              <InputLabel htmlFor="apellidos">Apellido/s</InputLabel>
              <Input
                id="apellidos"
                type="text"
                name="apellidos"
                value={formik.values.apellidos}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>
                {formik.touched.apellidos && formik.errors.apellidos}
              </FormHelperText>
            </FormControl>

            <FormControl
              sx={estiloFormControl}
              error={formik.touched.usuario && Boolean(formik.errors.usuario)}
            >
              <InputLabel htmlFor="Usuario">Usuario</InputLabel>
              <Input
                id="usuario"
                type="text"
                name="usuario"
                value={formik.values.usuario}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>
                {formik.touched.usuario && formik.errors.usuario}
              </FormHelperText>
            </FormControl>

            <FormControl
              sx={estiloFormControl}
              error={formik.touched.email && Boolean(formik.errors.email)}
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>
                {formik.touched.email && formik.errors.email}
              </FormHelperText>
            </FormControl>

            <FormControl
              sx={estiloFormControl}
              error={formik.touched.dni && Boolean(formik.errors.dni)}
            >
              <InputLabel htmlFor="dni">DNI</InputLabel>
              <Input
                id="dni"
                type="text"
                name="dni"
                value={formik.values.dni}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>
                {formik.touched.dni && formik.errors.dni}
              </FormHelperText>
            </FormControl>

            <FormControl
              sx={estiloFormControl}
              error={formik.touched.libreta && Boolean(formik.errors.libreta)}
            >
              <InputLabel htmlFor="libreta">Libreta</InputLabel>
              <Input
                id="libreta"
                type="text"
                name="libreta"
                value={formik.values.libreta}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText>
                {formik.touched.libreta && formik.errors.libreta}
              </FormHelperText>
            </FormControl>

            <FormControl
              sx={estiloFormControl}
              error={
                formik.touched.contrasenia && Boolean(formik.errors.contrasenia)
              }
            >
              <InputLabel htmlFor="contrasenia">Contraseña</InputLabel>
              <Input
                id="contrasenia"
                type={mostrarContrasenia ? "text" : "password"}
                name="contrasenia"
                value={formik.values.contrasenia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="cambiar mostrar contraseña"
                      onClick={handleClickMostrarContrasenia}
                    >
                      {mostrarContrasenia ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>
                {formik.touched.contrasenia && formik.errors.contrasenia}
              </FormHelperText>
            </FormControl>

            <FormControl
              sx={estiloFormControl}
              error={
                formik.touched.repetirContrasenia &&
                Boolean(formik.errors.repetirContrasenia)
              }
            >
              <InputLabel htmlFor="repetirContrasenia">
                Repetir contraseña
              </InputLabel>
              <Input
                id="repetirContrasenia"
                type={mostrarRepetirContrasenia ? "text" : "password"}
                name="repetirContrasenia"
                value={formik.values.repetirContrasenia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="cambiar mostrar contraseña"
                      onClick={handleClickRepetirMostrarContrasenia}
                    >
                      {mostrarRepetirContrasenia ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>
                {formik.touched.repetirContrasenia &&
                  formik.errors.repetirContrasenia}
              </FormHelperText>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={estiloButton}
              disabled={isLoading ? true : false}
            >
              Registrarse
            </Button>
          </form>

          <Box sx={{ width: "100%", mt: "10px" }}>
            <LinearProgress sx={isLoading ? { opacity: 1 } : { opacity: 0 }} />
          </Box>

          <Collapse in={mostrarErrorRegistro}>
            <Alert severity="error">{mensajeError}</Alert>
          </Collapse>

          <Box textAlign="center" sx={estiloLink}>
            <Link
              href="#"
              underline="hover"
              color="secondary"
              to="/iniciar_sesion_alumno"
              component={LinkRouter}
            >
              ¿Ya tenes una cuenta? Inicia sesion.
            </Link>
          </Box>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default FormularioRegistro;
