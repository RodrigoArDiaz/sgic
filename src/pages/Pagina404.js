import { Box, Button, Typography } from "@mui/material";
import React from "react";
import AuthWrapper from "../components/Sesiones/AuthWrapper";
import AuthWrapperTransparente from "../components/Sesiones/AuthWrapperTransparente";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";

const Pagina404 = () => {
  const navegar = useNavigate();
  return (
    <AuthWrapperTransparente childMaxWidthXs={300} maxWidthChildLg={475}>
      <Box display="flex" textAlign="center" flexDirection="column" gap={2}>
        <Typography variant="h2" marginBottom={2}>
          ¡404!
        </Typography>

        <ReportGmailerrorredIcon sx={{ alignSelf: "center", fontSize: 60 }} />

        <Typography variant="body">
          La pagina que esta buscando no existe.
        </Typography>
        <Box marginTop={4}>
          <Button
            variant="contained"
            onClick={() => {
              navegar(routes.iniciarSesion);
            }}
            endIcon={<ArrowForwardIcon />}
          >
            Ir a iniciar sesión
          </Button>
        </Box>
      </Box>
    </AuthWrapperTransparente>
  );
};

export default Pagina404;
