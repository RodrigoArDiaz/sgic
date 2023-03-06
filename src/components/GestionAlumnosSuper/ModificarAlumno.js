import React from "react";
//MUI
import { Button, InputAdornment, useMediaQuery, Zoom } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { FormControl, InputLabel, Input } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { useTheme } from "@emotion/react";
//Hooks personalizados
import { useModal } from "../useModal";
//Componentes propios
import { BotonEstadoRegistro } from "./BotonEstadoRegistro";
import DialogCustom from "../Material UI - Componentes Modificados/DialogCustom";
import { endpoints } from "../../api/endpoints";

/*** Componente BotonEstado ***/
export const ModificarAlumno = (props) => {
  //Recupero token
  const token = localStorage.getItem("tkn");

  const [isOpen, handleOpen, handleClose] = useModal(false);

  const [enombres, setNom] = React.useState("1");
  const [eapellidos, setAp] = React.useState("1");
  const [eusuario, setUs] = React.useState("1");
  const [eemail, setEm] = React.useState("1");
  const [edni, setDn] = React.useState("1");
  const [elibreta, setLib] = React.useState("1");

  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  const [form, setForm] = React.useState({
    nombres: props.alumno.Nombres,
    apellidos: props.alumno.Apellidos,
    usuario: props.alumno.Usuario,
    email: props.alumno.Email,
    dni: props.alumno.Documento,
    libreta: props.alumno.Libreta.toString(),
  });

  const [errors, setErrors] = React.useState({
    nombres: "",
    apellidos: "",
    usuario: "",
    email: "",
    dni: "",
    libreta: "",
  });

  async function consultas(data, cadena) {
    //Adjunto token
    data = { ...data, ...{ token: token } };

    const response = await fetch(cadena, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  }

  function BotonEstadoRegistroDevolver(param) {
    if (param === "1") return <BotonEstadoRegistro estado={"1"} />;

    if (param === "2") return <BotonEstadoRegistro estado={"2"} />;
  }

  function DevolverBoton() {
    if (
      enombres === "1" &&
      eapellidos === "1" &&
      eusuario === "1" &&
      eemail === "1" &&
      edni === "1" &&
      elibreta === "1"
    ) {
      return (
        <Button variant="contained" onClick={Modificar}>
          Aceptar
        </Button>
      );
    } else {
      return (
        <Button variant="contained" disabled onClick={handleClose}>
          Aceptar
        </Button>
      );
    }
  }

  function Modificar() {
    var data = {
      pNom: form.nombres,
      pAp: form.apellidos,
      pUs: form.usuario,
      pMail: form.email,
      pDoc: form.dni,
      pLib: form.libreta,
      pidUs: props.alumno.IdUsuario,
    };

    consultas(data, endpoints.modificarAlumno)
      .then((response) => {
        if (response.Error === undefined) {
          //aqui va el snack
          handleClose();
          //setNom('1') ;

          props.abrir(true);
          props.mensaje("Alumno modificado con éxito");
          props.tipo("success");
          props.refrescar();
        } else {
          // Aqui actualizo los errores
          if (response.ErrNombre !== undefined) {
            setErrors({ ...errors, nombres: response.Error });
            setNom("2");
          }

          if (response.ErrApellido !== undefined) {
            setErrors({ ...errors, apellidos: response.Error });
            setAp("2");
          }

          if (response.ErrUsuario !== undefined) {
            setErrors({ ...errors, usuario: response.Error });
            setUs("2");
          }

          if (response.ErrEmail !== undefined) {
            setErrors({ ...errors, email: response.Error });
            setEm("2");
          }

          if (response.ErrDni !== undefined) {
            setErrors({ ...errors, dni: response.Error });
            setDn("2");
          }

          if (response.ErrLibreta !== undefined) {
            setErrors({ ...errors, libreta: response.Error });
            setLib("2");
          }
        }
      })
      .catch((error) => {});
  }

  return (
    <>
      <Tooltip title="Modificar" TransitionComponent={Zoom}>
        <span>
          <IconButton color="secondary" size="small" onClick={handleOpen}>
            <ModeEditOutlinedIcon />
          </IconButton>
        </span>
      </Tooltip>

      {/* Ventana modal */}
      <DialogCustom
        open={isOpen}
        onClose={(event, reason) => {
          if (reason && reason == "backdropClick") return;
          handleClose();
        }}
        maxWidth="xs"
      >
        <DialogTitle display="flex" flexDirection="row">
          <ModeEditOutlinedIcon sx={{ alignSelf: "center", marginRight: 1 }} />
          Modificar alumno
        </DialogTitle>
        <DialogContent>
          <FormControl
            error={errors.nombres ? true : false}
            fullWidth
            margin="dense"
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
                <InputAdornment position="end">
                  {BotonEstadoRegistroDevolver(enombres)}
                </InputAdornment>
              }
            />

            {/* {BotonEstadoRegistroDevolver(enombres)} */}

            <FormHelperText>{errors.nombres}</FormHelperText>
          </FormControl>

          <FormControl
            error={errors.apellidos ? true : false}
            fullWidth
            margin="dense"
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
                <InputAdornment position="end">
                  {BotonEstadoRegistroDevolver(eapellidos)}
                </InputAdornment>
              }
            />

            {/* {BotonEstadoRegistroDevolver(eapellidos)} */}
            <FormHelperText>{errors.apellidos}</FormHelperText>
          </FormControl>

          <FormControl
            error={errors.usuario ? true : false}
            fullWidth
            margin="dense"
          >
            <InputLabel htmlFor="Usuario">Usuario</InputLabel>
            <Input
              id="usuario"
              type="text"
              name="usuario"
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
                    pidUs: props.alumno.IdUsuario,
                  };

                  consultas(data, endpoints.registroConsultarus)
                    .then((response) => {
                      if (response.Error === undefined) {
                        setUs("1");
                      } else {
                        setUs("2");
                        setErrors({
                          ...errors,
                          [e.target.name]: response.Error,
                        });
                      }
                    })
                    .catch((error) => {});
                }
              }}
              value={form.usuario}
              endAdornment={
                <InputAdornment position="end">
                  {BotonEstadoRegistroDevolver(eusuario)}
                </InputAdornment>
              }
            />
            {/* {BotonEstadoRegistroDevolver(eusuario)} */}
            <FormHelperText>{errors.usuario}</FormHelperText>
          </FormControl>

          <FormControl
            error={errors.email ? true : false}
            fullWidth
            margin="dense"
          >
            <InputLabel htmlFor="email">Correo</InputLabel>
            <Input
              id="email"
              type="email"
              name="email"
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
                let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

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
                }

                //setEm('3') ;
                else {
                  var data = {
                    Email: form.email,
                    pidUs: props.alumno.IdUsuario,
                  };

                  consultas(data, endpoints.registroConsultarmail)
                    .then((response) => {
                      if (response.Error === undefined) {
                        setEm("1");
                      } else {
                        setEm("2");
                        setErrors({
                          ...errors,
                          [e.target.name]: response.Error,
                        });
                      }
                    })
                    .catch((error) => {});
                }

                //setEm('3') ;
              }}
              value={form.email}
              endAdornment={
                <InputAdornment position="end">
                  {BotonEstadoRegistroDevolver(eemail)}
                </InputAdornment>
              }
            />
            {/* {BotonEstadoRegistroDevolver(eemail)} */}
            <FormHelperText>{errors.email}</FormHelperText>
          </FormControl>

          <FormControl
            error={errors.dni ? true : false}
            fullWidth
            margin="dense"
          >
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
                    pidUs: props.alumno.IdUsuario,
                  };

                  consultas(data, endpoints.registroConsultadni)
                    .then((response) => {
                      if (response.Error === undefined) {
                        setDn("1");
                      } else {
                        setDn("2");
                        setErrors({
                          ...errors,
                          [e.target.name]: response.Error,
                        });
                      }
                    })
                    .catch((error) => {});
                }
              }}
              value={form.dni}
              endAdornment={
                <InputAdornment position="end">
                  {BotonEstadoRegistroDevolver(edni)}
                </InputAdornment>
              }
            />
            {/* {BotonEstadoRegistroDevolver(edni)} */}
            <FormHelperText>{errors.dni}</FormHelperText>
          </FormControl>

          <FormControl
            error={errors.libreta ? true : false}
            fullWidth
            margin="dense"
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
                } else if (form.libreta.trim().length < 8) {
                  setErrors({
                    ...errors,
                    [e.target.name]:
                      "La libreta ingresado debe tener por lo menos 7 dígitos.",
                  });
                  setLib("2");
                } else {
                  var data = {
                    Libreta: form.libreta,
                    pidUs: props.alumno.IdUsuario,
                  };

                  consultas(data, endpoints.registroConsultarlib)
                    .then((response) => {
                      if (response.Error === undefined) {
                        setLib("1");
                      } else {
                        setLib("2");
                        setErrors({
                          ...errors,
                          [e.target.name]: response.Error,
                        });
                      }
                    })
                    .catch((error) => {});
                }
              }}
              value={form.libreta}
              endAdornment={
                <InputAdornment position="end">
                  {BotonEstadoRegistroDevolver(elibreta)}
                </InputAdornment>
              }
            />
            {/* {BotonEstadoRegistroDevolver(elibreta)} */}
            <FormHelperText>{errors.libreta}</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          {DevolverBoton()}

          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </DialogCustom>
    </>
  );
};
