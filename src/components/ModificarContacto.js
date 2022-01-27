import React from "react";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useModal } from "../hooks/useModal";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";

const validaciones = yup.object({
  perfil: yup.string().required("Este campo es obligatorio"),
  redSocial: yup.string().required("Este campo es obligatorio"),
});

export const ModificarContacto = ({
  idContacto,
  modificarContacto,
  contacto,
}) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const valoresInicialesForm = {
    perfil: contacto.perfil,
    redSocial: contacto.redSocial,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: valoresInicialesForm,
    validationSchema: validaciones,
    onSubmit: (values) => {
      handleModificarContacto(values);
    },
  });

  const handleModificarContacto = (values) => {
    // console.log(values);
    modificarContacto(idContacto, values);

    // //Si se realizo con exito
    handleClose();
    enqueueSnackbar("Se modifico el contacto con exito", {
      variant: "success",
    });
  };

  return (
    <>
      <Tooltip title="Modificar">
        <IconButton
          edge="end"
          aria-label="modificar"
          color="secondary"
          onClick={handleOpen}
          sx={{ mr: "1rem" }}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
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
          <Button variant="contained" onClick={formik.handleSubmit}>
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
