import React, { useState } from "react";
//MUI
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Grid,
  Typography,
  FormHelperText,
  Alert,
  Collapse,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";
import { requestGetDataUsuario } from "../../api/sgicApi";
import { getUserSuccess } from "../../store/slices/userSlice";
import { peticionDameLibreta } from "../../api/alumnos/perfilApi";
import { loginSuccess } from "../../store/slices/loginSlice";

//Estilos
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

/********************************************************************
 * componente FormularioIniciarSesion
 */
function FormularioIniciarSesionSuper() {
  //variables de estado
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);

  //Estado de la peticion
  const [isLoading, setIsLoading] = useState(false);

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

  //Handle loguear
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

    const data = {
      Usuario: form.Usuario,
      Contrasena: form.Contrasena,
    };

    //Consulta
    setIsLoading(true);
    Responses.consultas(data, endpoints.acceso)
      .then((response) => {
        if (Responses.status === 200) {
          setIsLoading(false);

          localStorage.setItem("tkn", response.token);

          localStorage.setItem("EsAl", response.Alumno);

          localStorage.setItem("EsSA", response.SuperAdmin);

          //Actualizo datos de sesion en react redux
          dispatch(loginSuccess(response.token));

          //Actualizo datos usuario
          ActualizarDatosUsuario(response.token, response.Alumno);

          //Redirecciono segun tipo de usuario
          if (response.Alumno === "S") {
            navegar(routes.alumnosMiscursadas);
            dispatch(actualizarMenu(listaItemsMenuAlumno));
          } else {
            navegar(routes.docentesIngreso);
            //Actualizo titulo
            dispatch(actualizarTitulo("Seleccione la catedra"));
            //Actualizo items del menu

            if (response.SuperAdmin === "S")
              dispatch(actualizarMenu(listaItemsMenuSuper));
            else dispatch(actualizarMenu(listaItemsMenuDocente));
          }
        } else if (Responses.status === 401) {
          setIsLoading(false);
          setRes(true);
          setErrors(response.Error);
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        navegar(routes.error);
      });
  };

  //Actualizar datos usuario
  const ActualizarDatosUsuario = async (token, esAlumno) => {
    try {
      // const res = await loginAlumno(values);
      // const res = await peticionLoginUsuario(values);
      // dispatch(loginSuccess(res.data.token));
      const respData = await requestGetDataUsuario(token);
      const datosUsuario = respData.res;
      if (esAlumno == "S") {
        const response = await peticionDameLibreta(token);
        datosUsuario.Libreta = response.data.res[0].libreta;
        dispatch(getUserSuccess(datosUsuario));
      } else {
        dispatch(getUserSuccess(datosUsuario));
      }
    } catch (error) {}
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
                  onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                      loguear(e);
                    }
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
              endIcon={!isLoading ? <LoginIcon /> : undefined}
              onClick={loguear}
              disabled={isLoading}
            >
              {!isLoading && "Ingresar"}
              {isLoading && (
                <>
                  Ingresando <CircularProgress size={25} sx={{ ml: 1 }} />
                </>
              )}
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

export default FormularioIniciarSesionSuper;
