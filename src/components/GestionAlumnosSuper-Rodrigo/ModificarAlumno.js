import React from "react";
//MUI
import { Button } from "@mui/material";
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
//
import { useSnackbar } from "notistack";
//Hooks personalizados
import { useModal } from "../../hooks/useModal";
//Expresiones regulares
import { regexSoloNumeros } from "../../helpers/regex";

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
  Libreta: yup.string().required("Este campo es obligatorio"),
});

export const ModificarAlumno = ({ alumno }) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  //
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const valoresInicialesForm = {
    Apellidos: alumno.Apellidos,
    Nombres: alumno.Nombres,
    Usuario: alumno.Usuario,
    Email: alumno.Email,
    Documento: alumno.Documento,
    Libreta: alumno.Libreta,
  };

  const formik = useFormik({
    initialValues: valoresInicialesForm,
    validationSchema: validaciones,
    onSubmit: (values) => {
      handleModificarAlumno(values);
    },
  });

  const handleModificarAlumno = (values) => {
    console.log(values);

    //Si se realizo la modificacion con exito
    handleClose();
    enqueueSnackbar("Se modifico al alumno con exito.", {
      variant: "success",
    });
  };

  return (
    <>
      <Tooltip title="Modificar">
        <IconButton color="secondary" onClick={handleOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Modificar alumno</DialogTitle>
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

          <TextField
            margin="dense"
            id="Libreta"
            name="Libreta"
            label="Libreta"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.Libreta}
            onChange={formik.handleChange}
            error={formik.touched.Libreta && Boolean(formik.errors.Libreta)}
            helperText={formik.touched.Libreta && formik.errors.Libreta}
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