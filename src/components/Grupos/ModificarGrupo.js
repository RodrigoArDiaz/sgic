import React from "react";
//MUI
import { Button, useMediaQuery, Zoom } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { FormControl, InputLabel, Input, Grid } from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
//
import { BotonEstadoRegistro } from "./BotonEstadoRegistro";
import * as Responses from "../Responses";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";

/*** Componente ModificarGrupo***/
export const ModificarGrupo = (props) => {
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  const navegar = useNavigate();
  const [isOpen, handleOpen, handleClose] = useModal(false);

  const [egrupo, setG] = React.useState("1");
  const [etema, setTem] = React.useState("1");
  const [emodulo, setMod] = React.useState("1");

  const [form, setForm] = React.useState({
    grupo: props.grupo.Grupo,
    tema: props.grupo.Tema,
    modulo: props.grupo.Modulo,
  });

  const [errors, setErrors] = React.useState({
    grupo: "",
    tema: "",
    modulo: "",
  });

  function Modificar() {
    var data = {
      pGrupo: form.grupo,
      pModulo: form.modulo,
      pTema: form.tema,
      pidG: props.grupo.IdGrupo,
      pidCu: props.cursada.IdCursada,
    };

    Responses.consultas(data, endpoints.modificarGrupo)
      .then((response) => {
        if (Responses.status === 200) {
          handleClose();

          props.abrir(true);
          props.mensaje("Grupo modificado con éxito");
          props.tipo("success");
          props.refrescar();
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
        } else if (Responses.status === 460) {
          if (response.grupo !== undefined) {
            setErrors({ ...errors, grupo: response.grupo });
            setG("2");
          }

          if (response.modulo !== undefined) {
            setErrors({ ...errors, modulo: response.modulo });
            setMod("2");
          }

          if (response.tema !== undefined) {
            setErrors({ ...errors, tema: response.tema });
            setTem("2");
          }
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
      });
  }

  function DevolverBoton() {
    if (egrupo === "1" && emodulo === "1" && etema === "1") {
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

  const estiloFormControl = {
    width: "100%",
    mt: "25px",
  };

  return (
    <>
      <Tooltip title="Modificar" TransitionComponent={Zoom} arrow>
        <span>
          <IconButton color="secondary" size="small" onClick={handleOpen}>
            <ModeEditOutlinedIcon />
          </IconButton>
        </span>
      </Tooltip>

      {/* Ventana modal */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        fullScreen={esXs ? true : false}
        sx={{
          backdropFilter: "blur(0.8px)",
        }}
      >
        <DialogTitle display="flex" flexDirection="row">
          <ModeEditOutlinedIcon sx={{ alignSelf: "center", marginRight: 1 }} />
          Modificar grupo
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese los datos para modificar el grupo.
          </DialogContentText>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl
                sx={estiloFormControl}
                error={errors.grupo ? true : false}
              >
                <InputLabel htmlFor="grupo">Grupo</InputLabel>
                <Input
                  id="grupo"
                  type="text"
                  name="grupo"
                  onChange={(e) => {
                    if (errors.grupo !== "") {
                      setErrors({ ...errors, [e.target.name]: "" });
                    }

                    setG("");
                    setForm({
                      ...form,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  onBlur={(e) => {
                    let regex = /^[0-9a-zA-Z\s]+$/;

                    if (!form.grupo.trim()) {
                      setErrors({
                        ...errors,
                        [e.target.name]: "El campo 'Grupo' es requerido.",
                      });
                      setG("2");
                    } else if (!regex.test(form.grupo.trim())) {
                      setErrors({
                        ...errors,
                        [e.target.name]:
                          "El grupo ingresado tiene un formato incorrecto.",
                      });
                      setG("2");
                    } else {
                      var data = {
                        Grupo: form.grupo,
                        pidCu: props.cursada.IdCursada,
                        pidG: props.grupo.IdGrupo,
                      };

                      Responses.consultas(data, endpoints.consultarNomGrupo)
                        .then((response) => {
                          if (Responses.status === 200) {
                            setG("1");
                          } else if (Responses.status === 401) {
                            navegar(routes.iniciarSesion);
                          } else if (Responses.status === 460) {
                            setG("2");
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
                  value={form.grupo}
                  endAdornment={
                    (egrupo === "1" && <BotonEstadoRegistro estado={"1"} />) ||
                    (egrupo === "2" && <BotonEstadoRegistro estado={"2"} />)
                  }
                />

                {/* {egrupo === "1" && <BotonEstadoRegistro estado={"1"} />}
                {egrupo === "2" && <BotonEstadoRegistro estado={"2"} />} */}

                <FormHelperText>{errors.grupo}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl
                sx={estiloFormControl}
                error={errors.tema ? true : false}
              >
                <InputLabel htmlFor="tema">Tema</InputLabel>
                <Input
                  id="tema"
                  type="text"
                  name="tema"
                  onChange={(e) => {
                    if (errors.tema !== "") {
                      setErrors({ ...errors, [e.target.name]: "" });
                    }

                    setTem("");
                    setForm({
                      ...form,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  onBlur={(e) => {
                    let regex = /^[0-9a-zA-Z\s]+$/;

                    if (form.tema.trim() !== "") {
                      if (!regex.test(form.tema.trim())) {
                        setErrors({
                          ...errors,
                          [e.target.name]:
                            "El tema ingresado tiene un formato incorrecto.",
                        });
                        setTem("2");
                      } else {
                        setTem("1");
                      }
                    } else {
                      setTem("1");
                    }
                  }}
                  value={form.tema}
                  endAdornment={
                    (etema === "1" && <BotonEstadoRegistro estado={"1"} />) ||
                    (etema === "2" && <BotonEstadoRegistro estado={"2"} />)
                  }
                />

                {/* {etema === "1" && <BotonEstadoRegistro estado={"1"} />}
                {etema === "2" && <BotonEstadoRegistro estado={"2"} />} */}

                <FormHelperText>{errors.tema}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl
                sx={estiloFormControl}
                error={errors.modulo ? true : false}
              >
                <InputLabel htmlFor="tema">Módulo</InputLabel>
                <Input
                  id="modulo"
                  type="text"
                  name="modulo"
                  onChange={(e) => {
                    if (errors.modulo !== "") {
                      setErrors({ ...errors, [e.target.name]: "" });
                    }

                    setMod("");
                    setForm({
                      ...form,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  onBlur={(e) => {
                    let regex = /^[0-9a-zA-Z\s]+$/;

                    if (form.modulo.trim() !== "") {
                      if (!regex.test(form.modulo.trim())) {
                        setErrors({
                          ...errors,
                          [e.target.name]:
                            "El módulo ingresado tiene un formato incorrecto.",
                        });
                        setMod("2");
                      } else {
                        setMod("1");
                      }
                    } else {
                      setMod("1");
                    }
                  }}
                  value={form.modulo}
                  endAdornment={
                    (emodulo === "1" && <BotonEstadoRegistro estado={"1"} />) ||
                    (emodulo === "2" && <BotonEstadoRegistro estado={"2"} />)
                  }
                />

                {/* {emodulo === "1" && <BotonEstadoRegistro estado={"1"} />}
                {emodulo === "2" && <BotonEstadoRegistro estado={"2"} />} */}

                <FormHelperText>{errors.modulo}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {DevolverBoton()}
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
