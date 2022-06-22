import React from "react";
//MUI
import { Button, useMediaQuery } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import { OrdenarLista } from "./Orden/OrdenarLista";
import LinearProgress from "@mui/material/LinearProgress";
import { Grid, Paper } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@emotion/react";
//Responses
import * as Responses from "../Responses";
//Redux
import { useSelector } from "react-redux";
//React router
import { useNavigate } from "react-router-dom";
//Hooks personalizados
import { useModal } from "../../hooks/useModal";

export default function Ordenar(props) {
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  //Recupero informacion de la cursada
  const { cursada } = useSelector((state) => state.cursada);

  const [isOpen, handleOpen, handleClose] = useModal(false);

  const navegar = useNavigate();

  const [open, setOpen] = React.useState(false);

  const CerrarBackDrop = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const [filas, setFilas] = React.useState({}); // datos a mostrar
  const [cargando, setCargando] = React.useState("1"); //Espera al consultar

  React.useEffect(() => {
    var data = {
      pExamen: "",
      pOrden: "",
      piB: "B",
      Offset: 0,
      Limite: 30,
      pidCu: cursada.IdCursada,
      pidP: props.IdParametro,
      // pidCu: props.cursada.IdCursada,
    };

    Responses.consultas(data, "http://127.0.0.1:8000/api/listarexamenes")
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          setCargando("2");
        } else if (Responses.status === 401) {
          navegar("/ingreso");
        } else if (Responses.status === 460) {
          setCargando("3");
        } else {
          navegar("/error");
        }
      })
      .catch((error) => {
        navegar("/error");
      });
  }, []);

  return (
    <>
      <Button
        variant="contained"
        // startIcon={<AddIcon/>}
        fullWidth
        onClick={handleOpen}
      >
        {props.nombre}
      </Button>

      {/* Ventana modal */}
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"xs"}
        fullScreen={esXs ? true : false}
        sx={{
          backdropFilter: "blur(0.8px)",
        }}
      >
        <DialogTitle>Ordenar exámenes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Arrastre el examen hacia el lugar deseado.
          </DialogContentText>

          {cargando === "3" && <h4>No se encontraron resultados</h4>}

          {cargando === "1" && (
            <Grid container pt={2}>
              <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                <LinearProgress color="inherit" />
                <LinearProgress color="inherit" />
                <LinearProgress color="inherit" />
              </Stack>
            </Grid>
          )}

          {cargando === "2" && (
            <Grid container pt={2}>
              <OrdenarLista
                filas={filas}
                refrescar={props.refrescar}
                IdParametro={props.IdParametro}
                cursada={props.cursada}
                CerrarBack={CerrarBackDrop}
                AbrirBack={handleToggle}
              />
            </Grid>
          )}

          <div>
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={open}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Volver</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
