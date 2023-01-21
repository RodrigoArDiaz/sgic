import React from "react";
import {
  Alert,
  AlertTitle,
  Box,
  CardContent,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";
import CursadaLista from "./CursadaLista";
import { CrearCursada } from "./CrearCursada";
import BuscarCursadas from "./BuscarCursadas";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import SnackMensajes from "./SnackMensajes";
import * as Responses from "../Responses";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import { teal } from "@mui/material/colors";
import { MoonLoader } from "react-spinners";
import MensajeFeedback from "../MensajeFeedback.js";

export default function CursadasContenedor(props) {
  const color = teal[400];

  const navegar = useNavigate();

  const [datosconsulta, setDC] = React.useState({}); //datos del buscar
  const [filas, setFilas] = React.useState({}); // datos a mostrar
  const [filasxpagina, setFXP] = React.useState(10); //filas x pagina
  const [pagina, setPagina] = React.useState(1); //pagina actual
  const [paginacion, setPaginacion] = React.useState(); // cantidad de paginas a mostrar
  const [resultados, setResultado] = React.useState(); //cantidad de resultados devuelto en la consulta
  const [cargando, setCargando] = React.useState("1"); //Espera al consultar

  //SnackBar

  const [mensaje, setMensaje] = React.useState();
  const [abrir, setAbrir] = React.useState(false);
  const [tipo, setTipo] = React.useState();

  function Refrescar() {
    setCargando("1");
    Responses.consultas(
      datosconsulta,
      "http://127.0.0.1:8000/api/buscarcursadas"
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

  function BuscarCur(parametro) {
    parametro.Offset = 0;
    parametro.Limite = filasxpagina;

    setDC(parametro);
    setCargando("1");
    Responses.consultas(parametro, "http://127.0.0.1:8000/api/buscarcursadas")
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          setPaginacion(response.res[0].filas);
          setResultado(response.res[0].resultados);
          setCargando("2");
          setPagina(1);
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

  function CambioPagina(pag) {
    setPagina(pag);

    var datos = datosconsulta;
    datos.Offset = pag * filasxpagina - filasxpagina;
    datos.Limite = filasxpagina;

    setDC(datos);
    setCargando("1");
    Responses.consultas(datos, "http://127.0.0.1:8000/api/buscarcursadas")
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

  function CambioFPP(pag) {
    setPagina(1);
    setFXP(pag);
    var datos = datosconsulta;
    datos.Offset = 0;
    datos.Limite = pag;

    setDC(datos);

    setCargando("1");

    Responses.consultas(datos, "http://127.0.0.1:8000/api/buscarcursadas")
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          setPaginacion(response.res[0].filas);
          setResultado(response.res[0].resultados);
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
      pAn: "",
      pSem: "",
      piB: "B",
      Offset: 0,
      Limite: filasxpagina,
      pidMat: props.idmateria,
    };

    setPagina(1);
    setDC(data);

    Responses.consultas(data, "http://127.0.0.1:8000/api/buscarcursadas")
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          setPaginacion(response.res[0].filas);
          setResultado(response.res[0].resultados);
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
      // icon="build"
      // title={"Gestión de Cursadas - " + props.Materia}
      // bgColorIcon="cyan.main300"
      visibleHeader={false}
    >
      <CardContent sx={{ paddingRight: 0, paddingLeft: 0 }}>
        <Grid container>
          <Grid container direction="row-reverse">
            <Grid item xs={12} sm={6} md={3.5} lg={2.5} xl={2}>
              <Grid
                container
                paddingX={2}
                // paddingY={1}
                paddingBottom={1}
                justifyContent="flex-end"
              >
                <Grid item xs={12} lg={9}>
                  <CrearCursada
                    refrescar={Refrescar}
                    abrir={setAbrir}
                    mensaje={setMensaje}
                    tipo={setTipo}
                    idmateria={props.idmateria}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={8.5}
              lg={9.5}
              xl={10}
              // paddingY={1}
              paddingBottom={1}
              paddingX={2}
            >
              <BuscarCursadas
                actualizar={BuscarCur}
                filasxpagina={filasxpagina}
                idmateria={props.idmateria}
              />
            </Grid>
          </Grid>

          {cargando === "3" && (
            <Grid container p={2}>
              <Grid item xs={12}>
                <ListItem key="0" disablePadding>
                  <ListItemText>
                    <MensajeFeedback>
                      No se encontraron resultados
                    </MensajeFeedback>
                  </ListItemText>
                </ListItem>
              </Grid>
            </Grid>
          )}

          {cargando === "1" && (
            <Grid container pt={2}>
              <Grid item xs={12}>
                <Box component="div" display="flex" justifyContent="center">
                  {/* <PropagateLoader color={color} size={15} /> */}
                  <MoonLoader color={color} size={60} />
                </Box>
              </Grid>
            </Grid>
          )}
          {cargando === "2" && (
            <Grid container pt={1}>
              <CursadaLista
                filas={filas}
                filasxpagina={filasxpagina}
                pagina={pagina}
                paginacion={paginacion}
                resultados={resultados}
                actualizarpagina={CambioPagina}
                actualizarfilas={CambioFPP}
                refrescar={Refrescar}
                idmateria={props.idmateria}
                abrir={setAbrir}
                mensaje={setMensaje}
                tipo={setTipo}
                Materia={props.Materia}
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
