import React from "react";
import { useTheme } from "@emotion/react";
//MUI
import { Button, Fab, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";

//hooks personalizados
import { useModal } from "../../hooks/useModal";

const validaciones = yup.object({
  perfil: yup.string().required("Este campo es obligatorio"),
  redSocial: yup.string().required("Este campo es obligatorio"),
});

export const CrearContacto = ({ aniadirContacto }) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

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

  const handleAniadirContacto = (values) => {
    const nuevoContacto = {
      perfil: values.perfil,
      redSocial: values.redSocial,
    };

    //Envio a funcion padre para que haga la peticion
    //Esta esta debe ser una funcion asincron (asyn - await)
    //const res = await aniadirContacto(nuevoContacto);
    aniadirContacto(nuevoContacto);

    //Si se realizo con exito
    handleClose();
    formik.resetForm();
    enqueueSnackbar("Se añadio el contacto con con exito", {
      variant: "success",
    });
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
        </Fab>
      ) : (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
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
      >
        <DialogTitle>Crear nuevo contacto</DialogTitle>
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
