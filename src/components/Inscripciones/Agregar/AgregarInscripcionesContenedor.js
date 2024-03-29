import React from "react";
//MUI
import {
  Alert,
  AlertTitle,
  Box,
  CardContent,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Grid } from "@mui/material";
import AlumnosLista from "./AlumnosLista";
import BuscarAlumnos from "../BuscarAlumnos";
import { useNavigate } from "react-router-dom";
import SnackMensajes from "../../../components/GestionCatedrasSuper/SnackMensajes";
import * as Responses from "../../Responses";
//Redux
import { useSelector } from "react-redux";
//React-spinners
import { MoonLoader } from "react-spinners";
//Estilo spinner
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../../styles/EstilosSpinners";
//MUI personalizados
import CardMainPage from "../../Material UI - Componentes Modificados/CardMainPage";
import { endpoints } from "../../../api/endpoints";
import { routes } from "../../../routes";

/*** Componente AgregarInscripcionesContenedor ***/
export default function AgregarInscripcionesContenedor(props) {
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
    setCargando(true);
    Responses.consultas(datosconsulta, endpoints.buscarNoInscriptos)
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
    Responses.consultas(parametro, endpoints.buscarNoInscriptos)
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
    setPagina(1);
    var datos = datosconsulta;
    datos.Offset = pag * filasxpagina - filasxpagina;
    datos.Limite = filasxpagina;

    setDC(datos);
    setCargando("1");
    Responses.consultas(datos, endpoints.buscarNoInscriptos)
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

    Responses.consultas(datos, endpoints.buscarNoInscriptos)
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

    Responses.consultas(data, endpoints.buscarNoInscriptos)
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
      <CardContent
        sx={{
          paddingRight: 0,
          paddingLeft: 0,
          "& .MuiCardContent-root:last-child": { paddingBottom: 0 },
        }}
      >
        <Grid container>
          <Grid item paddingBottom={1} paddingX={2}>
            <BuscarAlumnos
              cursada={cursada}
              actualizar={BuscarAl}
              filasxpagina={filasxpagina}
            />
          </Grid>

          {cargando === "3" && (
            <Grid container pt={2}>
              <Grid item xs={12}>
                <ListItem key="0" disablePadding>
                  <ListItemText>
                    <Alert severity="info" variant="outlined">
                      <AlertTitle>No se encontraron resultados</AlertTitle>
                    </Alert>
                  </ListItemText>
                </ListItem>
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
