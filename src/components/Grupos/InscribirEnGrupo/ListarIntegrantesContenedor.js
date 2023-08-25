import React from "react";
//MUI
import {
  AlertTitle,
  ListItem,
  ListItemText,
  Box,
  CardContent,
} from "@mui/material";
import { Grid } from "@mui/material";
//
import IntegrantesLista from "./IntegrantesLista";
import { useNavigate } from "react-router-dom";
import SnackMensajes from "../../GestionCatedrasSuper/SnackMensajes";
import BuscarAlumnos from "./BuscarAlumnos";
import * as Responses from "../../Responses";
import CardMainPage from "../../Material UI - Componentes Modificados/CardMainPage";
import { MoonLoader } from "react-spinners";
import MensajeFeedback from "../../MensajeFeedback";
import { endpoints } from "../../../api/endpoints";
import { routes } from "../../../routes";
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../../styles/EstilosSpinners";

/*** Componente ListarIntegrantesContenedor ***/
export default function ListarIntegrantesContenedor(props) {
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
    Responses.consultas(datosconsulta, endpoints.listarNoIntegrantes)
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
    Responses.consultas(parametro, endpoints.listarNoIntegrantes)
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
    Responses.consultas(datosconsulta, endpoints.listarNoIntegrantes)
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

    Responses.consultas(datos, endpoints.listarNoIntegrantes)
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
      pAp: "",
      pNom: "",
      pDoc: "",
      pLib: "",

      Offset: 0,
      Limite: filasxpagina,
      pidCu: props.cursada.IdCursada,
    };

    setPagina(1);
    setDC(data);

    Responses.consultas(data, endpoints.listarNoIntegrantes)
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
    <CardMainPage visibleHeader={false}>
      <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
        <Grid container>
          <Grid container direction="row-reverse" justifyContent="start">
            {/* Buscar alumno */}
            <Grid item paddingBottom={1} paddingX={2} marginRight="auto">
              <BuscarAlumnos
                grupo={props.grupo}
                cursada={props.cursada}
                actualizar={BuscarAl}
                filasxpagina={filasxpagina}
              />
            </Grid>
          </Grid>

          {cargando === "3" && (
            <Grid container pt={1}>
              <Grid item xs={12}>
                <Box paddingX={2}>
                  <ListItem key="0" disablePadding>
                    <ListItemText>
                      <MensajeFeedback>
                        <AlertTitle> No se encontraron resultados.</AlertTitle>
                        Todos los alumnos inscriptos en la cursada ya se
                        encuentran inscripto en un grupo.
                      </MensajeFeedback>
                    </ListItemText>
                  </ListItem>
                </Box>
              </Grid>
            </Grid>
          )}

          {cargando === "1" && (
            <Grid container pt={2}>
              <Grid item xs={12}>
                <Box component="div" display="flex" justifyContent="center">
                  <MoonLoader color={colorMainSpinner} size={sizeMainSpinner} />
                </Box>
              </Grid>
            </Grid>
          )}

          {cargando === "2" && (
            <Grid container pt={1}>
              <IntegrantesLista
                filas={filas}
                filasxpagina={filasxpagina}
                pagina={pagina}
                paginacion={paginacion}
                resultados={resultados}
                actualizarpagina={CambioPagina}
                actualizarfilas={CambioFPP}
                refrescar={Refrescar}
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
