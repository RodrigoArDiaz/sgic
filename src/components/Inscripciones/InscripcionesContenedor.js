import React from "react";
import { CardContent, Paper, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import AlumnosLista from "./AlumnosLista";
import { CrearInscripcion } from "./CrearInscripcion";
import BuscarAlumnos from "./BuscarAlumnos";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
// import SnackMensajes from "../Catedras/SnackMensajes";
import SnackMensajes from "../GestionCatedrasSuper/SnackMensajes";
import { ExportarInfoAlumnos } from "../Cursadas/Opciones/ExportarInfoAlumnos";
import { GenerarCuadricula } from "../Cursadas/Opciones/GenerarCuadricula";
import * as Responses from "../Responses";
//Redux
import { useSelector } from "react-redux";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import { blue } from "@mui/material/colors";

export default function InscripcionesContenedor(props) {
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
    Responses.consultas(
      datosconsulta,
      "http://127.0.0.1:8000/api/buscarinscriptos"
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
    Responses.consultas(parametro, "http://127.0.0.1:8000/api/buscarinscriptos")
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
    Responses.consultas(
      datosconsulta,
      "http://127.0.0.1:8000/api/buscarinscriptos"
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

  function CambioFPP(pag) {
    setPagina(1);
    setFXP(pag);
    var datos = datosconsulta;
    datos.Offset = 0;
    datos.Limite = pag;

    setDC(datos);

    setCargando("1"); //true

    Responses.consultas(datos, "http://127.0.0.1:8000/api/buscarinscriptos")
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

    Responses.consultas(data, "http://127.0.0.1:8000/api/buscarinscriptos")
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
      icon="co_present"
      title="Inscripciones"
      bgColorIcon={blue[500]}
    >
      <CardContent>
        <Grid container>
          <Grid container direction="row-reverse">
            {/* */}
            <Grid item xs={12} sm={12} md={2}>
              <Grid
                container
                paddingX={2}
                // paddingY={1}
                paddingBottom={1}
                justifyContent="flex-end"
                spacing={1}
              >
                <Grid item xs={12}>
                  <CrearInscripcion
                    refrescar={Refrescar}
                    abrir={setAbrir}
                    mensaje={setMensaje}
                    tipo={setTipo}
                    cursada={props.cursada}
                  />
                </Grid>

                <Grid item xs={12}>
                  <ExportarInfoAlumnos
                    // idcursada={props.cursada.IdCursada}
                    idcursada={cursada.IdCursada}
                    abrir={setAbrir}
                    mensaje={setMensaje}
                    tipo={setTipo}
                  />
                </Grid>

                <Grid item xs={12}>
                  <GenerarCuadricula
                    // idcursada={props.cursada.IdCursada}
                    idcursada={cursada.IdCursada}
                    abrir={setAbrir}
                    mensaje={setMensaje}
                    tipo={setTipo}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Buscar alumnos */}
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={10}
              paddingBottom={1}
              paddingX={2}
            >
              <BuscarAlumnos
                cursada={cursada}
                actualizar={BuscarAl}
                filasxpagina={filasxpagina}
              />
            </Grid>
          </Grid>

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
            <Grid container pt={2}>
              <AlumnosLista
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
