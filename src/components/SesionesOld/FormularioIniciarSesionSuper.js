import React, { useState } from "react";
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
} from "@mui/material";
import { Box } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import { useForm } from "../../hooks/useForm";
import { Link as LinkRouter } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { Opacity } from "@mui/icons-material";
//import { helpHttp } from '../helpers/helpHttp';
import { useNavigate } from "react-router-dom";

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
  mt: { xs: "42px", md: "25px" },
};

const estiloButton = {
  mt: "60px",
};

const estiloLink = {
  mt: "15px",
};

const estiloHeader = {
  backgroundColor: "primary.main",
  color: "white",
  py: "20px",
  borderRadius: { xs: "none", md: "4px 4px 0 0" },
  mb: "10px",
  borderBottom: { xs: "0px", sm: "2px solid" },
  borderColor: "secondary.light",
  boxShadow: { xs: 4, sm: 0 },
};

const estiloContent = {
  padding: "5px 40px 40px 40px ",
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

//componente FormularioIniciarSesion
function FormularioIniciarSesionSuper({ mostrarRegistrarse, tipo }) {
  //variables de estado
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);

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

  /*
    const {form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit} = useForm(initialForm,validationsForm);
*/

  //handles de eventos
  const handleClickMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
  };

  const navegar = useNavigate();

  async function consultas(data) {
    const response = await fetch("http://127.0.0.1:8000/api/accesosup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return await response.json();
  }

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

    consultas(data)
      .then((response) => {
        if (response.Error === undefined && response.errors === undefined) {
          localStorage.setItem("tkn", response.token);
          navegar("/docentes/ingreso");

          // console.log(localStorage.getItem('tkn'));
        } else {
          //console.log(response);
          setRes(true);
          setErrors(response.Error);
        }
      })
      .catch((error) => {
        console.log("Error de conexión" + error);
      });

    /*
        if (form.Usuario==='A'){
//form.Usuario='A';
            //
            navegar("/cat");
        }*/
    /*
        fetch('http://127.0.0.1:8000/api/acceso/alumnos', {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }).then(response => response.json())
          .catch(error => this.setState({
            Usuario: 'Error 500'
    
        }))
          .then(responseJson => this.setState({
            Usuario: responseJson.token 
    
        }));*/
  };

  return (
    <Grid>
      <Paper sx={estiloPaper}>
        <Grid align="center" sx={estiloHeader}>
          <AccountCircleIcon fontSize="large" />
          <Typography variant="h5">Administración</Typography>
        </Grid>

        <Grid sx={estiloContent}>
          <Box sx={estiloBoxForm}>
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
                      {mostrarContrasenia ? <VisibilityOff /> : <Visibility />}
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
            Iniciar sesión
          </Button>

          <Collapse in={respuesta}>
            <Alert severity="error">{errors}</Alert>
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
        </Grid>
      </Paper>
    </Grid>
  );
}

FormularioIniciarSesionSuper.defaultProps = {
  mostrarRegistrarse: true,
};

export default FormularioIniciarSesionSuper; /*}//**/

/*
<Box sx={{ width: '100%', mt: "10px"}}>
                            {/* { loading && <LinearProgress 

                            />} */
/* <LinearProgress
                            sx={loading1 && loading2
                            ? {opacity: 1}
                            : {opacity: 0}}
                        />
                </Box>*/
