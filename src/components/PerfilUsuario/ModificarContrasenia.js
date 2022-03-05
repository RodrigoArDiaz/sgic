import React, { useEffect, useState } from "react";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import * as yup from "yup";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useModal } from "../../hooks/useModal";
import { regexContrasenia } from "../../helpers/regex";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { peticionModificarContrasena } from "../../api/sgicApi";

const validaciones = yup.object({
  contraseniaActual: yup.string().required("Este campo es obligatorio"),
  contraseniaNueva: yup
    .string()
    .matches(
      regexContrasenia,
      "La contraseña debe tener un minimo de 8 caracteres y un maximo de 16. Debe contener al menos un numero, una letra en minuscula y una letra en mayuscula."
    )
    .required("Este campo es obligatorio"),
  repetirContrasenia: yup
    .string()
    .oneOf(
      [yup.ref("contraseniaNueva"), null],
      "Las contraseñas deben coincidir."
    )
    .required("Este campo es obligatorio"),
});

const ModificarContrasenia = () => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  const { enqueueSnackbar } = useSnackbar();
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [mostrarContraseniaNueva, setMostrarContraseniaNueva] = useState(false);
  const [mostrarRepetirContrasenia, setMostrarRepetirContrasenia] =
    useState(false);
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));
  //
  const [isLoading, setIsLoading] = useState(false);
  //Recupero token
  const { token } = useSelector((state) => state.login);
  //Recupero informacion del usuario
  const { user } = useSelector((state) => state.user);

  const valoresInicialesForm = {
    contraseniaActual: "",
    contraseniaNueva: "",
    repetirContrasenia: "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: valoresInicialesForm,
    validationSchema: validaciones,
    onSubmit: (values) => {
      handleModificarContrasenia(values);
    },
  });

  //Evita bug carga de valores basura en el formulario
  useEffect(() => {}, [isOpen]);

  /**
   *
   */
  const handleModificarContrasenia = async (values) => {
    setIsLoading(true);
    //Realizo peticion
    try {
      const respuesta = await peticionModificarContrasena(
        user.IdUsuario,
        values,
        token
      );

      formik.resetForm();
      handleClose();
      enqueueSnackbar("Se modifico la contraseña con exito", {
        variant: "success",
      });
    } catch (error) {
      console.log(error.response.data);
      try {
        let mensajeSnack = "";
        const data = error.response.data.data;
        if ("mensaje" in data) {
          mensajeSnack = data.mensaje;
        } else {
          mensajeSnack = data[0];
        }
        enqueueSnackbar(`Error: ${mensajeSnack}`, {
          variant: "error",
        });
      } catch (e) {}
    }
    setIsLoading(false);
  };

  return (
    <>
      <Button variant="contained" startIcon={<Lock />} onClick={handleOpen}>
        Modificar Contraseña
      </Button>
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
        <DialogTitle>Modificar contraseña</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="dense"
              id="contraseniaActual"
              name="contraseniaActual"
              label="Contraseña actual"
              type={mostrarContrasenia ? "text" : "password"}
              fullWidth
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="cambiar mostrar contraseña"
                      onClick={() => setMostrarContrasenia(!mostrarContrasenia)}
                    >
                      {mostrarContrasenia ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.contraseniaActual}
              onChange={formik.handleChange}
              //   onBlur={formik.handleBlur}
              error={
                formik.touched.contraseniaActual &&
                Boolean(formik.errors.contraseniaActual)
              }
              helperText={
                formik.touched.contraseniaActual &&
                formik.errors.contraseniaActual
              }
            />

            <TextField
              margin="dense"
              id="contraseniaNueva"
              name="contraseniaNueva"
              label="Nueva contraseña"
              type={mostrarContraseniaNueva ? "text" : "password"}
              fullWidth
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="cambiar mostrar contraseña"
                      onClick={() =>
                        setMostrarContraseniaNueva(!mostrarContraseniaNueva)
                      }
                    >
                      {mostrarContraseniaNueva ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.contraseniaNueva}
              onChange={formik.handleChange}
              //   onBlur={formik.handleBlur}
              error={
                formik.touched.contraseniaNueva &&
                Boolean(formik.errors.contraseniaNueva)
              }
              helperText={
                formik.touched.contraseniaNueva &&
                formik.errors.contraseniaNueva
              }
            />

            <TextField
              margin="dense"
              id="repetirContrasenia"
              name="repetirContrasenia"
              label="Repetir la nueva contraseña"
              type={mostrarRepetirContrasenia ? "text" : "password"}
              fullWidth
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="cambiar mostrar contraseña"
                      onClick={() =>
                        setMostrarRepetirContrasenia(!mostrarRepetirContrasenia)
                      }
                    >
                      {mostrarRepetirContrasenia ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.repetirContrasenia}
              onChange={formik.handleChange}
              //   onBlur={formik.handleBlur}
              error={
                formik.touched.repetirContrasenia &&
                Boolean(formik.errors.repetirContrasenia)
              }
              helperText={
                formik.touched.repetirContrasenia &&
                formik.errors.repetirContrasenia
              }
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            onClick={formik.handleSubmit}
            disabled={isLoading ? true : false}
          >
            Aceptar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              formik.resetForm();
              handleClose();
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModificarContrasenia;
