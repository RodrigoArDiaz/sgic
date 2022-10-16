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
// import ModificarContrasenia from "./PanelSeguridad";
import ModificarPerfilUsuario from "./ModificarPerfilUsuario";
import { useTheme } from "@emotion/react";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import { useSearchParams } from "react-router-dom";

const InformacionUsuario = () => {
  const { user } = useSelector((state) => state.user);
  //
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  //Se chequea si el usuario es un alumno
  const esAlumno = user.Tipo == "A" ? true : false;

  return (
    <CardMainPage visibleHeader={false}>
      {/* Avatar */}
      <CardContent
        sx={{
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "0",
        }}
      >
        {/* <Divider sx={{ marginY: "2rem" }}> */}
        <Box display="flex" justifyContent="center" mt={3} mb={2}>
          <Avatar
            sx={{
              width: "7.2rem",
              height: "7.2rem",
              // bgcolor: orange[400],
              bgcolor: "secondary.main50",
              color: "secondary.main",
              fontSize: "3em",
            }}
            variant="rounded"
          >
            {user.Apellidos && user.Nombres
              ? user.Apellidos.toString().charAt(0) +
                "" +
                user.Nombres.toString().charAt(0)
              : "JD"}
          </Avatar>
        </Box>
        {/* </Divider> */}
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          gap={1}
          mb="1rem"
        >
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ fontWeight: "400" }}
          >
            {user.Apellidos && user.Nombres
              ? user.Apellidos + " " + user.Nombres
              : "John Doe Smith"}
          </Typography>

          <Chip
            label={user.Usuario ? user.Usuario : "username"}
            size="small"
            sx={{
              width: "max-content",
              alignSelf: "center",
              fontWeight: "500",
              bgcolor: "primary.main50",
              color: "primary.main",
            }}
          />
        </Box>
      </CardContent>

      {/* Datos personales */}
      <CardContent sx={{ paddingX: "1.2rem" }}>
        <Typography sx={{ fontWeight: "500", paddingY: "0.5rem" }}>
          Datos Personales
        </Typography>
        <Divider />
        <Box>
          <Box display="flex" flexDirection="row" gap={2} mt={1.5}>
            <Typography variant="subtitle2">Nombre:</Typography>
            <Typography sx={{ color: "text.subtitle2secondary" }}>
              {user.Nombres ? user.Nombres : "John"}
            </Typography>
          </Box>

          <Box display="flex" flexDirection="row" gap={2} mt={1.5}>
            <Typography variant="subtitle2">Apellidos:</Typography>
            <Typography sx={{ color: "text.subtitle2secondary" }}>
              {user.Apellidos ? user.Apellidos : "Doe Smith"}
            </Typography>
          </Box>

          <Box display="flex" flexDirection="row" gap={2} mt={1.5}>
            <Typography variant="subtitle2">Nombre de usuario:</Typography>
            <Typography sx={{ color: "text.subtitle2secondary" }}>
              {user.Usuario ? user.Usuario : "username"}
            </Typography>
          </Box>

          <Box display="flex" flexDirection="row" gap={2} mt={1.5}>
            <Typography variant="subtitle2">Email:</Typography>
            <Typography sx={{ color: "text.subtitle2secondary" }}>
              {user.Email ? user.Email : "userejemplo@gmail.com"}
            </Typography>
          </Box>

          <Box display="flex" flexDirection="row" gap={2} mt={1.5} mb={1.5}>
            <Typography variant="subtitle2">Documento: </Typography>
            <Typography sx={{ color: "text.subtitle2secondary" }}>
              {user.Documento ? user.Documento : "10200300"}
            </Typography>
          </Box>

          {esAlumno && (
            <Box display="flex" flexDirection="row" gap={2} mt={1.5} mb={1.5}>
              <Typography variant="subtitle2">Libreta: </Typography>
              <Typography sx={{ color: "text.subtitle2secondary" }}>
                {user.Libreta ? user.Libreta : "14100200"}
              </Typography>
            </Box>
          )}
        </Box>
        <Divider />
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "center",
          paddingX: "1.2rem",
          paddingBottom: "1.2rem",
        }}
      >
        <ModificarPerfilUsuario esAlumno={esAlumno} user={user} />
      </CardActions>
    </CardMainPage>
  );
};

export default InformacionUsuario;
