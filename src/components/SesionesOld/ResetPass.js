import * as React from "react";
import { useParams } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
//import {Button} from '@mui/material';

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
//import EmailIcon from '@mui/icons-material/Email';
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
//import { useForm } from '../../hooks/useForm';
import { Link as LinkRouter } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { Opacity } from "@mui/icons-material";

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

export default function ResetPass() {
  //  const [open, setOpen] = React.useState(props.abrir);

  const [mostrarContrasenia, setMostrarContrasenia] = React.useState(false);
  const [mostrarContrasenia2, setMostrarContrasenia2] = React.useState(false);

  const navegar = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [texto, setTexto] = React.useState("");
  const Activar = useParams();

  const [form, setForm] = React.useState({
    Contrasena: "",
    RepContrasena: "",
  });

  const [errors, setErrors] = React.useState({
    Contrasena: "",
    RepContrasena: "",
  });
  //const [errors, setErrors] = React.useState('');
  //const [respuesta, setRes] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    navegar("/iniciar_sesion_super");
  };

  const handleClickMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
  };

  const handleClickMostrarContrasenia2 = () => {
    setMostrarContrasenia2(!mostrarContrasenia2);
  };

  async function consultas(data, cadena) {
    const response = await fetch(cadena, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //'Authorization': 'Bearer '+localStorage.getItem('tkn')
      },
    });

    return response.json();
  }

  function CambiarPass() {
    var data = {
      pCodigo: Activar.codigoActivacion,
      pC: form.Contrasena,
      pRC: form.RepContrasena,
    };

    //console.log(Activar);

    consultas(data, "http://127.0.0.1:8000/api/cambiarpass")
      .then((response) => {
        //console.log(response);
        //setOpen(true);

        if (response.CI !== undefined) {
          setTexto(response.CI);
          setOpen(true);
        } else {
          if (response.Error === undefined) {
            setTexto(response.Mensaje);
            setOpen(true);
            //navegar("/iniciar_sesion_super");
          } else {
            if (response.Contrasena !== undefined) {
              setErrors({ ...errors, Contrasena: response.Contrasena });
            }

            if (response.RepContrasena !== undefined) {
              setErrors({ ...errors, RepContrasena: response.RepContrasena });
            }
          }
        }
      })
      .catch((error) => {
        console.log("Error de conexión en useefect" + error);
        navegar("/registrarse");
      });
  }

  return (
    <div>
      <Grid>
        <Paper sx={estiloPaper}>
          <Grid align="center" sx={estiloHeader}>
            <AccountCircleIcon fontSize="large" />
            <Typography variant="h5">Restaurar Contraseña</Typography>
          </Grid>

          <Grid sx={estiloContent}>
            <Box sx={estiloBoxForm}>
              <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <FormControl
                sx={estiloFormControl}
                error={errors.Contrasena ? true : false}
              >
                <InputLabel htmlFor="Contrasena">Nueva Contraseña</InputLabel>
                <Input
                  id="Contrasena"
                  name="Contrasena"
                  type={mostrarContrasenia ? "text" : "password"}
                  onChange={(e) => {
                    if (errors.Contrasena !== "") {
                      setErrors({ ...errors, Contrasena: "" });
                    }
                    setForm({
                      ...form,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  onBlur={(e) => {
                    let regex = /^[0-9a-zA-Z]+$/;
                    //setCon('3');
                    if (!form.Contrasena.trim()) {
                      setErrors({
                        ...errors,
                        [e.target.name]: "El campo 'Contraseña' es requerido.",
                      });
                      //setCon('2') ;
                    } else if (!regex.test(form.Contrasena.trim())) {
                      setErrors({
                        ...errors,
                        [e.target.name]:
                          "La contraseña ingresada debe tener letras y/ números.",
                      });
                      //setCon('2') ;
                    } else if (
                      form.Contrasena.trim().length < 8 ||
                      form.Contrasena.trim().length > 16
                    ) {
                      setErrors({
                        ...errors,
                        [e.target.name]:
                          "La contraseña ingresada debe tener entre 8 y 16 caracteres.",
                      });
                      //setCon('2') ;
                    }
                  }}
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
              {errors.Contrasena}
            </FormHelperText>

            <Box sx={estiloBoxForm}>
              <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <FormControl
                sx={estiloFormControl}
                error={errors.RepContrasena ? true : false}
              >
                <InputLabel htmlFor="RepContrasena">
                  Confirmar Contraseña
                </InputLabel>
                <Input
                  id="RepContrasena"
                  name="RepContrasena"
                  type={mostrarContrasenia2 ? "text" : "password"}
                  onChange={(e) => {
                    if (errors.RepContrasena !== "") {
                      setErrors({ ...errors, RepContrasena: "" });
                    }
                    setForm({
                      ...form,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  onBlur={(e) => {
                    //let regex = /^[0-9a-zA-Z]+$/;
                    //setRep('3');
                    if (!form.RepContrasena.trim()) {
                      setErrors({
                        ...errors,
                        [e.target.name]:
                          "El campo 'Repetir Contraseña' es requerido.",
                      });
                      //setRep('2') ;
                    } else if (form.Contrasena !== form.RepContrasena) {
                      setErrors({
                        ...errors,
                        [e.target.name]: "La contraseñas no coinciden.",
                      });
                      //setRep('2') ;}

                      // else{setRep('1') ;}
                    }
                  }}
                  value={form.RepContrasena}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="cambiar mostrar contraseña2"
                        onClick={handleClickMostrarContrasenia2}
                      >
                        {mostrarContrasenia2 ? (
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
              {errors.RepContrasena}
            </FormHelperText>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={estiloButton}
              //endIcon={<LoginIcon/>}
              onClick={CambiarPass}
              // disabled={loading1 && loading2 ? true : false}
            >
              Cambiar contraseña
            </Button>
          </Grid>
        </Paper>
      </Grid>

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
  );
}
