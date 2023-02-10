import React, { useState } from "react";
//MUI
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Grid,
  Paper,
  Typography,
  FormHelperText,
  Alert,
  AlertTitle,
  Collapse,
  Stack,
} from "@mui/material";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EmailIcon from "@mui/icons-material/Email";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockIcon from "@mui/icons-material/Lock";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginIcon from "@mui/icons-material/Login";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
//React router
import { Link as LinkRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//Redux - Sesion
import { useDispatch } from "react-redux";
//Redux - Menu
import { actualizarMenu, actualizarTitulo } from "../../store/slices/menuSlice";
//Peticiones API
import * as Responses from "../Responses";
//Items del menu
import {
  listaItemsMenuAlumno,
  listaItemsMenuDocente,
  listaItemsMenuSuper,
} from "../Menu/itemsMenu";
import AuthWrapper from "./AuthWrapper";

//********************************************/
const dataUser = window.localStorage.setItem(
  "dataUser",
  JSON.stringify({ nombre: "rodrigo" })
);

// Estilos
const estiloPaper = {
  height: "auto",
  width: { xs: "100%", sm: "380px" },
  margin: { xs: "0 auto", sm: "100px auto" },
  boxShadow: { xs: 0, sm: 8 },
};

const estiloFormControl = {
  width: "100%",
};

const estiloBoxForm = {
  display: "flex",
  alignItems: "flex-end",
  width: "100%",
  mt: { xs: "4rem", md: "4rem" },
};

const estiloButton = {
  mt: "3rem",
};

const estiloLink = {
  mt: "2rem",
  fontSize: ".88rem",
};

const estiloIconoUsuario = {
  width: "50px",
  height: "50px",
  bgcolor: "#000",
};

//
const initialForm = {
  Usuario: "",
  Contrasena: "",
};

//Funciones de validacion
const validationsForm = (form) => {
  let errors = {};

  if (!form.Usuario.trim()) {
    errors.Usuario = "El campo 'Usuario o Correo' es requerido.";
  }

  if (!form.Contrasena.trim()) {
    errors.Contrasena = "El campo 'Contraseña' es requerido.";
  }

  return errors;
};

/********************************************************************
 * componente FormularioIniciarSesion
 */
function FormularioIniciarSesionSuper({ mostrarRegistrarse, tipo }) {
  //variables de estado
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);

  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();

  //variables del manejo del formulario
  const [form, setForm] = React.useState({
    Usuario: "",
    Contrasena: "",
  });

  const [errores, setErrores] = React.useState({
    Usuario: "",
    Contrasena: "",
  });
  const [errors, setErrors] = React.useState("");
  const [respuesta, setRes] = React.useState(false);

  const handleClickMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
  };

  const navegar = useNavigate();

  const loguear = (e) => {
    e.preventDefault();

    if (!form.Usuario.trim()) {
      setErrores({
        ...errores,
        Usuario: "El campo 'Usuario o Correo' es requerido",
      });
      return;
    }

    if (!form.Contrasena.trim()) {
      setErrores({
        ...errores,
        Contrasena: "El campo 'Contraseña' es requerido",
      });
      return;
    }

    //const navegar = useNavigate();
    const data = {
      Usuario: form.Usuario,
      Contrasena: form.Contrasena,
    };

    //Consultas
    Responses.consultas(data, "http://127.0.0.1:8000/api/acceso")
      .then((response) => {
        if (Responses.status === 200) {
          console.log(response);
          localStorage.setItem("tkn", response.token);

          localStorage.setItem("EsAl", response.Alumno);

          localStorage.setItem("EsSA", response.SuperAdmin);

          if (response.Alumno === "S") {
            navegar("/inicio/alumnos/mis_cursadas");
            dispatch(actualizarMenu(listaItemsMenuAlumno));
          } else {
            navegar("/inicio/docentes/ingreso");
            //Actualizo titulo
            dispatch(actualizarTitulo("Seleccione la catedra"));
            //Actualizo items del menu

            if (response.SuperAdmin === "S")
              dispatch(actualizarMenu(listaItemsMenuSuper));
            else dispatch(actualizarMenu(listaItemsMenuDocente));
          }
        } else if (Responses.status === 401) {
          setRes(true);
          setErrors(response.Error);
        } else {
          navegar("/error");
        }
      })
      .catch((error) => {
        navegar("/error");
      });
  };

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: "text.subtitle1secondary" }}
            >
              ¡Bienvenido!
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.6 } }}
          >
            <Typography variant="h5">Iniciar sesión</Typography>

            <Box textAlign="center" sx={{ ...estiloLink, mt: "0.3rem" }}>
              {/* <Typography
                variant="text"
                sx={{ color: "text.subtitle1secondary" }}
              >
                ¿No tenes cuenta?
              </Typography> */}
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          {/* Formulario inicio sesión */}
          <Grid>
            <Box sx={{ ...estiloBoxForm, mt: "0" }}>
              <EmailOutlinedIcon sx={{ color: "icons.main", mr: 1, my: 0.5 }} />
              <FormControl
                sx={estiloFormControl}
                error={errores.Usuario ? true : false}
              >
                <InputLabel htmlFor="Usuario">
                  Usuario o correo electrónico
                </InputLabel>
                <Input
                  id="Usuario"
                  type="text"
                  name="Usuario"
                  onChange={(e) => {
                    if (errors !== "" || errores.Usuario !== "") {
                      setErrors("");
                      setRes(false);
                      setErrores({ Usuario: "", Contrasena: "" });
                    }
                    setForm({
                      ...form,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  //onBlur = {handleBlur}
                  value={form.Usuario}
                />
              </FormControl>
            </Box>

            <FormHelperText sx={{ ml: "35px" }} error>
              {errores.Usuario}
            </FormHelperText>

            <Box sx={{ ...estiloBoxForm, mt: "3rem" }}>
              <LockOutlinedIcon sx={{ color: "icons.main", mr: 1, my: 0.5 }} />
              <FormControl
                sx={estiloFormControl}
                error={errores.Contrasena ? true : false}
              >
                <InputLabel htmlFor="Contrasena">Contraseña</InputLabel>
                <Input
                  id="Contrasena"
                  name="Contrasena"
                  type={mostrarContrasenia ? "text" : "password"}
                  onChange={(e) => {
                    if (errors !== "" || errores.Contrasena !== "") {
                      setErrors("");
                      setRes(false);
                      setErrores({ Usuario: "", Contrasena: "" });
                    }
                    setForm({
                      ...form,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  //onBlur = {handleBlur}
                  value={form.Contrasena}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="cambiar mostrar contraseña"
                        onClick={handleClickMostrarContrasenia}
                      >
                        {mostrarContrasenia ? (
                          <VisibilityOffOutlinedIcon />
                        ) : (
                          <VisibilityOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>

            <FormHelperText sx={{ ml: "35px" }} error>
              {errores.Contrasena}
            </FormHelperText>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={estiloButton}
              endIcon={<LoginIcon />}
              onClick={loguear}
              // disabled={loading1 && loading2 ? true : false}
            >
              Ingresar
            </Button>

            <Box textAlign="center" sx={estiloLink}>
              <Typography
                variant="text"
                sx={{ color: "text.subtitle1secondary" }}
              >
                ¿Olvidaste tu contraseña?
              </Typography>

              <Link
                href="#"
                underline="hover"
                color="secondary"
                to="/recuperar_contrasenia"
                component={LinkRouter}
                sx={{ ml: "0.5em" }}
              >
                Recuperar &rarr;
              </Link>
            </Box>

            <Box textAlign="center" sx={{ ...estiloLink, mt: "0.5rem" }}>
              <Typography
                variant="text"
                sx={{ color: "text.subtitle1secondary" }}
              >
                ¿Eres alumno?
              </Typography>

              <Link
                href="#"
                underline="hover"
                color="secondary"
                to="/registrarse"
                component={LinkRouter}
                sx={{ ml: "0.5em" }}
              >
                Registrate &rarr;
                {/* ¿No tenes cuenta? */}
              </Link>
            </Box>

            <Collapse
              in={respuesta}
              sx={respuesta ? { mt: "1rem" } : { mt: "0" }}
            >
              <Alert severity="error">{errors}</Alert>
            </Collapse>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}

FormularioIniciarSesionSuper.defaultProps = {
  mostrarRegistrarse: true,
};

export default FormularioIniciarSesionSuper;
