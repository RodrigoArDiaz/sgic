import React from "react";
//MUI
import { Grid, Box, Divider, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
//
import NotasExamenesLista from "./NotasExamenesLista";
import BuscarAlumnos from "../BuscarAlumnos";
import BotonTipo from "./BotonTipo";
import { useNavigate } from "react-router-dom";
import SnackMensajes from "../../GestionCatedrasSuper/SnackMensajes";
import * as Responses from "../../Responses";
import { MoonLoader } from "react-spinners";
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../../styles/EstilosSpinners.js";
import MensajeFeedback from "../../MensajeFeedback";
import { endpoints } from "../../../api/endpoints";
import { routes } from "../../../routes";

/*** Componente NotasContenedorExamenes ***/
export default function NotasContenedorExamenes(props) {
  const [expandir, setExp] = React.useState("2");
  const [idparam, setParam] = React.useState("");
  const [botonbusqueda, setBB] = React.useState("");

  const navegar = useNavigate();

  const [datosconsulta, setDC] = React.useState({}); //datos del buscar
  const [filas, setFilas] = React.useState({}); // datos a mostrar
  const [filasxpagina, setFXP] = React.useState(10); //filas x pagina
  const [pagina, setPagina] = React.useState(1); //pagina actual
  const [paginacion, setPaginacion] = React.useState(); // cantidad de paginas a mostrar
  const [resultados, setResultado] = React.useState(); //cantidad de resultados devuelto en la consulta
  const [cargando, setCargando] = React.useState(); //Espera al consultar

  const [mensaje, setMensaje] = React.useState();
  const [abrir, setAbrir] = React.useState(false);
  const [tipo, setTipo] = React.useState();

  function Refrescar() {
    setCargando("1");
    Responses.consultas(datosconsulta, endpoints.buscarNotasExamenes)
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          setCargando("2");
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
        } else if (Responses.status === 460) {
          setCargando("3");
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
      });
  }

  function BuscarAl(parametro) {
    parametro.Offset = 0;
    parametro.Limite = filasxpagina;

    setDC(parametro);
    setCargando("1");
    Responses.consultas(parametro, endpoints.buscarNotasExamenes)
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          setPaginacion(response.res[0].filas);
          setResultado(response.res[0].resultados);
          setCargando("2");
          setPagina(1);
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
        } else if (Responses.status === 460) {
          setCargando("3");
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
      });
  }

  function CambioPagina(pag) {
    setPagina(pag);
    var datos = datosconsulta;
    datos.Offset = pag * filasxpagina - filasxpagina;
    datos.Limite = filasxpagina;

    setDC(datos);
    setCargando("1");
    Responses.consultas(datosconsulta, endpoints.buscarNotasExamenes)
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          setCargando("2");
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
        } else if (Responses.status === 460) {
          setCargando("3");
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
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

    Responses.consultas(datos, endpoints.buscarNotasExamenes)
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          setPaginacion(response.res[0].filas);
          setResultado(response.res[0].resultados);
          setCargando("2");
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
        } else if (Responses.status === 460) {
          setCargando("3");
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
      });
  }

  React.useEffect(() => {
    var data = {
      IdCursada: props.cursada.IdCursada,
      pidCu: props.cursada.IdCursada,
    };

    Responses.consultas(data, endpoints.listarParametros)
      .then((response) => {
        if (Responses.status === 200) {
          setParam(response);

          setExp("1");
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
        } else if (Responses.status === 460) {
          setExp("3");
        } else {
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
      });
  }, []);

  /********************************************************************************/
  /* Componente
   */

  return (
    <>
      {expandir === "2" && (
        <Grid container paddingTop={1}>
          <Grid item xs={12}>
            <Box component="div" display="flex" justifyContent="center">
              <MoonLoader color={colorMainSpinner} size={sizeMainSpinner} />
            </Box>
          </Grid>
        </Grid>
      )}

      {expandir === "3" && (
        <Grid container paddingTop={2}>
          <Grid item xs={12}>
            <Box
              component="div"
              display="flex"
              justifyContent="center"
              paddingX={3}
              paddingY={0}
            >
              <MensajeFeedback>No se encontraron resultados</MensajeFeedback>
            </Box>
          </Grid>
        </Grid>
      )}

      {expandir === "1" && (
        <>
          <Grid container justifyContent="flex-end">
            <Grid item xs={12}>
              <BotonTipo
                cursada={props.cursada}
                actualizar={BuscarAl}
                filasxpagina={filasxpagina}
                parametros={idparam}
                botb={setBB}
              />
            </Grid>

            <Box sx={{ width: "100%" }}>
              {" "}
              <Divider flexItem />
            </Box>

            {botonbusqueda === "1" && (
              <Grid item xs={12}>
                <BuscarAlumnos
                  cursada={props.cursada}
                  actualizar={BuscarAl}
                  filasxpagina={filasxpagina}
                />
              </Grid>
            )}
          </Grid>

          {cargando === "3" && (
            <Grid container>
              <Grid item xs={12}>
                <Box paddingX={2}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <MensajeFeedback>
                        No se encontraron resultados
                      </MensajeFeedback>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          )}

          {cargando === "1" && (
            <Grid container paddingTop={2}>
              <Grid item xs={12}>
                <Box component="div" display="flex" justifyContent="center">
                  <MoonLoader color={colorMainSpinner} size={sizeMainSpinner} />
                </Box>
              </Grid>
            </Grid>
          )}

          {cargando === "2" && (
            <>
              <Box
                display="flex"
                p={2}
                pt={0}
                gap={3}
                justifyContent="end"
                sx={{ marginTop: { xs: "0px", lg: "0px", xl: "-35px" } }}
              >
                <Typography variant="body2" sx={{ fontSize: "0.95rem" }}>
                  Requisito de aprobación:
                </Typography>
                <Box
                  display="inline-flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={2}
                >
                  <Box
                    sx={{
                      width: "20px",
                      height: "6px",
                      borderRadius: "20px",
                      bgcolor: green[900],
                    }}
                    component="span"
                  ></Box>
                  <Typography variant="body2" sx={{ fontSize: "0.95rem" }}>
                    Cumple
                  </Typography>
                </Box>
                <Box
                  display="inline-flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={2}
                >
                  <Box
                    sx={{
                      width: "20px",
                      height: "6px",
                      borderRadius: "20px",
                      bgcolor: red["A700"],
                    }}
                    component="span"
                  ></Box>
                  <Typography variant="body2" sx={{ fontSize: "0.95rem" }}>
                    No cumple
                  </Typography>
                </Box>
              </Box>
              <Grid container>
                <NotasExamenesLista
                  filas={filas}
                  filasxpagina={filasxpagina}
                  pagina={pagina}
                  paginacion={paginacion}
                  resultados={resultados}
                  actualizarpagina={CambioPagina}
                  actualizarfilas={CambioFPP}
                  refrescar={Refrescar}
                  cursada={props.cursada}
                  abrir={setAbrir}
                  mensaje={setMensaje}
                  tipo={setTipo}
                />
              </Grid>
            </>
          )}
        </>
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
