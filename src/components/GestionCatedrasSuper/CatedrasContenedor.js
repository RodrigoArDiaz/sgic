import React from "react";
//MUI
import { Box, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";
//REact router dom
import { useNavigate } from "react-router-dom";
//Componentes propios
import SnackMensajes from "./SnackMensajes";
import { CrearCatedra } from "./CrearCatedra";
import BuscarCatedras from "./BuscarCatedras";
import CatedraLista from "./CatedraLista";
import { useSelector } from "react-redux";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import { MoonLoader } from "react-spinners";
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../styles/EstilosSpinners";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";

/*** Componente CatedrasContenedor ***/
export default function CatedrasContenedor() {
  //Navegacion react router

  const navegar = useNavigate();
  //Recupero token
  // const { token } = useSelector((state) => state.login);

  //Recupero token
  const token = localStorage.getItem("tkn");

  const [datosconsulta, setDC] = React.useState({}); //datos del buscar
  const [filas, setFilas] = React.useState({}); // datos a mostrar
  const [filasxpagina, setFXP] = React.useState(10); //filas x pagina
  const [pagina, setPagina] = React.useState(1); //pagina actual
  const [paginacion, setPaginacion] = React.useState(); // cantidad de paginas a mostrar
  const [resultados, setResultado] = React.useState(); //cantidad de resultados devuelto en la consulta
  const [cargando, setCargando] = React.useState(true); //Espera al consultar

  //SnackBar
  const [mensaje, setMensaje] = React.useState();
  const [abrir, setAbrir] = React.useState(false);
  const [tipo, setTipo] = React.useState();

  //Peticion
  async function consultas(data, cadena) {
    //Adjunto token
    data = { ...data, ...{ token: token } };

    console.log(data);
    const response = await fetch(cadena, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    return response.json();
  }

  //
  function Refrescar() {
    setCargando(true);
    consultas(datosconsulta, endpoints.buscarCatedras)
      .then((response) => {
        setFilas(response);
        setCargando(false);

        if (response.res.length > 0) {
          setPaginacion(response.res[0].filas);
          setResultado(response.res[0].resultados);
        }
      })
      .catch((error) => {
        navegar(routes.iniciarSesion);
      });
  }

  //
  function BuscarCat(parametro) {
    parametro.Offset = 0;
    parametro.Limite = filasxpagina;

    setDC(parametro);
    setCargando(true);
    consultas(parametro, endpoints.buscarCatedras)
      .then((response) => {
        setFilas(response);

        if (response.res.length > 0) {
          setPaginacion(response.res[0].filas);
          setResultado(response.res[0].resultados);

          setPagina(1);
        }

        setCargando(false);
      })
      .catch((error) => {
        navegar(routes.iniciarSesion);
      });
  }

  //
  function CambioPagina(pag) {
    var datos = datosconsulta;
    datos.Offset = pag * filasxpagina - filasxpagina;
    datos.Limite = filasxpagina;

    setDC(datos);
    setCargando(true);
    consultas(datosconsulta, endpoints.buscarCatedras)
      .then((response) => {
        setFilas(response);
        setCargando(false);
      })
      .catch((error) => {
        navegar(routes.iniciarSesion);
      });

    setPagina(pag);
  }

  //
  function CambioFPP(pag) {
    setFXP(pag);
    var datos = datosconsulta;
    datos.Offset = 0;
    datos.Limite = pag;

    setDC(datos);

    setCargando(true);

    consultas(datos, endpoints.buscarCatedras)
      .then((response) => {
        setFilas(response);

        if (response.res.length > 0) {
          setPaginacion(response.res[0].filas);
          setResultado(response.res[0].resultados);
          setCargando(false);
        }
      })
      .catch((error) => {
        navegar(routes.iniciarSesion);
      });
  }

  React.useEffect(() => {
    var data = {
      Catedra: "",
      Bajas: "B",
      Offset: 0,
      Limite: filasxpagina,
    };

    setDC(data);

    consultas(data, endpoints.buscarCatedras)
      .then((response) => {
        if (response.message === "Unauthenticated.") {
          navegar(routes.iniciarSesion);
        }

        setFilas(response);

        if (response.res === undefined) {
          setCargando(true);
        } else {
          if (response.res.length > 0) {
            setPaginacion(response.res[0].filas);
            setResultado(response.res[0].resultados);

            setPagina(1);
          }
          setCargando(false);
        }
      })
      .catch((error) => {
        navegar(routes.iniciarSesion);
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
          Gestión cátedras
        </Typography>
      </Box>
      <CardMainPage visibleHeader={false}>
        <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Grid container>
            <Grid container direction="row-reverse">
              <Grid item>
                <Grid
                  container
                  paddingX={2}
                  paddingBottom={1}
                  justifyContent="flex-end"
                >
                  <Grid item xs={12}>
                    <CrearCatedra
                      refrescar={Refrescar}
                      abrir={setAbrir}
                      mensaje={setMensaje}
                      tipo={setTipo}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item paddingBottom={1} paddingX={2} marginRight="auto">
                <BuscarCatedras
                  actualizar={BuscarCat}
                  filasxpagina={filasxpagina}
                />
              </Grid>
            </Grid>

            {cargando === true && (
              <Grid container paddingTop={1}>
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

            {cargando === false && (
              <Grid container pt={1}>
                <CatedraLista
                  filas={filas}
                  filasxpagina={filasxpagina}
                  pagina={pagina}
                  paginacion={paginacion}
                  resultados={resultados}
                  actualizarpagina={CambioPagina}
                  actualizarfilas={CambioFPP}
                  refrescar={Refrescar}
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
              />
            </div>
          </Grid>
        </CardContent>
      </CardMainPage>
    </>
  );
}
