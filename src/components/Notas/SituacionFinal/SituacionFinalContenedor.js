import React from "react";
//MUI
import { Box, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { green, red } from "@mui/material/colors";
//
import SituacionFinalLista from "./SituacionFinalLista";
import BuscarAlumnos from "../BuscarAlumnos";
import { useNavigate } from "react-router-dom";
import SnackMensajes from "../../GestionCatedrasSuper/SnackMensajes";
import * as Responses from "../../Responses";
import { MoonLoader } from "react-spinners";
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../../styles/EstilosSpinners";
import MensajeFeedback from "../../MensajeFeedback";
import { endpoints } from "../../../api/endpoints";
import { routes } from "../../../routes";

/*** Componente SituacionFinalContenedor ***/
export default function SituacionFinalContenedor(props) {
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
    Responses.consultas(datosconsulta, endpoints.buscarSituacionFinal)
      .then((response) => {
        if (Responses.status === 200) {
          setFilas(response);
          setCargando("2");
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
        } else if (Responses.status === 460) {
          setCargando("3");
        } else {
          //  navegar(routes.error);
        }
      })
      .catch((error) => {
        //  navegar(routes.error);
      });
  }

  function BuscarAl(parametro) {
    parametro.Offset = 0;
    parametro.Limite = filasxpagina;

    setDC(parametro);
    setCargando("1");
    Responses.consultas(parametro, endpoints.buscarSituacionFinal)
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
          //  navegar(routes.error);
        }
      })
      .catch((error) => {
        //  navegar(routes.error);
      });
  }

  function CambioPagina(pag) {
    setPagina(1);
    var datos = datosconsulta;
    datos.Offset = pag * filasxpagina - filasxpagina;
    datos.Limite = filasxpagina;

    setDC(datos);
    setCargando("1");
    Responses.consultas(datosconsulta, endpoints.buscarSituacionFinal)
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

    Responses.consultas(datos, endpoints.buscarSituacionFinal)
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
      pNom: "",
      pAp: "",
      pLib: "",
      Offset: 0,
      Limite: filasxpagina,
      pidCu: props.cursada.IdCursada,
    };
    setPagina(1);
    setDC(data);

    Responses.consultas(data, endpoints.buscarSituacionFinal)
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
          //  navegar(routes.error);
        }
      })
      .catch((error) => {
        //  navegar(routes.error);
      });
  }, []);

  return (
    <>
      <Grid container justifyContent="flex-end">
        <Grid item xs={12}>
          <BuscarAlumnos
            cursada={props.cursada}
            actualizar={BuscarAl}
            filasxpagina={filasxpagina}
          />
        </Grid>
      </Grid>

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
            sx={{ marginTop: { xs: "0px", lg: "-35px" } }}
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
          <Grid container pt={1}>
            <SituacionFinalLista
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

      {cargando === "3" && (
        <Grid container paddingTop={2}>
          <Grid item xs={12}>
            <Box
              component="div"
              display="flex"
              justifyContent="center"
              paddingX={2}
            >
              <MensajeFeedback>
                No se encontraron resultados. Revise si los parámetros de examen
                están configurados correctamente
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
    </>
  );
}
