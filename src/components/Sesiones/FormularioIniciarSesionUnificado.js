import React, { useState } from "react";
import { Box } from "@mui/system";
import { Link as LinkRouter } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import LoginIcon from "@mui/icons-material/Login";
import {
  Link,
  IconButton,
  InputAdornment,
  LinearProgress,
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
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
//
import { useSelector, useDispatch } from "react-redux";
import {
  loginPending,
  loginSuccess,
  loginFail,
} from "../../store/slices/loginSlice";
import { getUserSuccess } from "../../store/slices/userSlice";
import { useNavigate } from "react-router";
//sgicApi
import {
  loginAlumno,
  loginDocente,
  loginSuper,
  requestGetDataUsuario,
  peticionLoginUsuario,
} from "../../api/sgicApi";

//
import {
  estiloPaper,
  estiloFormControl,
  estiloBoxForm,
  estiloButton,
  estiloLink,
  estiloHeader,
  estiloContent,
} from "../../styles/EstilosFormularioIniciarSesion";

//Redux - Menu
import { actualizarMenu, actualizarTitulo } from "../../store/slices/menuSlice";

//Items del menu
import {
  listaItemsMenuAlumno,
  listaItemsMenuDocente,
  listaItemsMenuSuper,
} from "../Menu/itemsMenu";

const valoresInicialesForm = {
  email: "",
  password: "",
};

const validaciones = yup.object({
  email: yup.string().required("Este campo es obligatorio"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener un minimo de 6 caracteres")
    .required("Este campo es obligatorio"),
});

//Componente FormularioIniciarSesion
function FormularioIniciarSesionUnificado() {
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [mostrarErrorLogin, setMostrarErrorLogin] = useState(false);

  const navigate = useNavigate();

  //Manejo del login
  const { isLoading, error } = useSelector((state) => state.login);

  //Manejo items del menu
  const { items, titulo } = useSelector((state) => state.menu);

  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: valoresInicialesForm,
    validationSchema: validaciones,
    onSubmit: (values) => {
      inicioSesion(values);
    },
  });

  /***************************************************
   * Peticion para el inicio de sesion de los usuarios
   */
  const inicioSesion = async (values) => {
    dispatch(loginPending());

    try {
      // const res = await loginAlumno(values);
      const res = await peticionLoginUsuario(values);
      dispatch(loginSuccess(res.data.token));
      const respData = await requestGetDataUsuario(res.data.token);

      //Guardo datos del usuario
      dispatch(getUserSuccess(respData.data.usuario));

      //Se acondiciona el menu
      acondicionarMenu(respData.data.usuario.Tipo);

      navigate("/inicio");
    } catch (error) {
      console.log(error.response);
      dispatch(loginFail(error.response.data.res));
      controlErrorLogin(true);
    }
  };

  /*********************************************
   *Acondiciona el menu segun el tipo de usuario
   */
  const acondicionarMenu = (tipo) => {
    switch (tipo) {
      case "D":
        dispatch(actualizarTitulo("Seleccione la catedra"));
        dispatch(actualizarMenu(listaItemsMenuSuper));
        break;

      case "A":
        dispatch(actualizarTitulo(""));
        dispatch(actualizarMenu(listaItemsMenuAlumno));
        break;

      default:
        break;
    }
  };

  /*********************************************
   *Cambia visibilidad del input de contraseña
   */
  const handleClickMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
  };

  const controlErrorLogin = () => {
    setMostrarErrorLogin(true);
    setTimeout(() => {
      setMostrarErrorLogin(false);
    }, 5000);
  };

  return (
    <Grid>
      <Paper sx={estiloPaper}>
        <Grid align="center" sx={estiloHeader}>
          <AccountCircleIcon fontSize="large" />
          <Typography variant="h5">Iniciar sesión</Typography>
        </Grid>

        <Grid sx={estiloContent}>
          <form onSubmit={formik.handleSubmit}>
            {/* Campo email - usuario */}
            <Box sx={estiloBoxForm}>
              <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <FormControl
                sx={estiloFormControl}
                error={formik.touched.email && Boolean(formik.errors.email)}
              >
                <InputLabel htmlFor="email">Email o Usuario</InputLabel>
                <Input
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </FormControl>
            </Box>

            <FormHelperText sx={{ ml: "35px" }} error>
              {formik.touched.email && formik.errors.email}
            </FormHelperText>

            {/* Campo contrasenia */}
            <Box sx={estiloBoxForm}>
              <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <FormControl
                sx={estiloFormControl}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
              >
                <InputLabel htmlFor="contrasenia">Contraseña</InputLabel>
                <Input
                  id="contrasenia"
                  name="password"
                  type={mostrarContrasenia ? "text" : "password"}
                  onChange={formik.handleChange}
                  value={formik.values.password}
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
              {formik.touched.password && formik.errors.password}
            </FormHelperText>

            {/* Iniciar Sesion */}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={estiloButton}
              endIcon={<LoginIcon />}
              disabled={isLoading ? true : false}
            >
              Iniciar sesión
            </Button>

            <Box sx={{ width: "100%", mt: "10px" }}>
              {/* { loading && <LinearProgress 

                                    />} */}
              <LinearProgress
                sx={isLoading ? { opacity: 1 } : { opacity: 0 }}
              />
            </Box>

            <Collapse in={mostrarErrorLogin}>
              <Alert severity="error">{error}</Alert>
            </Collapse>

            <Box textAlign="center" sx={estiloLink}>
              <Link
                href="#"
                underline="hover"
                color="secondary"
                to="/recuperar_contrasenia"
                component={LinkRouter}
              >
                Recuperar Contraseña
              </Link>
            </Box>

            <Box textAlign="center" sx={estiloLink}>
              <Link
                href="#"
                underline="hover"
                color="secondary"
                to="/registrarse"
                component={LinkRouter}
              >
                Registrarse
              </Link>
            </Box>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default FormularioIniciarSesionUnificado;
