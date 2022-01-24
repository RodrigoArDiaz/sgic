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

const estiloLabel = {
  fontSize: "1.3rem",
};

export default function MiPerfil() {
  const { user } = useSelector((state) => state.user);
  const { Usuario, Email, Documento, Nombres, Apellidos } = user;

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
            {Apellidos &&
              Nombres &&
              Apellidos.toString().charAt(0) +
                "" +
                Nombres.toString().charAt(0)}
          </Avatar>
          <Typography variant="h5">{Apellidos + " " + Nombres}</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3} mb="3rem" justifyContent="space-evenly">
        <Grid item xs={10} sm={6} md={2} lg={1} textAlign="center">
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="usuario" sx={estiloLabel}>
              Usuario
            </InputLabel>
            <Input id="usuario" readOnly={true} defaultValue={Usuario} />
          </FormControl>
        </Grid>

        <Grid item xs={10} sm={6} md={3} lg={2.5} textAlign="center">
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="email" sx={estiloLabel}>
              Email
            </InputLabel>
            <Input
              id="email"
              readOnly={true}
              defaultValue={Email}
              size="medium"
            />
          </FormControl>
        </Grid>

        <Grid item xs={10} sm={6} md={2} lg={1} textAlign="center">
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="documento" sx={estiloLabel}>
              Documento
            </InputLabel>
            <Input id="documento" readOnly={true} defaultValue={Documento} />
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
          <Button variant="contained" startIcon={<Edit />} fullWidth>
            Modificar perfil
          </Button>
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
