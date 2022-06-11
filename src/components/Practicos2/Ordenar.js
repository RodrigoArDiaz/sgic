import React from "react";
import { Button } from "@mui/material";
import { useModal } from "../../hooks/useModal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import { OrdenarLista } from "./Orden/OrdenarLista";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import * as Responses from "../Responses";

//Redux
import { useSelector } from "react-redux";

export default function Ordenar(props) {
  const [isOpen, handleOpen, handleClose] = useModal(false);

  const navegar = useNavigate();

  const [open, setOpen] = React.useState(false);

  //Recupero informacion de la cursada
  const { cursada } = useSelector((state) => state.cursada);

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
      pPractico: "",
      pOrden: "",
      piB: "B",
      Offset: 0,
      Limite: 30,
      // pidCu: props.cursada.IdCursada,
      pidCu: cursada.IdCursada,
    };

    Responses.consultas(data, "http://127.0.0.1:8000/api/buscarpracticos")
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
        ordenar
      </Button>

      {/* Ventana modal */}
      <Dialog open={isOpen} onClose={handleClose} fullScreen>
        <DialogTitle>Ordenar trabajos prácticos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Arrastre el trabajo práctico hacia el lugar deseado.
          </DialogContentText>

          <Grid>
            <Paper
              component="div"
              sx={{
                p: "4px 4px",
                // display: 'flex',
                alignItems: "center",
                width: "95%",
                mt: "10px",
                px: 2,
                pb: 3,
                // minHeight: "75vh",
              }}
              elevation={3}
            >
              <Grid container pt={10} spacing={8}></Grid>

              <Grid
                container
                pt={1}
                justifyContent="flex-end"
                spacing={8}
              ></Grid>

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
                <Grid container pt={6}>
                  <OrdenarLista
                    filas={filas}
                    refrescar={props.refrescar}
                    cursada={cursada}
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
            </Paper>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Volver</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
