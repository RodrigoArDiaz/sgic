import * as React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//MUI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
//
import * as Responses from "../Responses";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";
import MensajeFeedback from "../MensajeFeedback";

//Estilos
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

//Componente
export default function ResetPass() {
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

  const handleClose = () => {
    setOpen(false);
    navegar(routes.iniciarSesion);
  };

  const handleClickMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
  };

  const handleClickMostrarContrasenia2 = () => {
    setMostrarContrasenia2(!mostrarContrasenia2);
  };

  function CambiarPass() {
    var data = {
      pCodigo: Activar.codigoActivacion,
      pC: form.Contrasena,
      pRC: form.RepContrasena,
    };

    Responses.consultas(data, endpoints.cambiarPass)
      .then((response) => {
        if (Responses.status === 200) {
          setTexto(response.Mensaje);
          setOpen(true);
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
        } else if (Responses.status === 460) {
          if (response.Error === undefined) {
            setTexto(response.CI);
            setOpen(true);
          }

          if (response.Contrasena !== undefined) {
            setErrors({ ...errors, Contrasena: response.Contrasena });
          }

          if (response.RepContrasena !== undefined) {
            setErrors({ ...errors, RepContrasena: response.RepContrasena });
          }
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
      });
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.6 } }}
          >
            <Typography variant="h5">Resetear contraseña</Typography>
          </Stack>
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
              Ingrese la nueva contraseña y su confirmación.
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Grid>
            <Box sx={{ ...estiloBoxForm, mt: 0 }}>
              <LockOutlinedIcon sx={{ color: "icons.main", mr: 1, my: 0.5 }} />
              <FormControl
                sx={estiloFormControl}
                error={errors.Contrasena ? true : false}
              >
                <InputLabel htmlFor="Contrasena">Nueva contraseña</InputLabel>
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
              {errors.Contrasena}
            </FormHelperText>

            <Box sx={estiloBoxForm}>
              <LockOutlinedIcon sx={{ color: "icons.main", mr: 1, my: 0.5 }} />
              <FormControl
                sx={estiloFormControl}
                error={errors.RepContrasena ? true : false}
              >
                <InputLabel htmlFor="RepContrasena">
                  Confirmar contraseña
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
              Aceptar
            </Button>
          </Grid>
        </Grid>
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
      </Dialog>
    </>
  );
}
