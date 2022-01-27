import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useModal } from "../hooks/useModal";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";

const validaciones = yup.object({
  contacto: yup.string().required("Este campo es obligatorio"),
});

export const CrearContacto = ({ aniadirContacto }) => {
  const [isOpen, handleOpen, handleClose] = useModal(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const valoresInicialesForm = {
    contacto: "",
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
    // console.log(values);

    //Hago la peticion
    const nuevo = { link: values.contacto };
    aniadirContacto(nuevo);

    //Si se realizo con exito
    handleClose();
    enqueueSnackbar("Se añadio el contacto con con exito", {
      variant: "success",
    });
  };

  return (
    <>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
        Añadir contacto
      </Button>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Añadir nuevo contacto</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="contacto"
              name="contacto"
              label="Ingrese el nuevo contacto"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.contacto}
              onChange={formik.handleChange}
              //   onBlur={formik.handleBlur}
              error={formik.touched.contacto && Boolean(formik.errors.contacto)}
              helperText={formik.touched.contacto && formik.errors.contacto}
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
