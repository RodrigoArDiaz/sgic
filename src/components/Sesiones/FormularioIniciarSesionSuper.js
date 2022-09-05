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
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
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
  mt: "2rem",
};

const estiloLink = {
  mt: "3rem",
  fontSize: ".9rem",
};

const estiloHeader = {
  // backgroundColor: "primary.main",
  color: "white",
  py: "20px",
  borderRadius: { xs: "none", md: "4px 4px 0 0" },
  mb: "10px",
  borderBottom: { xs: "0px", sm: "2px solid" },
  borderColor: "secondary.light",
  boxShadow: { xs: 4, sm: 0 },
};

const estiloContent = {
  // padding: "5px 40px 40px 40px ",
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
            navegar("/alumnos/inscripciones");
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
            <Typography variant="h6">Ingreso</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          {/* <Grid align="center" sx={estiloHeader}>
            <AccountCircleIcon fontSize="large" />
            <Typography variant="h5">Ingreso</Typography>
          </Grid> */}

          {/* Formulario inicio sesión */}
          <Grid sx={estiloContent}>
            <Box sx={{ ...estiloBoxForm, mt: "0" }}>
              <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <FormControl
                sx={estiloFormControl}
                error={errores.Usuario ? true : false}
              >
                <InputLabel htmlFor="Usuario">Usuario o Correo</InputLabel>
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

            <Box sx={estiloBoxForm}>
              <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
                          <VisibilityOff />
                        ) : (
                          <Visibility />
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

            <Box textAlign="center" sx={estiloLink}>
              <Link
                href="#"
                underline="hover"
                color="secondary"
                to="/recuperar_contrasenia"
                component={LinkRouter}
              >
                ¿Olvidaste la contraseña?
              </Link>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={estiloButton}
              endIcon={<LoginIcon />}
              onClick={loguear}
              // disabled={loading1 && loading2 ? true : false}
            >
              Iniciar sesión
            </Button>

            <Collapse in={respuesta}>
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
