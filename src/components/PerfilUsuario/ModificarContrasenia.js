import React, { useState } from "react";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import * as yup from "yup";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useModal } from "../../hooks/useModal";
import { regexContrasenia } from "../../helpers/regex";

const validaciones = yup.object({
  contraseniaActual: yup.string().required("Este campo es obligatorio"),
  contraseniaNueva: yup
    .string()
    .matches(
      regexContrasenia,
      "La contraseña debe tener un minimo de 8 caracteres y un maximo de 10. Debe contener al menos un numero, una letra en minuscula y una letra en mayuscula."
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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [mostrarContraseniaNueva, setMostrarContraseniaNueva] = useState(false);
  const [mostrarRepetirContrasenia, setMostrarRepetirContrasenia] =
    useState(false);

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

  const handleModificarContrasenia = (values) => {
    //Adecuo los datos  para la peticion
    console.log(values);

    //Hago la peticion ...

    //Cierro ventana modal
    handleClose();

    //Reseteo el formulario
    formik.resetForm();

    //Muestro mensaje
    enqueueSnackbar("Se modifico la contraseña con exito.", {
      variant: "success",
      // TransitionComponent: Collapse,
    });
  };

  return (
    <>
      <Button variant="contained" startIcon={<Lock />} onClick={handleOpen}>
        Modificar Contraseña
      </Button>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Modificar contraseña</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
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
              autoFocus
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
              autoFocus
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
