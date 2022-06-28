import React from "react";
//MUI
import { CardContent, Paper, Typography, Box } from "@mui/material";
import { Grid } from "@mui/material";
import { blue, teal } from "@mui/material/colors";
//
import GruposLista from "./GruposLista";
import { CrearGrupo } from "./CrearGrupo";
import BuscarGrupos from "./BuscarGrupos";
import { useNavigate } from "react-router-dom";
import SnackMensajes from "../GestionCatedrasSuper/SnackMensajes";
import * as Responses from "../Responses";
import { useSelector } from "react-redux";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import { MoonLoader } from "react-spinners";

export default function InscripcionesContenedor(props) {
  const color = teal[400];

  //Recupero informacion de la cursada
  const { cursada } = useSelector((state) => state.cursada);

  const navegar = useNavigate();

  const [datosconsulta, setDC] = React.useState({}); //datos del buscar
  const [filas, setFilas] = React.useState({}); // datos a mostrar
  const [filasxpagina, setFXP] = React.useState(1); //filas x pagina
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
    Responses.consultas(datosconsulta, "http://127.0.0.1:8000/api/buscargrupos")
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
    Responses.consultas(parametro, "http://127.0.0.1:8000/api/buscargrupos")
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
    Responses.consultas(datos, "http://127.0.0.1:8000/api/buscargrupos")
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

    setPagina(pag);
  }

  function CambioFPP(pag) {
    setPagina(1);
    setFXP(pag);
    var datos = datosconsulta;
    datos.Offset = 0;
    datos.Limite = pag;

    setDC(datos);

    setCargando("1");

    Responses.consultas(datos, "http://127.0.0.1:8000/api/buscargrupos")
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
      pGrupo: "",
      pTema: "",
      pModulo: "",
      piB: "B",
      Offset: 0,
      Limite: filasxpagina,
      pidCu: cursada.IdCursada,
      // pidCu: props.cursada.IdCursada,
    };
    setPagina(1);
    setDC(data);

    Responses.consultas(data, "http://127.0.0.1:8000/api/buscargrupos")
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

  if (cursada.TieneGrupos === "N") {
    return (
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
        <Grid container pt={30} spacing={8}>
          <Grid item xs={9}>
            <Typography variant="h4">La cursada no admite grupos</Typography>
          </Grid>
        </Grid>

        <Grid container pt={30} spacing={8}>
          <Grid item xs={9}>
            <Typography variant="h4"></Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  return (
    <CardMainPage
      icon="supervisor_account"
      title="Grupos"
      bgColorIcon={blue[500]}
    >
      <CardContent>
        <Grid container>
          <Grid container direction="row-reverse">
            {/* Crear grupo */}
            <Grid item xs={12} sm={2} md={2}>
              <Grid
                container
                paddingX={2}
                // paddingY={1}
                paddingBottom={1}
                justifyContent="flex-end"
              >
                <Grid item xs={12}>
                  <CrearGrupo
                    refrescar={Refrescar}
                    abrir={setAbrir}
                    mensaje={setMensaje}
                    tipo={setTipo}
                    cursada={cursada}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* Buscar grupo */}
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={10}
              // xl={10}
              // paddingY={1}
              paddingBottom={1}
              paddingX={2}
            >
              <BuscarGrupos
                cursada={cursada}
                actualizar={BuscarAl}
                filasxpagina={filasxpagina}
              />
            </Grid>
          </Grid>

          {cargando === "3" && <h4>No se encontraron resultados</h4>}
          {cargando === "1" && (
            <Grid container paddingTop={2}>
              <Grid item xs={12}>
                <Box component="div" display="flex" justifyContent="center">
                  <MoonLoader color={color} size={60} />
                </Box>
              </Grid>
            </Grid>
          )}
          {cargando === "2" && (
            <Grid container pt={2}>
              <GruposLista
                filas={filas}
                filasxpagina={filasxpagina}
                pagina={pagina}
                paginacion={paginacion}
                resultados={resultados}
                actualizarpagina={CambioPagina}
                actualizarfilas={CambioFPP}
                refrescar={Refrescar}
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
          </div>
        </Grid>
      </CardContent>
    </CardMainPage>
  );
}
