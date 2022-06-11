import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Grid,
  Paper,
  Typography,
  FormHelperText,
} from "@mui/material";
import { Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { Link as LinkRouter } from "react-router-dom";
import Link from "@mui/material/Link";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import * as Responses from "../Responses";

const estiloPaper = {
  height: "auto",
  width: { xs: "100%", sm: "490px" },
  margin: { xs: "0 auto", sm: "100px auto" },
  boxShadow: { xs: 0, sm: 8 },
};

const estiloFormControl = {
  width: "100%",
  mt: "25px",
};

const estiloButton = {
  mt: "50px",
};

const estiloLink = {
  mt: "30px",
};

const estiloHeader = {
  backgroundColor: "primary.main",
  color: "white",
  py: "15px",
  borderRadius: { xs: "none", md: "4px 4px 0 0" },
  mb: "10px",
  borderBottom: "2px solid",
  borderColor: "secondary.light",
};

const estiloContent = {
  padding: "5px 40px 40px 40px ",
};

const estiloBoxForm = {
  display: "flex",
  alignItems: "flex-end",
  // flexWrap: "wrap",
  width: "100%",
  // mt: {xs: "42px", md: "25px"},
};

const estiloBoxRecuperar = {
  mt: { xs: "35px", md: "25px" },
};

const estiloError = {
  mt: { xs: "10px", md: "15px" },
};

//
const initialForm = {
  email: "",
};

function FormularioRecuperarContrasenia() {
  const [form, setForm] = React.useState({
    email: "",
  });

  const [errors, setErrors] = React.useState({
    email: "",
  });

  const navegar = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [texto, setTexto] = React.useState("");

  const handleClose = () => {
    setOpen(false);
    navegar("/ingreso");
  };

  return (
    <Grid>
      <Paper sx={estiloPaper}>
        <Grid align="center" sx={estiloHeader}>
          {/* <AccountCircleIcon
                            fontSize="large"
                        /> */}
          <Typography variant="h5">Recuperar contraseña</Typography>
        </Grid>

        <Grid sx={estiloContent}>
          <Box sx={estiloBoxRecuperar}>
            <Typography variant="subtitle1">
              Ingrese la direccion de correo de su cuenta:
            </Typography>

            <Box sx={estiloBoxForm}>
              <EmailIcon
                error
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <FormControl
                error={errors.email ? true : false}
                sx={estiloFormControl}
              >
                <InputLabel htmlFor="email">Correo</InputLabel>
                <Input
                  id="email"
                  type="email"
                  name="email" //importante
                  onChange={(e) => {
                    if (errors.email !== "") {
                      setErrors({ ...errors, [e.target.name]: "" });
                    }

                    setForm({
                      ...form,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  value={form.email}
                />
              </FormControl>
            </Box>
            <FormHelperText sx={{ ml: "35px" }} error>
              {errors.email}
            </FormHelperText>
          </Box>

          {/* {errors.email && 
                                <Alert severity="error" sx={estiloError}>{errors.email}</Alert>   
                        } */}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={estiloButton}
            onClick={(e) => {
              var data = {
                Email: form.email,
              };

              Responses.consultas(data, "http://127.0.0.1:8000/api/resetpass")
                .then((response) => {
                  if (Responses.status === 200) {
                    setTexto(response.Mensaje);
                    setOpen(true);
                  } else if (Responses.status === 401) {
                    navegar("/ingreso");
                  } else if (Responses.status === 460) {
                    setErrors({ ...errors, email: response.Error });
                  } else {
                    navegar("/error");
                  }
                })
                .catch((error) => {
                  navegar("/error");
                });
            }}
          >
            Enviar
          </Button>
          <Box textAlign="center" sx={estiloLink}>
            <Link
              href="#"
              underline="hover"
              color="secondary"
              to="/iniciar_sesion_super"
              component={LinkRouter}
            >
              ¿Ya tenes una cuenta? Inicia sesion.
            </Link>
          </Box>
          {/* <Alert severity="success" sx={estiloError}>La direccion de email no existe en el sistema</Alert>    */}
        </Grid>
      </Paper>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth={"sm"}
        >
          <DialogTitle id="alert-dialog-title">{"Información"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {texto}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Aceptar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Grid>
  );
}

export default FormularioRecuperarContrasenia;
