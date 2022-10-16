import React, { useState } from "react";
import { useTheme } from "@emotion/react";
//Read-redux
import { useSelector } from "react-redux";
//MUI
import { Button, IconButton, Tooltip, useMediaQuery } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Zoom } from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
//Formik, yup
import { useFormik } from "formik";
import * as yup from "yup";
//Notistack
import { useSnackbar } from "notistack";
//hooks personalizados
import { useModal } from "../../hooks/useModal";
//Peticiones
import { peticionModificarContacto } from "../../api/alumnos/gestionContactosApi";
import { blue } from "@mui/material/colors";

const validaciones = yup.object({
  perfil: yup.string().required("Este campo es obligatorio"),
  redSocial: yup.string().required("Este campo es obligatorio"),
});

export const ModificarContacto = ({ contacto, modificarContacto }) => {
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
    perfil: contacto.Perfil,
    redSocial: contacto.Nombre,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: valoresInicialesForm,
    validationSchema: validaciones,
    onSubmit: (values) => {
      handleModificarContacto(values);
    },
  });

  /**
   *
   */
  const handleModificarContacto = async (values) => {
    setIsLoading(true);
    //Realizo peticion
    try {
      const respuesta = await peticionModificarContacto(
        contacto.IdContacto,
        user.IdUsuario,
        values,
        token
      );

      //Objeto con el modificado
      const nuevoContacto = {
        IdContacto: contacto.IdContacto,
        IdUsuario: user.IdUsuario,
        Perfil: values.perfil,
        Nombre: values.redSocial,
      };

      //Se modifica el contacto en la lista de contactos
      modificarContacto(nuevoContacto);

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
      <Tooltip title="Modificar" TransitionComponent={Zoom}>
        <IconButton
          edge="end"
          aria-label="modificar"
          // color="secondary"

          onClick={handleOpen}
          sx={{ mr: "1rem", color: blue[500] }}
        >
          <ModeEditOutlinedIcon />
        </IconButton>
      </Tooltip>

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
        <DialogTitle>Modificar contacto</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="redSocial"
              name="redSocial"
              label="Red Social"
              type="text"
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
              autoFocus
              margin="dense"
              id="perfil"
              name="perfil"
              label="Perfil"
              type="text"
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
            Aceptar
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
