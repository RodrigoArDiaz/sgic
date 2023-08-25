import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Grid,
  Typography,
  FormHelperText,
  Stack,
} from "@mui/material";
import { Box } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Link as LinkRouter } from "react-router-dom";
import Link from "@mui/material/Link";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import * as Responses from "../Responses";
import AuthWrapper from "./AuthWrapper";
import DialogCustom from "../Material UI - Componentes Modificados/DialogCustom";
import MensajeFeedback from "../MensajeFeedback";
import { routes } from "../../routes";
import { endpoints } from "../../api/endpoints";

//Estilos
const estiloFormControl = {
  width: "100%",
  mt: "25px",
};

const estiloButton = {
  mt: "50px",
};

const estiloLink = {
  mt: "1rem",
  fontSize: ".9rem",
};

const estiloBoxForm = {
  display: "flex",
  alignItems: "flex-end",
  width: "100%",
};

//Componente
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
    navegar(routes.iniciarSesion);
  };

  return (
    <AuthWrapper childMaxWidthXs={300} maxWidthChildLg={475}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
          >
            <Typography variant="h5">Recuperar contraseña</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <Typography variant="subtitle1">
              Ingrese la dirección de correo de su cuenta:
            </Typography>

            <Box sx={estiloBoxForm}>
              <EmailOutlinedIcon
                error
                sx={{ color: "icons.main", mr: 1, my: 0.5 }}
              />
              <FormControl
                error={errors.email ? true : false}
                sx={estiloFormControl}
              >
                <InputLabel htmlFor="email">Correo electrónico</InputLabel>
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

              Responses.consultas(data, endpoints.registroResetPass)
                .then((response) => {
                  if (Responses.status === 200) {
                    setTexto(response.Mensaje);
                    setOpen(true);
                  } else if (Responses.status === 401) {
                    navegar(routes.iniciarSesion);
                  } else if (Responses.status === 460) {
                    setErrors({ ...errors, email: response.Error });
                  } else {
                    navegar(routes.error);
                  }
                })
                .catch((error) => {
                  navegar(routes.error);
                });
            }}
          >
            Enviar
          </Button>
          <Box textAlign="center" sx={estiloLink}>
            <Typography
              variant="text"
              sx={{ color: "text.subtitle1secondary" }}
            >
              ¿Ya tenés una cuenta?
            </Typography>

            <Link
              href="#"
              underline="hover"
              color="secondary"
              to="/"
              component={LinkRouter}
              sx={{ ml: "0.5em" }}
            >
              Iniciar sesión &rarr;
            </Link>
          </Box>
          {/* <Alert severity="success" sx={estiloError}>La direccion de email no existe en el sistema</Alert>    */}
        </Grid>

        <div>
          <DialogCustom
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
                <MensajeFeedback tipo="info" alertTitleVisible={false}>
                  {texto}
                </MensajeFeedback>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                Aceptar
              </Button>
            </DialogActions>
          </DialogCustom>
        </div>
      </Grid>
    </AuthWrapper>
  );
}

export default FormularioRecuperarContrasenia;
