import React from "react";
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { Edit, Lock } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { useSelector } from "react-redux";

import ModificarPerfilUsuario from "./ModificarPerfilUsuario.js";

const estiloLabel = {
  fontSize: "1.3rem",
};

export default function InformacionUsuario() {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <Grid container spacing={3} mb="3rem">
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Avatar
            sx={{
              width: "4.5rem",
              height: "4.5rem",
              bgcolor: blue[500],
              //alineado al centro
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
          <Typography variant="h5">
            {user.Apellidos + " " + user.Nombres}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3} mb="3rem" justifyContent="space-evenly">
        <Grid item xs={10} sm={6} md={2} lg={1} textAlign="center">
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="usuario" sx={estiloLabel}>
              Usuario
            </InputLabel>
            <Input id="usuario" readOnly={true} value={user.Usuario} />
          </FormControl>
        </Grid>

        <Grid item xs={10} sm={6} md={3} lg={2.5} textAlign="center">
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="email" sx={estiloLabel}>
              Email
            </InputLabel>
            <Input id="email" readOnly={true} value={user.Email} />
          </FormControl>
        </Grid>

        <Grid item xs={10} sm={6} md={2} lg={1} textAlign="center">
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="documento" sx={estiloLabel}>
              Documento
            </InputLabel>
            <Input id="documento" readOnly={true} value={user.Documento} />
          </FormControl>
        </Grid>

        <Grid item xs={10} sm={6} md={2} lg={1} textAlign="center">
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="libreta" sx={estiloLabel}>
              Libreta
            </InputLabel>
            <Input
              id="libreta"
              readOnly={true}
              defaultValue="1410 .... falta"
            />
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3} mb="3rem" justifyContent="space-evenly">
        <Grid item xs={11} sm={5} md={4} lg={2.5} sx={{ textAlign: "center" }}>
          <ModificarPerfilUsuario />
        </Grid>
        <Grid item xs={11} sm={5} md={4} lg={2.5} sx={{ textAlign: "center" }}>
          <Button variant="contained" startIcon={<Lock />} fullWidth>
            Modificar contraseña
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
