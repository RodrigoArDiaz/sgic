import {
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  Input,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { blue } from "@mui/material/colors";
import { Box } from "@mui/system";
import React from "react";
import { CardMain } from "../Material UI - Componentes Modificados/Componentes Inscripciones/ComponentesInscripciones";
import { OutlinedInputOnlyRead } from "../Material UI - Componentes Modificados/TextfieldVariantes";
import ModificarContrasenia from "./ModificarContrasenia";
import ModificarPerfilUsuario from "./ModificarPerfilUsuario";

const InformacionUsuario = () => {
  const { user } = useSelector((state) => state.user);
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
          <CardHeader
            title={
              <Typography variant="h5" textAlign="center">
                {user.Apellidos + " " + user.Nombres}
              </Typography>
            }
          />
          <Divider />
          <CardContent>
            <Avatar
              sx={{
                width: "6rem",
                height: "6rem",
                bgcolor: blue[500],
                display: "flex",
                margin: "auto",
              }}
            >
              {user.Apellidos &&
                user.Nombres &&
                user.Apellidos.toString().charAt(0) +
                  "" +
                  user.Nombres.toString().charAt(0)}
            </Avatar>

            <Box display="flex" justifyContent="center">
              {/* <Typography
                variant="p"
                color="text.secondary"
                textAlign="center"
                py={2}
              >
                Docente
              </Typography> */}
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
            title={<Typography variant="p">Datos Personales</Typography>}
          />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} xl={6}>
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

              <Grid item xs={12} xl={6}>
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

              <Grid item xs={12}>
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
              <Grid item xs={12} lg={6}>
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
              <Grid item xs={6}>
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

              <Grid item xs={6}>
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
            </Grid>
          </CardContent>
          <Divider />
          {/* Acciones */}
          <CardActions>
            <Grid container spacing={3} justifyContent="space-evenly">
              <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
                <ModificarPerfilUsuario />
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
