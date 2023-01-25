import React from "react";
import {
  Alert,
  AlertTitle,
  CardContent,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Grid, Box } from "@mui/material";
import IntegrantesLista from "./IntegrantesLista";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import SnackMensajes from "../../GestionCatedrasSuper/SnackMensajes";
import * as Responses from "../../Responses";
import CardMainPage from "../../Material UI - Componentes Modificados/CardMainPage";
import { MoonLoader } from "react-spinners";
import { teal } from "@mui/material/colors";
import MensajeFeedback from "../../MensajeFeedback";

export default function ListarIntegrantesContenedor(props) {
  const color = teal[400];

  const navegar = useNavigate();

  const [filas, setFilas] = React.useState({}); // datos a mostrar
  const [cargando, setCargando] = React.useState("1"); //Espera al consultar

  //SnackBar

  const [mensaje, setMensaje] = React.useState();
  const [abrir, setAbrir] = React.useState(false);
  const [tipo, setTipo] = React.useState();

  React.useEffect(() => {
    var data = {
      pidG: props.grupo.IdGrupo,
      Offset: 0,
      Limite: 30,
      pidCu: props.cursada.IdCursada,
    };

    Responses.consultas(data, "http://127.0.0.1:8000/api/listarintegrantes")
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
    <CardMainPage
      // icon="supervisor_account"
      // title={"Integrantes de " + props.grupo.Grupo}
      // bgColorIcon="cyan.main300"
      visibleHeader={false}
    >
      <CardContent
        sx={{
          paddingRight: 0,
          paddingLeft: 0,
          "& .MuiCardContent-root:last-child": { paddingBottom: 0 },
        }}
      >
        <Grid container>
          {cargando === "3" && (
            <Box paddingX={2} sx={{ width: "100%" }}>
              <MensajeFeedback>
                El grupo aún no tiene integrantes.
              </MensajeFeedback>
            </Box>
          )}

          {cargando === "1" && (
            <Grid container pt={2}>
              <Grid item xs={12}>
                <Box component="div" display="flex" justifyContent="center">
                  <MoonLoader color={color} size={60} />
                </Box>
              </Grid>
            </Grid>
          )}

          {cargando === "2" && (
            <Grid container pt={1}>
              <IntegrantesLista
                filas={filas}
                cursada={props.cursada}
                grupo={props.grupo}
                abrir={setAbrir}
                mensaje={setMensaje}
                tipo={setTipo}
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
        </Grid>
      </CardContent>
    </CardMainPage>
  );
}
