import {
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Typography,
  useMediaQuery,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSelector } from "react-redux";
import { blue, orange } from "@mui/material/colors";
import { Box } from "@mui/material";
import React from "react";
import { CardMain } from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";
import { OutlinedInputOnlyRead } from "../Material UI - Componentes Modificados/TextfieldVariantes";
// import ModificarContrasenia from "./ModificarContrasenia";
import ModificarPerfilUsuario from "./ModificarPerfilUsuario";
import { useTheme } from "@emotion/react";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import { useSearchParams } from "react-router-dom";

const PanelDatosPersonales = () => {
  const { user } = useSelector((state) => state.user);
  //
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  //
  const esAlumno = user.Tipo == "A" ? true : false;

  return (
    <CardMainPage visibleHeader={false}>
      <CardHeader
        // avatar={<InfoOutlinedIcon />}
        title={
          <Typography variant="h6" fontWeight={400}>
            Datos del perfil
          </Typography>
        }
        subheader="Utilizá el boton 'Modificiar perfil' para actualizar tus datos."
        action={<ModificarPerfilUsuario esAlumno={esAlumno} user={user} />}
      />
      <Divider />
      <CardContent>
        {/* <Divider /> */}
        {/* <CardContent sx={{ paddingY: "0" }}> */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} xl={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="Apellidos">Apellidos</InputLabel>
              <OutlinedInputOnlyRead
                id="Apellidos"
                value={user.Apellidos ? user.Apellidos : "Doe Smith"}
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
                value={user.Nombres ? user.Nombres : "John"}
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
                value={user.Email ? user.Email : "userejemplo@gmail.com"}
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
                value={user.Usuario ? user.Usuario : "username"}
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
                value={user.Documento ? user.Documento : "10200300"}
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
        </Grid>
        {/* </CardContent> */}
        {/* <Divider />

        <CardActions>
          <Grid container spacing={3} justifyContent="space-evenly">
            <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
              <ModificarPerfilUsuario esAlumno={esAlumno} user={user} />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
              <ModificarContrasenia />
            </Grid>
          </Grid>
        </CardActions> */}
      </CardContent>
    </CardMainPage>
  );
};

export default PanelDatosPersonales;
