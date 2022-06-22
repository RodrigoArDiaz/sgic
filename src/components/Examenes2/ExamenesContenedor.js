import React from "react";
import { CardContent, Box } from "@mui/material";
import { Grid } from "@mui/material";
import ExamenesLista from "./ExamenesLista";
import { CrearExamen } from "./CrearExamen";
import OrdenarTipo from "./OrdenarTipo";
import BuscarExamenes from "./BuscarExamenes";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import SnackMensajes from "../GestionCatedrasSuper/SnackMensajes";
import * as Responses from "../Responses";
import { useSelector } from "react-redux";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import { blue, teal } from "@mui/material/colors";
import { MoonLoader } from "react-spinners";

export default function ExamenesContenedor(props) {
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

  //Controladores de parametros
  const [parametros, setPar] = React.useState({}); // datos a mostrar

  function Refrescar() {
    setCargando("1");
    Responses.consultas(
      datosconsulta,
      "http://127.0.0.1:8000/api/buscarexamenes"
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
    Responses.consultas(parametro, "http://127.0.0.1:8000/api/buscarexamenes")
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
    Responses.consultas(datos, "http://127.0.0.1:8000/api/buscarexamenes")
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

    Responses.consultas(datos, "http://127.0.0.1:8000/api/buscarexamenes")
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
      pExamen: "",
      pOrden: "",
      piB: "B",
      Offset: 0,
      Limite: filasxpagina,
      // pidCu: props.cursada.IdCursada,
      pidCu: cursada.IdCursada,
    };

    var data2 = {
      IdCursada: cursada.IdCursada,
      pidCu: cursada.IdCursada,
      // IdCursada: props.cursada.IdCursada,
      // pidCu: props.cursada.IdCursada,
    };

    setPagina(1);
    setDC(data);

    Responses.consultas(data2, "http://127.0.0.1:8000/api/listarparametros")
      .then((response) => {
        if (Responses.status === 200) {
          setPar(response);
          /////////////Esto va dentro del 200

          Responses.consultas(data, "http://127.0.0.1:8000/api/buscarexamenes")
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

          /////////////Esto va dentro del 200
        } else if (Responses.status === 401) {
          navegar("/ingreso");
        } else if (Responses.status === 460) {
          setCargando("4");
        } else {
          navegar("/error");
        }
      })
      .catch((error) => {
        navegar("/error");
      });
  }, []);

  console.log(parametros);
  return (
    <CardMainPage icon="assignment" title="Exámenes" bgColorIcon={blue[500]}>
      <CardContent>
        <Grid container>
          <Grid container direction="row-reverse">
            {/* CrearExamen */}
            <Grid item xs={12} sm={2} md={2}>
              <Grid
                container
                paddingX={2}
                // paddingY={1}
                paddingBottom={1}
                justifyContent="flex-end"
              >
                <Grid item xs={12}>
                  <CrearExamen
                    refrescar={Refrescar}
                    parametros={parametros}
                    abrir={setAbrir}
                    mensaje={setMensaje}
                    tipo={setTipo}
                    cursada={cursada}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* <OrdenarPracticos /> */}
            <Grid item xs={12} sm={2} md={1}>
              <Grid
                container
                paddingX={2}
                // paddingY={1}
                paddingBottom={1}
                justifyContent="flex-end"
              >
                <Grid item xs={12}>
                  <OrdenarTipo
                    refrescar={Refrescar}
                    abrir={setAbrir}
                    mensaje={setMensaje}
                    tipo={setTipo}
                    cursada={cursada}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* Buscar practicos */}
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={9}
              // xl={10}
              // paddingY={1}
              paddingBottom={1}
              paddingX={2}
            >
              <BuscarExamenes
                cursada={cursada}
                actualizar={BuscarAl}
                filasxpagina={filasxpagina}
              />
            </Grid>
          </Grid>

          {cargando === "4" && <h4>Debe configurar parámetros de examen</h4>}

          {cargando === "3" && <h4>No se encontraron resultados</h4>}

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
            <Grid container pt={2}>
              <ExamenesLista
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
                parametros={parametros}
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
