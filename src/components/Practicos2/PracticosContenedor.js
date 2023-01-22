import React from "react";
import { Box, CardContent, Paper, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import PracticosLista from "./PracticosLista";
import { CrearPractico } from "./CrearPractico";
import Ordenar from "./Ordenar";
import BuscarPracticos from "./BuscarPracticos";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
// import SnackMensajes from "../Catedras/SnackMensajes";
import SnackMensajes from "../GestionCatedrasSuper/SnackMensajes";
import * as Responses from "../Responses";

//Redux
import { useSelector } from "react-redux";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import { blue, teal } from "@mui/material/colors";
import { MoonLoader } from "react-spinners";

export default function PracticosContenedor(props) {
  const color = teal[400];
  //Recupero informacion de la cursada
  const { cursada } = useSelector((state) => state.cursada);

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
      "http://127.0.0.1:8000/api/buscarpracticos"
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

  function BuscarAl(parametro) {
    parametro.Offset = 0;
    parametro.Limite = filasxpagina;

    setDC(parametro);
    setCargando("1");
    Responses.consultas(parametro, "http://127.0.0.1:8000/api/buscarpracticos")
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
    Responses.consultas(datos, "http://127.0.0.1:8000/api/buscarpracticos")
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

    Responses.consultas(datos, "http://127.0.0.1:8000/api/buscarpracticos")
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

        navegar("/registrarse");
      });
  }

  React.useEffect(() => {
    var data = {
      pPractico: "",
      pOrden: "",
      piB: "B",
      Offset: 0,
      Limite: filasxpagina,
      // pidCu: props.cursada.IdCursada,
      pidCu: cursada.IdCursada,
    };

    setPagina(1);
    setDC(data);

    Responses.consultas(data, "http://127.0.0.1:8000/api/buscarpracticos")
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
    <>
      <Box paddingBottom={2}>
        <Typography
          variant="h2"
          sx={{
            margin: "0px",
            fontWeight: "500",
            fontSize: "1.775rem",
            lineHeight: "1.27",
            fontFamily: "Public Sans, sans-serif",
          }}
        >
          Prácticos
        </Typography>
      </Box>
      <CardMainPage
        visibleHeader={false}
        //  icon="info" title="Prácticos" bgColorIcon={blue[500]}
      >
        <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Grid container>
            <Grid container direction="row-reverse">
              {/* CrearPractico */}
              <Grid item>
                <Grid
                  container
                  paddingX={2}
                  // paddingY={1}
                  paddingBottom={1}
                  justifyContent="flex-end"
                >
                  <Grid item xs={12}>
                    <CrearPractico
                      refrescar={Refrescar}
                      abrir={setAbrir}
                      mensaje={setMensaje}
                      tipo={setTipo}
                      // cursada={props.cursada}
                      cursada={cursada}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* <OrdenarPractico /> */}
              <Grid item>
                <Grid
                  container
                  paddingX={2}
                  // paddingY={1}
                  paddingBottom={1}
                  justifyContent="flex-end"
                >
                  <Grid item xs={12}>
                    <Ordenar
                      refrescar={Refrescar}
                      abrir={setAbrir}
                      mensaje={setMensaje}
                      tipo={setTipo}
                      // cursada={props.cursada}
                      cursada={cursada}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Buscar practicos */}
              <Grid
                item
                // xs={12}
                // sm={12}
                // md={8.5}
                // lg={9.5}
                // xl={9}
                // xl={10}
                paddingBottom={1}
                paddingX={2}
                marginRight="auto"
              >
                <BuscarPracticos
                  // cursada={props.cursada}
                  cursada={cursada}
                  actualizar={BuscarAl}
                  filasxpagina={filasxpagina}
                />
              </Grid>
            </Grid>

            {cargando === "3" && <h4>No se encontraron resultados</h4>}

            {cargando === "1" && (
              <Grid container paddingTop={4}>
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
                <PracticosLista
                  filas={filas}
                  filasxpagina={filasxpagina}
                  pagina={pagina}
                  paginacion={paginacion}
                  resultados={resultados}
                  actualizarpagina={CambioPagina}
                  actualizarfilas={CambioFPP}
                  refrescar={Refrescar}
                  // cursada={props.cursada}
                  cursada={cursada}
                  abrir={setAbrir}
                  mensaje={setMensaje}
                  tipo={setTipo}
                />
              </Grid>
            )}
          </Grid>

          <div>
            <SnackMensajes
              abrir={abrir}
              mensaje={mensaje}
              tipo={tipo}
              cerrar={setAbrir}
            />{" "}
          </div>
        </CardContent>

        {/* <Grid container pt={10} spacing={8}>
        <Grid sx={{ mt: 1 }} item xs={3}>
          <CrearPractico
            refrescar={Refrescar}
            abrir={setAbrir}
            mensaje={setMensaje}
            tipo={setTipo}
            // cursada={props.cursada}
            cursada={cursada}
          />
        </Grid>

        <Grid sx={{ mt: 1 }} item xs={3}>
          <Ordenar
            refrescar={Refrescar}
            abrir={setAbrir}
            mensaje={setMensaje}
            tipo={setTipo}
            // cursada={props.cursada}
            cursada={cursada}
          />
        </Grid>
      </Grid> */}

        {/* <Grid container pt={1} justifyContent="flex-end" spacing={8}>
        <Grid item xs={12}>
          <BuscarPracticos
            // cursada={props.cursada}
            cursada={cursada}
            actualizar={BuscarAl}
            filasxpagina={filasxpagina}
          />
        </Grid>
      </Grid> */}

        {/* {cargando === "3" && <h4>No se encontraron resultados</h4>}

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
          <PracticosLista
            filas={filas}
            filasxpagina={filasxpagina}
            pagina={pagina}
            paginacion={paginacion}
            resultados={resultados}
            actualizarpagina={CambioPagina}
            actualizarfilas={CambioFPP}
            refrescar={Refrescar}
            // cursada={props.cursada}
            cursada={cursada}
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
      </div> */}
      </CardMainPage>
    </>
  );
}
