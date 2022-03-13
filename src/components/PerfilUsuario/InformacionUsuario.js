import {
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Typography,
  useMediaQuery,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSelector } from "react-redux";
import { blue } from "@mui/material/colors";
import { Box } from "@mui/system";
import React from "react";
import { CardMain } from "../Material UI - Componentes Modificados/Componentes Inscripciones/ComponentesInscripciones";
import { OutlinedInputOnlyRead } from "../Material UI - Componentes Modificados/TextfieldVariantes";
import ModificarContrasenia from "./ModificarContrasenia";
import ModificarPerfilUsuario from "./ModificarPerfilUsuario";
import { useTheme } from "@emotion/react";

const InformacionUsuario = () => {
  const { user } = useSelector((state) => state.user);
  //
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  //
  const esAlumno = user.Tipo == "A" ? true : false;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5} lg={4} xl={3}>
        <CardMain
          sx={{
            border: "1px solid",
            borderColor: "secondary.light100",
            "&:hover": {
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            },
          }}
        >
          <CardContent>
            <Divider sx={{ marginY: "2rem" }}>
              <Avatar
                sx={{
                  width: "5rem",
                  height: "5rem",
                  bgcolor: blue[500],
                }}
              >
                {user.Apellidos &&
                  user.Nombres &&
                  user.Apellidos.toString().charAt(0) +
                    "" +
                    user.Nombres.toString().charAt(0)}
              </Avatar>
            </Divider>
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              mb="1rem"
            >
              <Typography variant="h5" textAlign="center">
                {user.Apellidos + " " + user.Nombres}
              </Typography>
            </Box>
          </CardContent>
        </CardMain>
      </Grid>

      {/* Datos personales */}
      <Grid item xs>
        <CardMain
          sx={{
            border: "1px solid",
            borderColor: "secondary.light100",
            "&:hover": {
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            },
          }}
        >
          <CardHeader
            avatar={<InfoOutlinedIcon />}
            title={<Typography variant="p">Datos Personales</Typography>}
          />

          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} xl={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="Apellidos">Apellidos</InputLabel>
                  <OutlinedInputOnlyRead
                    id="Apellidos"
                    value={user.Apellidos}
                    label="Apellidos"
                    readOnly
                    disabled
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6} xl={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="Nombres">Nombres</InputLabel>
                  <OutlinedInputOnlyRead
                    id="Nombres"
                    value={user.Nombres}
                    label="Nombres"
                    readOnly
                    disabled
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6} xl={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="Email">Email</InputLabel>
                  <OutlinedInputOnlyRead
                    id="Email"
                    value={user.Email}
                    label="Email"
                    readOnly
                    disabled
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="Usuario">Usuario</InputLabel>
                  <OutlinedInputOnlyRead
                    id="Usuario"
                    value={user.Usuario}
                    label="Usuario"
                    readOnly
                    disabled
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="Documento">Documento</InputLabel>
                  <OutlinedInputOnlyRead
                    id="Documento"
                    value={user.Documento}
                    label="Documento"
                    readOnly
                    disabled
                  />
                </FormControl>
              </Grid>

              {esAlumno && (
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="Libreta">Libreta</InputLabel>
                    <OutlinedInputOnlyRead
                      id="Libreta"
                      value={user.Libreta}
                      label="Libreta"
                      readOnly
                      disabled
                    />
                  </FormControl>
                </Grid>
              )}

              {/* {() => {
                if ("Libreta" in user) {
                  return (
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="Libreta">Libreta</InputLabel>
                        <OutlinedInputOnlyRead
                          id="Libreta"
                          value="Falta"
                          label="Libreta"
                          readOnly
                          disabled
                        />
                      </FormControl>
                    </Grid>
                  );
                }
              }} */}
            </Grid>
          </CardContent>
          <Divider />
          {/* Acciones */}
          <CardActions>
            <Grid container spacing={3} justifyContent="space-evenly">
              <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
                <ModificarPerfilUsuario esAlumno={esAlumno} user={user} />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
                <ModificarContrasenia />
              </Grid>
            </Grid>
          </CardActions>
        </CardMain>
      </Grid>
    </Grid>
  );
};

export default InformacionUsuario;
