import React, { useState } from "react";
import { useTheme } from "@emotion/react";
//MUI
import { Button, Fab, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";

//hooks personalizados
import { useModal } from "../../hooks/useModal";
import { useSelector } from "react-redux";
import { peticionAgregarContacto } from "../../api/alumnos/gestionContactosApi";

const validaciones = yup.object({
  perfil: yup.string().required("Este campo es obligatorio"),
  redSocial: yup.string().required("Este campo es obligatorio"),
});

export const CrearContacto = ({ crearContacto }) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  const { enqueueSnackbar } = useSnackbar();
  //
  const [isLoading, setIsLoading] = useState(false);
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));
  //Recupero token
  const { token } = useSelector((state) => state.login);
  //Recupero informacion del usuario
  const { user } = useSelector((state) => state.user);

  const valoresInicialesForm = {
    perfil: "",
    redSocial: "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: valoresInicialesForm,
    validationSchema: validaciones,
    onSubmit: (values) => {
      handleAniadirContacto(values);
    },
  });

  /**
   *
   */
  const handleAniadirContacto = async (values) => {
    setIsLoading(true);
    //Realizo peticion
    try {
      const respuesta = await peticionAgregarContacto(
        user.IdUsuario,
        values,
        token
      );

      //Objeto con el nuevo contacto
      const nuevoContacto = {
        IdContacto: respuesta.data.data.id,
        IdUsuario: user.IdUsuario,
        Perfil: values.perfil,
        Nombre: values.redSocial,
      };

      crearContacto(nuevoContacto);

      handleClose();
      formik.resetForm();
      enqueueSnackbar("Se agregó el contacto con exito", {
        variant: "success",
      });
    } catch (error) {
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
      {esXs ? (
        <Fab
          size="medium"
          color="primary"
          aria-label="crear contacto"
          onClick={handleOpen}
          sx={{
            boxShadow:
              "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
          }}
        >
          <AddIcon />
          {/* <AddCircleOutlineOutlinedIcon /> */}
        </Fab>
      ) : (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          disabled={isLoading ? true : false}
        >
          Crear contacto
        </Button>
      )}

      {/* Ventana modal */}
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
          <AddIcon sx={{ alignSelf: "center", marginRight: 1 }} />
          Crear nuevo contacto
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="redSocial"
              name="redSocial"
              label="Red Social"
              type="text"
              placeholder="Ej. Facebook, Github"
              fullWidth
              variant="standard"
              value={formik.values.redSocial}
              onChange={formik.handleChange}
              error={
                formik.touched.redSocial && Boolean(formik.errors.redSocial)
              }
              helperText={formik.touched.redSocial && formik.errors.redSocial}
            />
            <TextField
              margin="dense"
              id="perfil"
              name="perfil"
              label="Perfil"
              type="text"
              placeholder="Ej. https://www.facebook.com/user_name"
              fullWidth
              variant="standard"
              value={formik.values.perfil}
              onChange={formik.handleChange}
              error={formik.touched.perfil && Boolean(formik.errors.perfil)}
              helperText={formik.touched.perfil && formik.errors.perfil}
            />
          </form>
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
            onClick={() => {
              handleClose();
              formik.resetForm();
            }}
            variant="outlined"
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
