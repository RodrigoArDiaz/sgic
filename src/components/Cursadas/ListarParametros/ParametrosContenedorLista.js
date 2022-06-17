import React from "react";
import {
  Alert,
  AlertTitle,
  Box,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import SnackMensajes from "../SnackMensajes";
import ParametrosListaListar from "./ParametrosListaListar";

import * as Responses from "../../Responses";
import { MoonLoader } from "react-spinners";
import { teal } from "@mui/material/colors";

export default function ParametrosContenedorLista(props) {
  const color = teal[400];

  const navegar = useNavigate();

  const [datosconsulta, setDC] = React.useState({}); //datos del buscar
  const [filas, setFilas] = React.useState({}); // datos a mostrar
  const [cargando, setCargando] = React.useState("1"); //Espera al consultar

  //SnackBar

  const [mensaje, setMensaje] = React.useState();
  const [abrir, setAbrir] = React.useState(false);
  const [tipo, setTipo] = React.useState();

  function Refrescar() {
    setCargando("1");
    Responses.consultas(
      datosconsulta,
      "http://127.0.0.1:8000/api/listarparametros"
    )
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
  }

  React.useEffect(() => {
    var data = {
      IdCursada: props.idcursada,
      pidCu: props.idcursada,
    };

    setDC(data);

    Responses.consultas(data, "http://127.0.0.1:8000/api/listarparametros")
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
      {cargando === "3" && (
        <ListItem key="0" paddingTop={0}>
          <ListItemText>
            <Alert severity="info" variant="outlined">
              <AlertTitle>
                La cursada aún no tiene configurado parametros.
              </AlertTitle>
            </Alert>
          </ListItemText>
        </ListItem>
      )}

      {cargando === "1" && (
        <Grid container paddingTop={0}>
          <Grid item xs={12}>
            <Box component="div" display="flex" justifyContent="center">
              <MoonLoader color={color} size={60} />
            </Box>
          </Grid>
        </Grid>
      )}
      {cargando === "2" && (
        <Grid container pt={0}>
          <ParametrosListaListar
            filas={filas}
            refrescar={Refrescar}
            semestre={props.semestre}
            Materia={props.Materia}
            anio={props.anio}
            abrir={setAbrir}
            mensaje={setMensaje}
            tipo={setTipo}
            idcursada={props.idcursada}
          />
        </Grid>
      )}

      <div>
        <SnackMensajes
          abrir={abrir}
          mensaje={mensaje}
          tipo={tipo}
          cerrar={setAbrir}
        />{" "}
      </div>
    </>
  );
}
