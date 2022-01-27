import React from "react";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useModal } from "../hooks/useModal";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";

const validaciones = yup.object({
  contactoModificado: yup.string().required("Este campo es obligatorio"),
});

export const ModificarContacto = ({
  idContacto,
  modificarContacto,
  contacto,
}) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const valoresInicialesForm = {
    contactoModificado: contacto,
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
    // console.log(values.contactoModificado);
    // borrarContacto(idContacto);
    modificarContacto(idContacto, values.contactoModificado);

    //Si se realizo con exito
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
              id="contactoModificado"
              name="contactoModificado"
              label="Informacion de contacto"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.contactoModificado}
              onChange={formik.handleChange}
              //   onBlur={formik.handleBlur}
              error={
                formik.touched.contactoModificado &&
                Boolean(formik.errors.contactoModificado)
              }
              helperText={
                formik.touched.contactoModificado &&
                formik.errors.contactoModificado
              }
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
