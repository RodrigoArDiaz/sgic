import React, { useEffect, useState } from "react";
import { EditOutlined } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Button,
  CardContent,
  CardHeader,
  DialogActions,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import * as yup from "yup";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useModal } from "../../hooks/useModal";
import { regexContrasenia } from "../../helpers/regex";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import { peticionModificarContrasena } from "../../api/sgicApi";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";

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

const PanelSeguridad = () => {
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
    <CardMainPage visibleHeader={false}>
      {/* <Button variant="contained" startIcon={<Lock />} onClick={handleOpen}>
        Modificar Contraseña
      </Button> */}
      {/* <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        fullScreen={esXs ? true : false}
        sx={{
          backdropFilter: "blur(0.8px)",
        }}
      > */}
      {/* <DialogTitle>Modificar contraseña</DialogTitle> */}
      <CardHeader
        title={
          <Typography variant="h6" fontWeight={400}>
            Modificar contraseña
          </Typography>
        }
        // subheader="Utilizá el boton 'Crear contacto' para añadir información de contacto."
        // action={<CrearContacto crearContacto={crearContacto} />}
      />
      <Divider />
      {/* <DialogContent> */}
      <CardContent sx={{ paddingY: "0" }}>
        <Stack sx={{ width: "100%" }} paddingTop={1}>
          <Alert severity="warning">
            <AlertTitle>Formato de la contraseña</AlertTitle>
            La contraseña debe tener un minimo de 8 caracteres y un maximo de
            16. Debe contener al menos un numero, una letra en minuscula y una
            letra en mayuscula.
          </Alert>
        </Stack>
      </CardContent>

      <CardContent sx={{ paddingX: "2rem" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
                        onClick={() =>
                          setMostrarContrasenia(!mostrarContrasenia)
                        }
                      >
                        {mostrarContrasenia ? (
                          <VisibilityOffOutlinedIcon />
                        ) : (
                          <VisibilityOutlinedIcon />
                        )}
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
            </Grid>
          </Grid>
          <Grid container columnSpacing={3}>
            <Grid item xs={12} sm={6}>
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
                          <VisibilityOffOutlinedIcon />
                        ) : (
                          <VisibilityOutlinedIcon />
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
            </Grid>

            <Grid item xs={12} sm={6}>
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
                          setMostrarRepetirContrasenia(
                            !mostrarRepetirContrasenia
                          )
                        }
                      >
                        {mostrarRepetirContrasenia ? (
                          <VisibilityOffOutlinedIcon />
                        ) : (
                          <VisibilityOutlinedIcon />
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
            </Grid>
          </Grid>
        </form>

        {/* </DialogContent> */}
      </CardContent>

      <DialogActions sx={{ paddingBottom: 2 }}>
        <Button
          type="submit"
          variant="contained"
          onClick={formik.handleSubmit}
          disabled={isLoading ? true : false}
          startIcon={<EditOutlined />}
        >
          Modificar contraseña
        </Button>
        {/* <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            formik.resetForm();
            handleClose();
          }}
        >
          Cancelar
        </Button> */}
      </DialogActions>
      {/* </Dialog> */}
    </CardMainPage>
  );
};

export default PanelSeguridad;
