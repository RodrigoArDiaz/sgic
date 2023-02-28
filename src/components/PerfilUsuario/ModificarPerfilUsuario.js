import React from "react";
//MUI
import { EditOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  useMediaQuery,
} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
//
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserSuccess } from "../../store/slices/userSlice";
import { useSnackbar } from "notistack";
import { useModal } from "../../hooks/useModal";
import { useTheme } from "@emotion/react";
import { peticionModificarDocente } from "../../api/super/gestionDocentesApi";
import { requestGetDataUsuario } from "../../api/sgicApi";

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
    .required("Este campo es obligatorio")
    .min(8, "Este campo debe tener un minimo de 8 caracteres")
    .max(16, "Este campo debe tener un maximo de 16 caracteres"),
  Libreta: yup.string().required("Este campo es obligatorio"),
});

/*** Componente ModificarPerfilUsuario ***/
const ModificarPerfilUsuario = ({ esAlumno }) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  //
  const { user } = useSelector((state) => state.user);
  //
  const dispatch = useDispatch();
  //
  const { enqueueSnackbar } = useSnackbar();
  //
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));
  //Recupero token
  const { token } = useSelector((state) => state.login);

  const valoresInicialesForm = {
    Nombres: user.Nombres,
    Apellidos: user.Apellidos,
    Usuario: user.Usuario,
    Email: user.Email,
    Documento: user.Documento,
    Libreta: esAlumno ? user.Libreta : "00000000",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: valoresInicialesForm,
    validationSchema: validaciones,
    onSubmit: (values) => {
      if (esAlumno) handleModificarPerfilAlumno(values);
      else handleModificarPerfil(values);
    },
  });

  //Modifica usuarios tipo alumno
  const handleModificarPerfilAlumno = () => {};

  //Modificar usuario que no son alumnos
  const handleModificarPerfil = async (values) => {
    //
    const formData = { ...values, ...{ IdUsuario: user.IdUsuario } };

    //Realizo peticon
    try {
      const respuesta = await peticionModificarDocente(formData, token);
      //Si petiocion ok
      handleClose();
      enqueueSnackbar("Se modificó el perfil con exito.", {
        variant: "success",
      });
      //Actualizo datos del usuario
      const respData = await requestGetDataUsuario(token);
      dispatch(getUserSuccess(respData.Usuario));
    } catch (error) {
      console.log(error.response);
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
    }
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<EditOutlined />}
        // fullWidth
        onClick={handleOpen}
      >
        Modificar perfil
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
        <DialogTitle display="flex" flexDirection="row">
          <EditOutlined sx={{ alignSelf: "center", marginRight: 1 }} />
          Modificar perfil
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
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
              onBlur={formik.handleBlur}
              error={
                formik.touched.Apellidos && Boolean(formik.errors.Apellidos)
              }
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
              onBlur={formik.handleBlur}
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
              onBlur={formik.handleBlur}
              error={formik.touched.Nombres && Boolean(formik.errors.Email)}
              helperText={formik.touched.Nombres && formik.errors.Email}
              error={formik.touched.Nombres && Boolean(formik.errors.Email)}
              helperText={formik.touched.Nombres && formik.errors.Email}
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
              onBlur={formik.handleBlur}
              error={formik.touched.Nombres && Boolean(formik.errors.Usuario)}
              helperText={formik.touched.Nombres && formik.errors.Usuario}
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
              onBlur={formik.handleBlur}
              error={formik.touched.Nombres && Boolean(formik.errors.Documento)}
              helperText={formik.touched.Nombres && formik.errors.Documento}
            />

            {esAlumno && (
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
                onBlur={formik.handleBlur}
                error={formik.touched.Libreta && Boolean(formik.errors.Libreta)}
                helperText={formik.touched.Libreta && formik.errors.Libreta}
              />
            )}
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
            // color="secondary"
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

export default ModificarPerfilUsuario;
