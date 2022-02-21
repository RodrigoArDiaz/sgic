import React from "react";
//MUI
import { Button, useMediaQuery } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
//
import { useFormik } from "formik";
import * as yup from "yup";
//Hooks personalizados
import { useModal } from "../../hooks/useModal";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import {
  peticionBajaDocente,
  peticionModificarDocente,
} from "../../api/super/gestionDocentesApi";
import { useTheme } from "@emotion/react";

const regexSoloNumeros = /^\d+$/;

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
});

export const ModificarDocente = ({ docente, handleRefrescarPagina }) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));
  //Manejo del snack
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  //Recupero token
  const { token } = useSelector((state) => state.login);

  const valoresInicialesForm = {
    Apellidos: docente.Apellidos,
    Nombres: docente.Nombres,
    Usuario: docente.Usuario,
    Email: docente.Email,
    Documento: docente.Documento,
  };

  const formik = useFormik({
    initialValues: valoresInicialesForm,
    validationSchema: validaciones,
    onSubmit: (values) => {
      handleModificarDocente(values);
    },
  });

  const handleModificarDocente = async (values) => {
    const formData = { ...values, ...{ IdUsuario: docente.IdUsuario } };
    console.log(formData);
    //Realizo peticon
    try {
      const respuesta = await peticionModificarDocente(formData, token);
      //Si petiocion ok
      handleClose();
      enqueueSnackbar("Se modificó al docente con exito.", {
        variant: "success",
      });
      //
      handleRefrescarPagina();
    } catch (error) {
      const mensaje = error.response.data.data.mensaje;
      // handleClose();
      enqueueSnackbar(`Error: ${mensaje}`, {
        variant: "error",
      });
    }
  };

  return (
    <>
      <Tooltip title="Modificar">
        <IconButton color="secondary" onClick={handleOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      {/* Ventana modal */}
      <Dialog
        open={isOpen}
        onClose={(event, reason) => {
          // Evita el cierre de la ventana modal al hacer clik fuera de la misma
          if (reason && reason == "backdropClick") return;
          handleClose();
        }}
        maxWidth="xs"
        fullWidth
        fullScreen={esXs ? true : false}
      >
        <DialogTitle>Modificar Docente</DialogTitle>
        <DialogContent>
          <TextField
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
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={formik.handleSubmit}>
            Aceptar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
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
