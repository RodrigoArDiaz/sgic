import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Grid,
  Typography,
  Stack,
} from "@mui/material";
import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { FormHelperText } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";
import { BotonEstadoRegistro } from "../BotonEstadoRegistro";
import SnackMensajes from "./SnackMensajes";
import * as Responses from "../Responses";
import { useNavigate } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";

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

const estiloBoxForm = {
  display: "flex",
  alignItems: "flex-end",
  width: "100%",
  mt: { xs: "4rem", md: "4rem" },
};

/***  Componenete Formulario Registro***/
function FormularioRegistro() {
  const navegar = useNavigate();

  //Estado de peticion
  const [isLoading, setIsLoading] = useState(false);

  //Boton registrarse
  function DevolverBoton() {
    if (
      enombres === "1" &&
      eapellidos === "1" &&
      eusuario === "1" &&
      eemail === "1" &&
      edni === "1" &&
      elibreta === "1" &&
      econtrasenia === "1" &&
      erepetirContrasenia === "1"
    ) {
      return (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={estiloButton}
          disabled={isLoading ? true : false}
          //Peticion
          onClick={() => {
            //Peticion se inicia
            setIsLoading(true);
            //Data a enviar
            var data = {
              pNom: form.nombres,
              pAp: form.apellidos,
              pUs: form.usuario,
              pMail: form.email,
              pDoc: form.dni,
              pPass: form.contrasenia,
              pConfir: form.repetirContrasenia,
              pLib: form.libreta,
            };

            Responses.consultas(data, endpoints.registroAlumno)
              .then((response) => {
                //Peticion finalizada
                setIsLoading(false);
                //Comportamiento segun estado de la respuesta
                if (Responses.status === 200) {
                  setNom("");
                  setAp("");
                  setUs("");
                  setEm("");
                  setDn("");
                  setLib("");
                  setCon("");
                  setRep("");

                  setForm({
                    nombres: "",
                    apellidos: "",
                    usuario: "",
                    email: "",
                    dni: "",
                    libreta: "",
                    contrasenia: "",
                    repetirContrasenia: "",
                  });

                  setAbrir(true);
                  setMensaje(
                    "Usuario registrado con éxito. " + response.Mensaje + "."
                  );
                  setTipo("success");
                  console.log(response);
                } else if (Responses.status === 401) {
                  navegar(routes.docentesIngreso);
                } else if (Responses.status === 460) {
                  if (response.nombres !== undefined) {
                    setErrors({ ...errors, nombres: response.nombres });
                    setNom("2");
                  }

                  if (response.apellidos !== undefined) {
                    setErrors({ ...errors, apellidos: response.apellidos });
                    setAp("2");
                  }

                  if (response.usuario !== undefined) {
                    setErrors({ ...errors, usuario: response.usuario });
                    setUs("2");
                  }

                  if (response.email !== undefined) {
                    setErrors({ ...errors, email: response.email });
                    setEm("2");
                  }

                  if (response.dni !== undefined) {
                    setErrors({ ...errors, dni: response.dni });
                    setDn("2");
                  }

                  if (response.libreta !== undefined) {
                    setErrors({ ...errors, libreta: response.libreta });
                    setLib("2");
                  }

                  if (response.contrasenia !== undefined) {
                    setErrors({ ...errors, contrasenia: response.contrasenia });
                    setCon("2");
                  }

                  if (response.repetirContrasenia !== undefined) {
                    setErrors({
                      ...errors,
                      repetirContrasenia: response.repetirContrasenia,
                    });
                    setRep("2");
                  }
                } else {
                  setIsLoading(false);
                  navegar(routes.error);
                }
              })
              .catch((error) => {
                //Peticion finalizada
                setIsLoading(false);
                //
                console.log(error);
                // navegar(routes.error);
              });
          }}
        >
          Registrarse
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled
          sx={estiloButton}
        >
          Registrarse
        </Button>
      );
    }
  }

  const [enombres, setNom] = useState("");
  const [eapellidos, setAp] = useState("");
  const [eusuario, setUs] = useState("");
  const [eemail, setEm] = useState("");
  const [edni, setDn] = useState("");
  const [elibreta, setLib] = useState("");
  const [econtrasenia, setCon] = useState("");
  const [erepetirContrasenia, setRep] = useState("");

  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    usuario: "",
    email: "",
    dni: "",
    libreta: "",
    contrasenia: "",
    repetirContrasenia: "",
  });

  const [errors, setErrors] = useState({
    nombres: "",
    apellidos: "",
    usuario: "",
    email: "",
    dni: "",
    libreta: "",
    contrasenia: "",
    repetirContrasenia: "",
  });

  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [mostrarRepetirContrasenia, setMostrarRepetirContrasenia] =
    useState(false);

  //SnackBar

  const [mensaje, setMensaje] = React.useState();
  const [abrir, setAbrir] = React.useState(false);
  const [tipo, setTipo] = React.useState();

  const handleClickMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
  };

  const handleClickRepetirMostrarContrasenia = () => {
    setMostrarRepetirContrasenia(!mostrarRepetirContrasenia);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          sx={{ mb: { xs: -0.5, sm: 0.6 } }}
        >
          <Typography variant="h5">Registrarse</Typography>
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
            Creá una cuenta para ingresar al sistema.
          </Typography>
        </Stack>
      </Grid>

      <Grid item={12}>
        <Grid>
          <FormControl
            sx={estiloFormControl}
            error={errors.nombres ? true : false}
          >
            <InputLabel htmlFor="nombres">Nombre/s</InputLabel>
            <Input
              id="nombres"
              type="text"
              name="nombres"
              onChange={(e) => {
                if (errors.nombres !== "") {
                  setErrors({ ...errors, [e.target.name]: "" });
                }

                setNom("");
                setForm({
                  ...form,
                  [e.target.name]: e.target.value,
                });
              }}
              onBlur={(e) => {
                let regex = /^[a-zA-Z\s]+$/;
                setNom("3");
                if (!form.nombres.trim()) {
                  setErrors({
                    ...errors,
                    [e.target.name]: "El campo 'Nombre' es requerido.",
                  });
                  setNom("2");
                } else if (!regex.test(form.nombres.trim())) {
                  setErrors({
                    ...errors,
                    [e.target.name]:
                      "El nombre ingresado tiene un formato incorrecto.",
                  });
                  setNom("2");
                } else {
                  setNom("1");
                }
              }}
              value={form.nombres}
              endAdornment={
                (enombres === "1" && (
                  <BotonEstadoRegistro estado={enombres} />
                )) ||
                (enombres === "2" && (
                  <BotonEstadoRegistro estado={enombres} />
                )) ||
                (enombres === "3" && <BotonEstadoRegistro estado={enombres} />)
              }
            />
            {/* 
            {enombres === "1" && <BotonEstadoRegistro estado={enombres} />}

            {enombres === "2" && <BotonEstadoRegistro estado={enombres} />}

            {enombres === "3" && <BotonEstadoRegistro estado={enombres} />} */}

            <FormHelperText>{errors.nombres}</FormHelperText>
          </FormControl>

          <FormControl
            sx={estiloFormControl}
            error={errors.apellidos ? true : false}
          >
            <InputLabel htmlFor="apellidos">Apellido/s</InputLabel>
            <Input
              id="apellidos"
              type="text"
              name="apellidos"
              onChange={(e) => {
                if (errors.apellidos !== "") {
                  setErrors({ ...errors, [e.target.name]: "" });
                }
                setAp("");
                setForm({
                  ...form,
                  [e.target.name]: e.target.value,
                });
              }}
              onBlur={(e) => {
                let regex = /^[a-zA-Z\s]+$/;
                setAp("3");
                if (!form.apellidos.trim()) {
                  setErrors({
                    ...errors,
                    [e.target.name]: "El campo 'Apellido' es requerido.",
                  });
                  setAp("2");
                } else if (!regex.test(form.apellidos.trim())) {
                  setErrors({
                    ...errors,
                    [e.target.name]:
                      "El apellido ingresado tiene un formato incorrecto.",
                  });
                  setAp("2");
                } else {
                  setAp("1");
                }
              }}
              value={form.apellidos}
              endAdornment={
                (eapellidos === "1" && (
                  <BotonEstadoRegistro estado={eapellidos} />
                )) ||
                (eapellidos === "2" && (
                  <BotonEstadoRegistro estado={eapellidos} />
                )) ||
                (eapellidos === "3" && (
                  <BotonEstadoRegistro estado={eapellidos} />
                ))
              }
            />

            {/* {eapellidos === "1" && <BotonEstadoRegistro estado={eapellidos} />}

            {eapellidos === "2" && <BotonEstadoRegistro estado={eapellidos} />}

            {eapellidos === "3" && <BotonEstadoRegistro estado={eapellidos} />} */}

            <FormHelperText>{errors.apellidos}</FormHelperText>
          </FormControl>

          <Box sx={{ ...estiloBoxForm, mt: "0" }}>
            <FormControl
              sx={estiloFormControl}
              error={errors.usuario ? true : false}
            >
              <InputLabel htmlFor="Usuario">Usuario</InputLabel>
              <Input
                id="usuario"
                type="text"
                name="usuario"
                startAdornment={
                  <PersonOutlineOutlinedIcon
                    sx={{ color: "icons.main", mr: 1, my: 0.5 }}
                  />
                }
                onChange={(e) => {
                  if (errors.usuario !== "") {
                    setErrors({ ...errors, [e.target.name]: "" });
                  }

                  setUs("");
                  setForm({
                    ...form,
                    [e.target.name]: e.target.value,
                  });
                }}
                onBlur={(e) => {
                  let regex = /^[0-9a-zA-Z]+$/;

                  setUs("3");

                  if (!form.usuario.trim()) {
                    setErrors({
                      ...errors,
                      [e.target.name]: "El campo 'Usuario' es requerido.",
                    });
                    setUs("2");
                  } else if (!regex.test(form.usuario.trim())) {
                    setErrors({
                      ...errors,
                      [e.target.name]:
                        "El usuario ingresado tiene un formato incorrecto.",
                    });
                    setUs("2");
                  } else {
                    var data = {
                      Usuario: form.usuario,
                    };

                    Responses.consultas(data, endpoints.registroConsultarus)
                      .then((response) => {
                        if (Responses.status === 200) {
                          setUs("1");
                        } else if (Responses.status === 401) {
                          navegar(routes.docentesIngreso);
                        } else if (Responses.status === 460) {
                          setUs("2");
                          setErrors({
                            ...errors,
                            [e.target.name]: response.Error,
                          });
                        } else {
                          navegar(routes.error);
                        }
                      })
                      .catch((error) => {
                        navegar(routes.error);
                      });
                  }
                }}
                value={form.usuario}
                endAdornment={
                  (eusuario === "1" && (
                    <BotonEstadoRegistro estado={eusuario} />
                  )) ||
                  (eusuario === "2" && (
                    <BotonEstadoRegistro estado={eusuario} />
                  ))
                  // ||
                  // (eusuario === "3" && (
                  //   <BotonEstadoRegistro estado={eusuario} />
                  // ))
                }
              />

              {/* {eusuario === "1" && <BotonEstadoRegistro estado={eusuario} />}

              {eusuario === "2" && <BotonEstadoRegistro estado={eusuario} />}

              {eusuario === "3" && <BotonEstadoRegistro estado={eusuario} />} */}

              <FormHelperText>{errors.usuario}</FormHelperText>
            </FormControl>
          </Box>

          <FormControl
            sx={estiloFormControl}
            error={errors.email ? true : false}
          >
            <InputLabel htmlFor="email">Correo</InputLabel>
            <Input
              id="email"
              type="email"
              name="email"
              startAdornment={
                <EmailOutlinedIcon
                  sx={{ color: "icons.main", mr: 1, my: 0.5 }}
                />
              }
              onChange={(e) => {
                if (errors.email !== "") {
                  setErrors({ ...errors, [e.target.name]: "" });
                }
                setEm("");
                setForm({
                  ...form,
                  [e.target.name]: e.target.value,
                });
              }}
              onBlur={(e) => {
                // let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
                let regexEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

                setEm("3");
                if (!form.email.trim()) {
                  setErrors({
                    ...errors,
                    [e.target.name]: "El campo 'Email' es requerido.",
                  });
                  setEm("2");
                } else if (!regexEmail.test(form.email.trim())) {
                  setErrors({
                    ...errors,
                    [e.target.name]:
                      "El email ingresado tiene un formato incorrecto.",
                  });

                  setEm("2");
                } else {
                  var data = {
                    Email: form.email,
                  };

                  Responses.consultas(data, endpoints.registroConsultarmail)
                    .then((response) => {
                      if (Responses.status === 200) {
                        setEm("1");
                      } else if (Responses.status === 401) {
                        navegar(routes.docentesIngreso);
                      } else if (Responses.status === 460) {
                        setEm("2");
                        setErrors({
                          ...errors,
                          [e.target.name]: response.Error,
                        });
                      } else {
                        navegar(routes.error);
                      }
                    })
                    .catch((error) => {
                      navegar(routes.error);
                    });
                }
              }}
              value={form.email}
              endAdornment={
                (eemail === "1" && <BotonEstadoRegistro estado={eemail} />) ||
                (eemail === "2" && <BotonEstadoRegistro estado={eemail} />)
                // ||
                // (eemail === "3" && <BotonEstadoRegistro estado={eemail} />)
              }
            />
            {/* {eemail === "1" && <BotonEstadoRegistro estado={eemail} />}
            {eemail === "2" && <BotonEstadoRegistro estado={eemail} />}
            {eemail === "3" && <BotonEstadoRegistro estado={eemail} />} */}
            <FormHelperText>{errors.email}</FormHelperText>
          </FormControl>

          <FormControl sx={estiloFormControl} error={errors.dni ? true : false}>
            <InputLabel htmlFor="dni">Documento</InputLabel>
            <Input
              id="dni"
              type="text"
              name="dni"
              onChange={(e) => {
                if (errors.dni !== "") {
                  setErrors({ ...errors, [e.target.name]: "" });
                }
                setDn("");
                setForm({
                  ...form,
                  [e.target.name]: e.target.value,
                });
              }}
              onBlur={(e) => {
                let regex = /^[0-9]+$/;
                setDn("3");
                if (!form.dni.trim()) {
                  setErrors({
                    ...errors,
                    [e.target.name]: "El campo 'Documento' es requerido.",
                  });

                  setDn("2");
                } else if (!regex.test(form.dni.trim())) {
                  setErrors({
                    ...errors,
                    [e.target.name]:
                      "El documento ingresado tiene un formato incorrecto.",
                  });
                  setDn("2");
                } else if (form.dni.trim().length < 8) {
                  setErrors({
                    ...errors,
                    [e.target.name]:
                      "El documento ingresado debe tener por lo menos 8 dígitos.",
                  });
                  setDn("2");
                } else {
                  var data = {
                    Documento: form.dni,
                  };

                  Responses.consultas(data, endpoints.registroConsultadni)
                    .then((response) => {
                      if (Responses.status === 200) {
                        setDn("1");
                      } else if (Responses.status === 401) {
                        navegar(routes.docentesIngreso);
                      } else if (Responses.status === 460) {
                        setDn("2");
                        setErrors({
                          ...errors,
                          [e.target.name]: response.Error,
                        });
                      } else {
                        navegar(routes.error);
                      }
                    })
                    .catch((error) => {
                      navegar(routes.error);
                    });
                }
              }}
              value={form.dni}
              endAdornment={
                (edni === "1" && <BotonEstadoRegistro estado={edni} />) ||
                (edni === "2" && <BotonEstadoRegistro estado={edni} />)
                // ||
                // (edni === "3" && <BotonEstadoRegistro estado={edni} />)
              }
            />
            {/* {edni === "1" && <BotonEstadoRegistro estado={edni} />}
            {edni === "2" && <BotonEstadoRegistro estado={edni} />}
            {edni === "3" && <BotonEstadoRegistro estado={edni} />} */}
            <FormHelperText>{errors.dni}</FormHelperText>
          </FormControl>

          <FormControl
            sx={estiloFormControl}
            error={errors.libreta ? true : false}
          >
            <InputLabel htmlFor="libreta">Libreta</InputLabel>
            <Input
              id="libreta"
              type="text"
              name="libreta"
              onChange={(e) => {
                if (errors.libreta !== "") {
                  setErrors({ ...errors, [e.target.name]: "" });
                }
                setLib("");
                setForm({
                  ...form,
                  [e.target.name]: e.target.value,
                });
              }}
              onBlur={(e) => {
                let regex = /^[0-9]+$/;
                setLib("3");
                if (!form.libreta.trim()) {
                  setErrors({
                    ...errors,
                    [e.target.name]: "El campo 'Libreta' es requerido.",
                  });
                  setLib("2");
                } else if (!regex.test(form.libreta.trim())) {
                  setErrors({
                    ...errors,
                    [e.target.name]:
                      "La libreta ingresado tiene un formato incorrecto.",
                  });
                  setLib("2");
                } else if (form.libreta.trim().length < 7) {
                  setErrors({
                    ...errors,
                    [e.target.name]:
                      "La libreta ingresado debe tener por lo menos 7 dígitos.",
                  });
                  setLib("2");
                } else {
                  var data = {
                    Libreta: form.libreta,
                  };

                  Responses.consultas(data, endpoints.registroConsultarlib)
                    .then((response) => {
                      if (Responses.status === 200) {
                        setLib("1");
                      } else if (Responses.status === 401) {
                        navegar(routes.docentesIngreso);
                      } else if (Responses.status === 460) {
                        setLib("2");
                        setErrors({
                          ...errors,
                          [e.target.name]: response.Error,
                        });
                      } else {
                        navegar(routes.error);
                      }
                    })
                    .catch((error) => {
                      navegar(routes.error);
                    });
                }
              }}
              value={form.libreta}
              endAdornment={
                (elibreta === "1" && (
                  <BotonEstadoRegistro estado={elibreta} />
                )) ||
                (elibreta === "2" && <BotonEstadoRegistro estado={elibreta} />)
                // ||
                // (elibreta === "3" && <BotonEstadoRegistro estado={elibreta} />)
              }
            />
            {/* {elibreta === "1" && <BotonEstadoRegistro estado={elibreta} />}

            {elibreta === "2" && <BotonEstadoRegistro estado={elibreta} />}

            {elibreta === "3" && <BotonEstadoRegistro estado={elibreta} />} */}
            <FormHelperText>{errors.libreta}</FormHelperText>
          </FormControl>

          <FormControl
            sx={estiloFormControl}
            error={errors.contrasenia ? true : false}
          >
            <InputLabel htmlFor="contrasenia">Contraseña</InputLabel>
            <Input
              id="contrasenia"
              type={mostrarContrasenia ? "text" : "password"}
              name="contrasenia"
              startAdornment={
                <LockOutlinedIcon
                  sx={{ color: "icons.main", mr: 1, my: 0.5 }}
                />
              }
              onChange={(e) => {
                if (errors.contrasenia !== "") {
                  setErrors({ ...errors, [e.target.name]: "" });
                }
                setCon("");
                setForm({
                  ...form,
                  [e.target.name]: e.target.value,
                });
              }}
              onBlur={(e) => {
                let regex = /^[0-9a-zA-Z]+$/;
                setCon("3");
                if (!form.contrasenia.trim()) {
                  setErrors({
                    ...errors,
                    [e.target.name]: "El campo 'Contraseña' es requerido.",
                  });
                  setCon("2");
                } else if (!regex.test(form.contrasenia.trim())) {
                  setErrors({
                    ...errors,
                    [e.target.name]:
                      "La contraseña ingresada debe tener letras y/ números.",
                  });
                  setCon("2");
                } else if (
                  form.contrasenia.trim().length < 8 ||
                  form.contrasenia.trim().length > 16
                ) {
                  setErrors({
                    ...errors,
                    [e.target.name]:
                      "La contraseña ingresada debe tener entre 8 y 16 caracteres.",
                  });
                  setCon("2");
                } else {
                  setCon("1");
                }
              }}
              value={form.contrasenia}
              endAdornment={
                <>
                  {" "}
                  {econtrasenia === "1" && (
                    <BotonEstadoRegistro estado={econtrasenia} />
                  )}
                  {econtrasenia === "2" && (
                    <BotonEstadoRegistro estado={econtrasenia} />
                  )}
                  {econtrasenia === "3" && (
                    <BotonEstadoRegistro estado={econtrasenia} />
                  )}
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
                </>
              }
            />
            {/* {econtrasenia === "1" && (
              <BotonEstadoRegistro estado={econtrasenia} />
            )}

            {econtrasenia === "2" && (
              <BotonEstadoRegistro estado={econtrasenia} />
            )}

            {econtrasenia === "3" && (
              <BotonEstadoRegistro estado={econtrasenia} />
            )} */}
            <FormHelperText>{errors.contrasenia}</FormHelperText>
          </FormControl>

          <FormControl
            sx={estiloFormControl}
            error={errors.repetirContrasenia ? true : false}
          >
            <InputLabel htmlFor="repetirContrasenia">
              Repetir contraseña
            </InputLabel>
            <Input
              id="repetirContrasenia"
              type={mostrarRepetirContrasenia ? "text" : "password"}
              name="repetirContrasenia"
              startAdornment={
                <LockOutlinedIcon
                  sx={{ color: "icons.main", mr: 1, my: 0.5 }}
                />
              }
              onChange={(e) => {
                if (errors.repetirContrasenia !== "") {
                  setErrors({ ...errors, [e.target.name]: "" });
                }
                setRep("");
                setForm({
                  ...form,
                  [e.target.name]: e.target.value,
                });
              }}
              onBlur={(e) => {
                //let regex = /^[0-9a-zA-Z]+$/;
                setRep("3");
                if (!form.repetirContrasenia.trim()) {
                  setErrors({
                    ...errors,
                    [e.target.name]:
                      "El campo 'Repetir Contraseña' es requerido.",
                  });
                  setRep("2");
                } else if (form.contrasenia !== form.repetirContrasenia) {
                  setErrors({
                    ...errors,
                    [e.target.name]: "La contraseñas no coinciden.",
                  });
                  setRep("2");
                } else {
                  setRep("1");
                }
              }}
              value={form.repetirContrasenia}
              endAdornment={
                <>
                  {erepetirContrasenia === "1" && (
                    <BotonEstadoRegistro estado={erepetirContrasenia} />
                  )}
                  {erepetirContrasenia === "2" && (
                    <BotonEstadoRegistro estado={erepetirContrasenia} />
                  )}
                  {erepetirContrasenia === "3" && (
                    <BotonEstadoRegistro estado={erepetirContrasenia} />
                  )}
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="cambiar mostrar contraseña"
                      onClick={handleClickRepetirMostrarContrasenia}
                    >
                      {mostrarRepetirContrasenia ? (
                        <VisibilityOffOutlinedIcon />
                      ) : (
                        <VisibilityOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                </>
              }
            />
            {/* {erepetirContrasenia === "1" && (
              <BotonEstadoRegistro estado={erepetirContrasenia} />
            )}
            {erepetirContrasenia === "2" && (
              <BotonEstadoRegistro estado={erepetirContrasenia} />
            )}
            {erepetirContrasenia === "3" && (
              <BotonEstadoRegistro estado={erepetirContrasenia} />
            )} */}
            <FormHelperText>{errors.repetirContrasenia}</FormHelperText>
          </FormControl>

          {DevolverBoton()}

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
        </Grid>
      </Grid>

      <div>
        <SnackMensajes
          abrir={abrir}
          mensaje={mensaje}
          tipo={tipo}
          cerrar={setAbrir}
        />{" "}
      </div>
    </Grid>
  );
}

export default FormularioRegistro;
