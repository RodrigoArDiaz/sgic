// import React, { useState } from 'react';
// import { FormControl, InputLabel, Input, Button, Grid, Paper, Typography,FormHelperText, Alert, AlertTitle, Collapse } from '@mui/material';
// import {Box } from '@mui/system';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import Link from '@mui/material/Link';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import EmailIcon from '@mui/icons-material/Email';
// import LockIcon from '@mui/icons-material/Lock';
// import LoginIcon from '@mui/icons-material/Login';
// import { useForm } from '../hooks/useForm';
// import {Link as LinkRouter} from 'react-router-dom';
// import LinearProgress from '@mui/material/LinearProgress'
// import { Opacity } from '@mui/icons-material';

// const dataUser = window.localStorage.setItem('dataUser',JSON.stringify({ nombre: 'rodrigo'}));

// // Estilos
// const estiloPaper = {
//     height: 'auto',
//     width: {xs: "100%", sm: '380px'},
//     margin: {xs: '0 auto', sm: '100px auto' },
//     boxShadow: {xs:0, sm:8}
// }

// const estiloFormControl = {
//     width: "100%",
// }

// const estiloBoxForm ={
//     display: 'flex',
//     alignItems: 'flex-end' ,
//     width: "100%",
//     mt: {xs: "42px", md: "25px"},
// }

// const estiloButton = {
//     mt: "60px"
// }

// const estiloLink = {
//     mt: "15px"
// }

// const estiloHeader = {
//     backgroundColor: "primary.main",
//     color: "white",
//     py: "20px",
//     borderRadius: {xs: "none", md:"4px 4px 0 0"},
//     mb: "10px",
//     borderBottom: { xs: "0px" , sm: "2px solid"},
//     borderColor:"secondary.light",
//     boxShadow: {xs: 4, sm: 0},
// }

// const estiloContent= {
//    padding: "5px 40px 40px 40px ",
// }

// const estiloIconoUsuario = {
//     width: "50px",
//     height: "50px",
//     bgcolor: "#000",
// }

// //
// const initialForm = {
//     email: "",
//     // contrasenia: "",
//     password: "",
// }

// //Funciones de validacion
// const validationsForm = (form) => {
//     let errors = {};

//     if(!form.email.trim()){
//         errors.email = "El campo 'Email' es requerido.'";
//     }

//     // if(!form.contrasenia.trim()){
//     //     errors.contrasenia = "El campo 'Contraseña' es requerido.'";
//     // }

//     if(!form.password.trim()){
//             errors.password = "El campo 'Contraseña' es requerido.'";
//         }

//     return errors;
// }

// //componente FormularioIniciarSesion
// function FormularioIniciarSesion({mostrarRegistrarse,tipo}) {
//     //variables de estado
//     const [mostrarContrasenia, setMostrarContrasenia] = useState(false);

//     //variables del manejo del formulario
//     const {form,
//         errors,
//         loading,
//         response,
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         handleLogin} = useForm(initialForm,validationsForm);

//     //handles de eventos
//     const handleClickMostrarContrasenia = () => {
//         setMostrarContrasenia(!mostrarContrasenia)
//     }

//     return (

//             <Grid>
//                 <Paper
//                         sx={estiloPaper}
//                 >
//                     <Grid
//                         align='center'
//                         sx={estiloHeader}
//                     >
//                         <AccountCircleIcon
//                             fontSize="large"
//                         />
//                         <Typography variant="h5">
//                             Iniciar sesión
//                         </Typography>
//                     </Grid>

//                     <Grid sx={estiloContent}>

//                         <Box sx={estiloBoxForm}>
//                             <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                             <FormControl
//                                 sx={estiloFormControl}
//                                 error= {errors.email ? true : false}
//                             >
//                                 <InputLabel htmlFor="email">Email</InputLabel>
//                                 <Input
//                                     id="email"
//                                     type="email"
//                                     name="email"
//                                     onChange={handleChange}
//                                     onBlur = {handleBlur}
//                                     value={form.email}
//                                 />
//                             </FormControl>

//                         </Box>

//                         <FormHelperText sx= {{ml: "35px"}} error>
//                                 {errors.email}
//                             </FormHelperText>

