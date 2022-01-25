import { Edit } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import React from "react";
import { useSelector } from "react-redux";
import { useModal } from "../hooks/useModal";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { getUserSuccess } from "../store/slices/userSlice";

const regexSoloNumeros = /^\d+$/;

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
});

const ModificarPerfilUsuario = () => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  const { user } = useSelector((state) => state.user);
  const { Usuario, Email, Documento, Nombres, Apellidos } = user;
  const disptch = useDispatch();

  const valoresInicialesForm = {
    nombres: Nombres,
    apellidos: Apellidos,
    usuario: Usuario,
    email: Email,
    dni: Documento,
    libreta: "",
  };

  const formik = useFormik({
    initialValues: valoresInicialesForm,
    validationSchema: validaciones,
    onSubmit: (values) => {
      handleModificarPerfil(values);
    },
  });

  const handleModificarPerfil = (values) => {
    //Adecuo los datos  para la peticion
    const nuevosDatos = {
      Nombres: values.nombres,
      Apellidos: values.apellidos,
      Usuario: values.usuario,
      Email: values.email,
      Documento: values.dni,
    };
    console.log(values);

    //Hago la peticion ...
    disptch(getUserSuccess(nuevosDatos)); //Esta es una prueba local, se debe hacer la peticion

    //Cierro ventana modal
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<Edit />}
        fullWidth
        onClick={handleOpen}
      >
        Modificar perfil
      </Button>
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Modificar perfil</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="apellidos"
              name="apellidos"
              label="Apellidos"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.apellidos}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.apellidos && Boolean(formik.errors.apellidos)
              }
              helperText={formik.touched.apellidos && formik.errors.apellidos}
            />
            <TextField
              autoFocus
              margin="dense"
              id="nombres"
              name="nombres"
              label="Nombres"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.nombres}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nombres && Boolean(formik.errors.nombres)}
              helperText={formik.touched.nombres && formik.errors.nombres}
            />
            <TextField
              autoFocus
              margin="dense"
              id="usuario"
              name="usuario"
              label="Usuario"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.usuario}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nombres && Boolean(formik.errors.usuario)}
              helperText={formik.touched.nombres && formik.errors.usuario}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              name="email"
              label="Email"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nombres && Boolean(formik.errors.email)}
              helperText={formik.touched.nombres && formik.errors.email}
              error={formik.touched.nombres && Boolean(formik.errors.email)}
              helperText={formik.touched.nombres && formik.errors.email}
            />

            <TextField
              autoFocus
              margin="dense"
              id="dni"
              name="dni"
              label="DNI"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.dni}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nombres && Boolean(formik.errors.dni)}
              helperText={formik.touched.nombres && formik.errors.dni}
            />

            <TextField
              autoFocus
              margin="dense"
              id="libreta"
              name="libreta"
              label="Libreta"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.libreta}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.libreta && Boolean(formik.errors.libreta)}
              helperText={formik.touched.libreta && formik.errors.libreta}
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
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModificarPerfilUsuario;
