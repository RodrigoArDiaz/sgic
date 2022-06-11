import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Grid,
  Paper,
  Typography,
  FormHelperText,
} from "@mui/material";
import { Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate, useParams } from "react-router-dom";

//Estilos
const estiloPaper = {
  height: "auto",
  width: { xs: "100%", sm: "490px" },
  margin: { xs: "0 auto", sm: "100px auto" },
  boxShadow: { xs: 0, sm: 8 },
};

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

const estiloHeader = {
  backgroundColor: "primary.main",
  color: "white",
  py: "15px",
  borderRadius: { xs: "none", md: "4px 4px 0 0" },
  mb: "10px",
  borderBottom: "2px solid",
  borderColor: "secondary.light",
};

const estiloContent = {
  padding: "5px 40px 40px 40px ",
};

const estiloBoxForm = {
  display: "flex",
  alignItems: "flex-end",
  // flexWrap: "wrap",
  width: "100%",
  // mt: {xs: "42px", md: "25px"},
};

const estiloBoxRecuperar = {
  mt: { xs: "35px", md: "25px" },
};

const estiloError = {
  mt: { xs: "10px", md: "15px" },
};

function RegistroExitoso() {
  const navigate = useNavigate();

  const { mensaje } = useParams();
  console.log(mensaje);

  const handleSubmit = () => {
    navigate("/acceso_alumno");
  };

  return (
    <Grid>
      <Paper sx={estiloPaper}>
        <Grid align="center" sx={estiloHeader}>
          <Typography variant="h5">Registro exitoso!</Typography>
        </Grid>

        <Grid sx={estiloContent} container spacing={0}>
          <Grid item sx={estiloBoxRecuperar} xs={12}>
            <Typography variant="subtitle1">{mensaje}</Typography>
          </Grid>

          <Grid item sx={estiloBoxRecuperar} xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              //   sx={estiloButton}
              onClick={handleSubmit}
            >
              Ir a Iniciar Sesión
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default RegistroExitoso;