//                        <Box sx={estiloBoxForm}>
//                             <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
//                             <FormControl
//                                 sx={estiloFormControl}
//                                 error= {errors.contrasenia ? true : false}
//                             >
//                                 <InputLabel htmlFor="contrasenia">Contraseña</InputLabel>
//                                 <Input
//                                     id="contrasenia"
//                                     // name="contrasenia"
//                                     name ='password'
//                                     type={mostrarContrasenia ? 'text' : 'password'}
//                                     onChange={handleChange}
//                                     onBlur = {handleBlur}
//                                     value={form.contrasenia}
//                                     endAdornment={
//                                     <InputAdornment position="end">
//                                         <IconButton
//                                         aria-label="cambiar mostrar contraseña"
//                                         onClick={handleClickMostrarContrasenia}
//                                         >
//                                         {mostrarContrasenia ? <VisibilityOff /> : <Visibility />}
//                                         </IconButton>
//                                     </InputAdornment>
//                                     }
//                                 />
//                             </FormControl>
//                         </Box>
//                         <FormHelperText sx= {{ml: "35px"}} error >
//                                 {errors.contrasenia}
//                         </FormHelperText>

//                         <Button
//                             variant="contained"
//                             color="primary"
//                             fullWidth
//                             sx={estiloButton}
//                             endIcon={<LoginIcon/>}
//                             onClick={(e) => handleLogin(e,"https:...")}
//                             disabled={loading ? true : false}
//                         >
//                             Iniciar sesión
//                         </Button>

//                         <Box sx={{ width: '100%', mt: "10px"}}>
//                             {/* { loading && <LinearProgress

//                                 />} */}
//                                 <LinearProgress
//                                     sx={loading
//                                     ? {opacity: 1}
//                                     : {opacity: 0}}
//                                 />
//                         </Box>

//                         <Collapse in={response}>
//                             <Alert severity="error">
//                                 Credenciales no validas
//                             </Alert>
//                         </Collapse>

//                         <Box textAlign="center" sx={estiloLink}>
//                             <Link
//                                 href="#"
//                                 underline="hover"
//                                 color="secondary"
//                                 to="/recuperar_contrasenia"
//                                 component={LinkRouter}
//                             >
//                                 Recuperar Contraseña
//                             </Link>
//                         </Box>

//                          {
//                              mostrarRegistrarse
//                              &&
//                             <Box textAlign="center" sx={estiloLink}>
//                                 <Link
//                                     href="#"
//                                     underline="hover"
//                                     color="secondary"
//                                     to="/registrarse"
//                                     component={LinkRouter}
//                                 >
//                                     Registrarse
//                                 </Link>
//                             </Box>
//                          }
//                     </Grid>
//                 </Paper>
//             </Grid>

//      );
// }

// FormularioIniciarSesion.defaultProps = {
//     mostrarRegistrarse: true
// };

// export default FormularioIniciarSesion;

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
} from "../store/slices/loginSlice";
import { useNavigate } from "react-router";
//sgicApi
import { loginAlumno, loginDocente } from "../api/sgicApi";

//
import {
  estiloPaper,
  estiloFormControl,
  estiloBoxForm,
  estiloButton,
  estiloLink,
  estiloHeader,
  estiloContent,
} from "../styles/EstilosFormularioIniciarSesion";

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
function FormularioIniciarSesion({ mostrarRegistrarse, tipo }) {
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [mostrarErrorLogin, setMostrarErrorLogin] = useState(false);

  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: valoresInicialesForm,
    validationSchema: validaciones,
    onSubmit: (values) => {
      switch (tipo) {
        case "alumno":
          inicioSesionAlumno(values);
          break;
        case "docente":
          inicioSesionDocente(values);
          break;

        default:
          inicioSesionAlumno(values);
          break;
      }
    },
  });

  /**
   *
   * @param {*} values
   */
  const inicioSesionAlumno = async (values) => {
    dispatch(loginPending());

    try {
      const res = await loginAlumno(values);
      dispatch(loginSuccess(res.data.token));

      navigate("/dashboard");
    } catch (error) {
      dispatch(loginFail(error.response.data.res));
      controlErrorLogin(true);
    }
  };

  /**
   *
   * @param {*} values
   */
  const inicioSesionDocente = async (values) => {
    dispatch(loginPending());

    try {
      const res = await loginDocente(values);
      dispatch(loginSuccess(res.data.token));

      navigate("/dashboard");
    } catch (error) {
      console.log(error.response.data.error);
      dispatch(loginFail(error.response.data.error));
      controlErrorLogin(true);
    }
  };

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

            {mostrarRegistrarse && (
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
            )}
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
}

FormularioIniciarSesion.defaultProps = {
  mostrarRegistrarse: true,
  tipo: "alumno",
};

export default FormularioIniciarSesion;
