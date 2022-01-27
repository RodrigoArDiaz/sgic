import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Grid } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { ThemeProvider } from "@mui/material";
import theme from "../temaConfig";
import { Divider } from "@mui/material";
import { Popover } from "@mui/material";
import { blue } from "@mui/material/colors";
import CerrarSesion from "./CerrarSesion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function TarjetaPerfilUsuario({ id, open, anchorEl, handleClose }) {
  const { user } = useSelector((state) => state.user);
  const { Apellidos, Email, Nombres, Usuario } = user;
  const navigate = useNavigate();

  console.log(Apellidos);
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      keepMounted
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      disableRestoreFocus
    >
      <Card sx={{ maxWidth: 345 }} elevation={4}>
        <Grid container justifyContent="center" marginTop={2}>
          <Avatar sx={{ width: 56, height: 56, bgcolor: blue[500] }}>
            {Apellidos &&
              Nombres &&
              Apellidos.toString().charAt(0) +
                "" +
                Nombres.toString().charAt(0)}
          </Avatar>
        </Grid>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {Apellidos + " " + Nombres}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
          ></Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {Email}
          </Typography>
        </CardContent>

        <Divider variant="middle" />

        <Grid
          container
          justifyContent="center"
          align="center"
          marginBottom={2}
          marginTop={1}
          spacing={1}
        >
          <ThemeProvider theme={theme}>
            <Grid item xs={12}>
              <Button
                size="large"
                variant="contained"
                startIcon={<RemoveRedEyeIcon />}
                onClick={() => {
                  navigate("mi_perfil");
                  handleClose();
                }}
              >
                Mi perfil
              </Button>
            </Grid>

            <Grid item xs={12}>
              <CerrarSesion handleCloseMenu={handleClose} />
            </Grid>
          </ThemeProvider>
        </Grid>
      </Card>
    </Popover>
  );
}

export default TarjetaPerfilUsuario;
