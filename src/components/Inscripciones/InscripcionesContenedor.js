import React from "react";
//MUI
import { Box, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import AlumnosLista from "./AlumnosLista";
import { CrearInscripcion } from "./CrearInscripcion";
import BuscarAlumnos from "./BuscarAlumnos";
import { useNavigate } from "react-router-dom";
import SnackMensajes from "../GestionCatedrasSuper/SnackMensajes";
import { ExportarInfoAlumnos } from "../Cursadas/Opciones/ExportarInfoAlumnos";
import { GenerarCuadricula } from "../Cursadas/Opciones/GenerarCuadricula";
import * as Responses from "../Responses";
//Redux
import { useSelector } from "react-redux";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import { MoonLoader } from "react-spinners";
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../styles/EstilosSpinners";
import MensajeFeedback from "../MensajeFeedback";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";

/*** Componente InscripcionesContenedor ***/
export default function InscripcionesContenedor(props) {
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
    Responses.consultas(datosconsulta, endpoints.buscarInscriptos)
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
    Responses.consultas(parametro, endpoints.buscarInscriptos)
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
    Responses.consultas(datosconsulta, endpoints.buscarInscriptos)
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

    setCargando("1"); //true

    Responses.consultas(datos, endpoints.buscarInscriptos)
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
      pMail: "",
      pDoc: "",
      pNom: "",
      pAp: "",
      pLib: "",

      Offset: 0,
      Limite: filasxpagina,
      // pidCu: props.cursada.IdCursada,
      pidCu: cursada.IdCursada,
    };
    setPagina(1);
    setDC(data);

    Responses.consultas(data, endpoints.buscarInscriptos)
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
  }, []);

  return (
    <>
      <Box paddingBottom={2}>
        <Typography
          variant="h2"
          sx={{
            margin: "0px",
            fontWeight: "500",
            fontSize: "1.5rem",
            lineHeight: "1.27",
            fontFamily: "Public Sans, sans-serif",
          }}
        >
          Inscripciones
        </Typography>
      </Box>
      <CardMainPage visibleHeader={false}>
        <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Grid container>
            <Grid container direction="row-reverse">
              {/* */}
              <Grid item>
                <Grid
                  container
                  paddingX={2}
                  // paddingY={1}
                  paddingBottom={1}
                  justifyContent="flex-end"
                  spacing={1}
                >
                  <Grid item>
                    <ExportarInfoAlumnos
                      idcursada={cursada.IdCursada}
                      abrir={setAbrir}
                      mensaje={setMensaje}
                      tipo={setTipo}
                    />
                  </Grid>

                  <Grid item>
                    <GenerarCuadricula
                      idcursada={cursada.IdCursada}
                      abrir={setAbrir}
                      mensaje={setMensaje}
                      tipo={setTipo}
                    />
                  </Grid>

                  {/* Agregar inscripcion */}
                  <Grid item>
                    <CrearInscripcion
                      refrescar={Refrescar}
                      abrir={setAbrir}
                      mensaje={setMensaje}
                      tipo={setTipo}
                      cursada={props.cursada}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Buscar alumnos */}
              <Grid
                item
                // xs={8}
                paddingBottom={1}
                paddingX={2}
                marginRight="auto"
              >
                <BuscarAlumnos
                  cursada={cursada}
                  actualizar={BuscarAl}
                  filasxpagina={filasxpagina}
                />
              </Grid>
            </Grid>

            {cargando === "1" && (
              <Grid container pt={1}>
                <Grid item xs={12}>
                  <Box component="div" display="flex" justifyContent="center">
                    <MoonLoader
                      color={colorMainSpinner}
                      size={sizeMainSpinner}
                    />
                  </Box>
                </Grid>
              </Grid>
            )}

            {cargando === "2" && (
              <Grid container pt={1}>
                <AlumnosLista
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

            {cargando === "3" && (
              <Grid container paddingTop={1}>
                <Grid item xs={12}>
                  <Box paddingX={2}>
                    <MensajeFeedback>
                      {/* <AlertTitle>La cursada no admite grupos</AlertTitle> */}
                      No se encontraron resultados.
                    </MensajeFeedback>
                  </Box>
                </Grid>
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
    </>
  );
}
