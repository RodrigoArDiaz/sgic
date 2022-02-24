import React, { useEffect, useState } from "react";
//MUI
import {
  Alert,
  Button,
  Collapse,
  Fab,
  IconButton,
  InputAdornment,
  LinearProgress,
  Tooltip,
  Typography,
  useMediaQuery,
  Zoom,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/styles";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
// Formik y yup
import { useFormik } from "formik";
import * as yup from "yup";
// Notistack
import { useSnackbar } from "notistack";
//Hooks personalizados
import { useModal } from "../../hooks/useModal";
import { peticionCrearDocente } from "../../api/super/gestionDocentesApi";
import { Box } from "@mui/system";
//
import { regexContrasenia, regexSoloNumeros } from "../../helpers/regex";
import { useDispatch, useSelector } from "react-redux";
import { LightbulbOutlined, LightbulbSharp } from "@mui/icons-material";

const valoresInicialesForm = {
  Apellidos: "",
  Nombres: "",
  Usuario: "",
  Email: "",
  Documento: "",
  // Contrasenia: "",
};

const validaciones = yup.object({
  Apellidos: yup.string().required("Este campo es obligatorio"),
  Nombres: yup.string().required("Este campo es obligatorio"),
  Usuario: yup.string().required("Este campo es obligatorio"),
  Email: yup
    .string()
    .email("El email ingresado tiene un formato incorrecto.")
    .required("Este campo es obligatorio"),
  Documento: yup
    .string()
    .matches(regexSoloNumeros, "Este campo solo admite valores numericos.")
    .required("Este campo es obligatorio")
    .min(8, "Este campo debe tener un minimo de 8 caracteres")
    .max(16, "Este campo debe tener un maximo de 16 caracteres"),
});

export const CrearDocente = () => {
  //Variable de estado y handles de eventos para la ventana modal
  const [isOpen, handleOpen, handleClose] = useModal(false);
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));
  //Variable de estado para manejo de snackbar
  const { enqueueSnackbar } = useSnackbar();
  //Indica si se esta realizando la peticion
  const [isLoading, setIsLoading] = useState(false);
  //Manejo de errors de la peticion
  const [errors, setErrors] = useState([]);
  //Recupero token
  const { token } = useSelector((state) => state.login);

  //Formik
  const formik = useFormik({
    initialValues: valoresInicialesForm,
    validationSchema: validaciones,
    onSubmit: (values) => {
      console.log(values);
      handleCrearDocente(values);
    },
  });

  /*******************************
   * Maneja la peticion a la api
   * @param {*} values: valores del formulario
   */
  const handleCrearDocente = async (values) => {
    setIsLoading(true);
    setErrors([]);

    //Realizo peticion
    try {
      const respuesta = await peticionCrearDocente(values, token);
      //Respuesta OK
      handleClose();
      formik.resetForm();
      enqueueSnackbar("Se creo el docente con exito.", {
        variant: "success",
      });
    } catch (error) {
      //Ocurrio un error
      const response = error.response.data;
      setErrors(response.data);
    }

    setIsLoading(false);
  };

  return (
    <>
      {/* {esXs ? (
        <Fab
          size="medium"
          color="primary"
          aria-label="crear docente"
          onClick={handleOpen}
          sx={{
            boxShadow:
              "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
          }}
        >
          <AddIcon />
        </Fab>
      ) : ( */}
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        fullWidth
        onClick={handleOpen}
      >
        Crear docente
      </Button>
      {/* )} */}

      {/* Ventana modal */}
      <Dialog
        open={isOpen}
        onClose={(event, reason) => {
          // Evita el cierre de la ventana modal al hacer clik fuera de la misma
          if (reason && reason == "backdropClick") return;
          handleClose();
        }}
        disableEscapeKeyDown //Evita que se cierre la ventana con la tecla ESC
        maxWidth="xs"
        fullWidth
        fullScreen={esXs ? true : false}
        sx={{
          backdropFilter: "blur(0.8px)",
        }}
      >
        <DialogTitle>Crear docente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Las credenciales de acceso seran enviadas al email del docente.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Apellidos"
            name="Apellidos"
            label="Apellidos"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.Apellidos}
            onChange={formik.handleChange}
            error={formik.touched.Apellidos && Boolean(formik.errors.Apellidos)}
            helperText={formik.touched.Apellidos && formik.errors.Apellidos}
          />
          <TextField
            margin="dense"
            id="Nombres"
            name="Nombres"
            label="Nombres"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.Nombres}
            onChange={formik.handleChange}
            error={formik.touched.Nombres && Boolean(formik.errors.Nombres)}
            helperText={formik.touched.Nombres && formik.errors.Nombres}
          />

          <TextField
            margin="dense"
            id="Email"
            name="Email"
            label="Email"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.Email}
            onChange={formik.handleChange}
            error={formik.touched.Email && Boolean(formik.errors.Email)}
            helperText={formik.touched.Email && formik.errors.Email}
          />

          <TextField
            margin="dense"
            id="Usuario"
            name="Usuario"
            label="Usuario"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.Usuario}
            onChange={formik.handleChange}
            error={formik.touched.Usuario && Boolean(formik.errors.Usuario)}
            helperText={formik.touched.Usuario && formik.errors.Usuario}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Sugerencia" TransitionComponent={Zoom}>
                    <span>
                      <IconButton
                        color="secondary"
                        onClick={
                          // Sugiere un nombre de usuario segun el email ingresado
                          () => {
                            let email = formik.values.Email;
                            if (email.length != 0) {
                              formik.setFieldValue(
                                "Usuario",
                                email.split("@")[0]
                              );
                            }
                          }
                        }
                      >
                        <LightbulbOutlinedIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            margin="dense"
            id="Documento"
            name="Documento"
            label="Documento"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.Documento}
            onChange={formik.handleChange}
            error={formik.touched.Documento && Boolean(formik.errors.Documento)}
            helperText={formik.touched.Documento && formik.errors.Documento}
          />

          <Box width="100%" paddingY={1}>
            <LinearProgress sx={isLoading ? { opacity: 1 } : { opacity: 0 }} />
          </Box>

          <Collapse in={errors.length !== 0}>
            <Alert severity="error">
              {errors.map((error, indice) => {
                return (
                  <>
                    <Typography variant="p" key={indice}>
                      {error}
                    </Typography>
                    <br />
                  </>
                );
              })}
            </Alert>
          </Collapse>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            disabled={isLoading ? true : false}
          >
            Crear
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              handleClose();
              formik.resetForm();
              setErrors([]);
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
