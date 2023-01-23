import React from "react";
//MUI
import { Button, useMediaQuery, Box, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SortIcon from "@mui/icons-material/Sort";
import { useTheme } from "@emotion/react";
//React router
import { useNavigate } from "react-router-dom";
//Redux
import { useSelector } from "react-redux";
//Hooks personalizados
import { useModal } from "../../hooks/useModal";
//Responses
import * as Responses from "../Responses";
//Componentes propios
import Ordenar from "./Ordenar";
//React spinners
import { MoonLoader } from "react-spinners";
import { teal } from "@mui/material/colors";

export default function OrdenarTipo(props) {
  const color = teal[400];
  //Para estilos segun tamaño screen
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  //Recupero informacion de la cursada
  const { cursada } = useSelector((state) => state.cursada);

  function Valor(param) {
    if (param === "Q") return "Quiz";
    if (param === "F") return "Final";
    if (param === "P") return "Parcial";
  }

  const [isOpen, handleOpen, handleClose] = useModal(false);

  const navegar = useNavigate();

  const [param, setP] = React.useState("");

  const [filas, setFilas] = React.useState({}); // datos a mostrar

  const [cargando, setCargando] = React.useState("1"); //Espera al consultar

  React.useEffect(() => {
    var data = {
      IdCursada: cursada.IdCursada,
      pidCu: cursada.IdCursada,
      // IdCursada: props.cursada.IdCursada,
      // pidCu: props.cursada.IdCursada,
    };

    Responses.consultas(data, "http://127.0.0.1:8000/api/listarparametros")
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);

          setP("1");
          setCargando("2");
        } else if (Responses.status === 401) {
          navegar("/ingreso");
        } else if (Responses.status === 460) {
          setP("2");
          setCargando("2");
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
        variant="outlined"
        startIcon={<SortIcon />}
        fullWidth
        onClick={handleOpen}
      >
        ordenar
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
        <DialogTitle display="flex" flexDirection="row">
          <SortIcon sx={{ alignSelf: "center", marginRight: 1 }} />
          Seleccione el tipo de examen
        </DialogTitle>
        <DialogContent>
          <Grid>
            {cargando === "1" && (
              <Grid container paddingTop={2}>
                <Grid item xs={12}>
                  <Box component="div" display="flex" justifyContent="center">
                    {/* <PropagateLoader color={color} size={15} /> */}
                    <MoonLoader color={color} size={60} />
                  </Box>
                </Grid>
              </Grid>
            )}
            {cargando === "2" && (
              <Grid container pt={2} spacing={1} justifyContent="space-evenly">
                {param === "1" &&
                  filas.res.map((row) => {
                    return (
                      <Grid item xs={4}>
                        <Ordenar
                          cursada={props.cursada}
                          IdParametro={row.IdParametro}
                          refrescar={props.refrescar}
                          nombre={Valor(row.Tipo)}
                        />
                      </Grid>
                    );
                  })}
                {param === "2" && <h4>No se encontraron resultados</h4>}
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
