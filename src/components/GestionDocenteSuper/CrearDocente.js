import React from "react";
//MUI
import { Button, Fab, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/styles";
// Formik y yup
import { useFormik } from "formik";
import * as yup from "yup";
// Notistack
import { useSnackbar } from "notistack";
//Hooks personalizados
import { useModal } from "../../hooks/useModal";

const valoresInicialesForm = {
  Apellidos: "",
  Nombres: "",
  Usuario: "",
  Email: "",
  Documento: "",
  Contrasenia: "",
};

const regexSoloNumeros = /^\d+$/;
const regexContrasenia = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,10}$/;

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
    .required("Este campo es obligatorio"),
  Contrasenia: yup
    .string()
    .matches(
      regexContrasenia,
      "La contraseña debe tener un minimo de 8 caracteres y un maximo de 10. Debe contener al menos un numero, una letra en minuscula y una letra en mayuscula."
    )
    .required("Este campo es obligatorio"),
});
export const CrearDocente = () => {
  //Variable de estado y handles de eventos para la ventana modal
  const [isOpen, handleOpen, handleClose] = useModal(false);
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));
  //
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: valoresInicialesForm,
    validationSchema: validaciones,
    onSubmit: (values) => {
      handleCrearDocente(values);
    },
  });

  const handleCrearDocente = (values) => {
    //Realizo peticion

    //Si sale bien
    handleClose();
    formik.resetForm();
    enqueueSnackbar("Se creo el docente con exito.", {
      variant: "success",
    });
  };

  return (
    <>
      {esXs ? (
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
      ) : (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          fullWidth
          onClick={handleOpen}
        >
          Crear docente
        </Button>
      )}

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Crear docente</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese los datos para crear el docente.
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
            autoFocus
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
            autoFocus
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
          />
          <TextField
            autoFocus
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
            autoFocus
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

          <TextField
            autoFocus
            margin="dense"
            id="Contrasenia"
            name="Contrasenia"
            label="Contraseña"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.Contrasenia}
            onChange={formik.handleChange}
            error={
              formik.touched.Contrasenia && Boolean(formik.errors.Contrasenia)
            }
            helperText={formik.touched.Contrasenia && formik.errors.Contrasenia}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={formik.handleSubmit}>
            Crear
          </Button>
          <Button
            onClick={() => {
              handleClose();
              formik.resetForm();
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
