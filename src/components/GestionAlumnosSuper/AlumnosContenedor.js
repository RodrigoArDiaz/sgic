import React from "react";
//MUI
import { CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
//React router dom
import { useNavigate } from "react-router-dom";
//
import AlumnosLista from "./AlumnosLista";
import BuscarAlumnos from "./BuscarAlumnos";
import SnackMensajes from "../../components/GestionCatedrasSuper/SnackMensajes";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import { MoonLoader } from "react-spinners";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../styles/EstilosSpinners";

/*** Componente AlumnosContenedor ***/
export default function AlumnosContenedor() {
  const navegar = useNavigate();

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

  async function consultas(data, cadena) {
    const response = await fetch(cadena, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.json();
  }

  function Refrescar() {
    setCargando(true);
    consultas(datosconsulta, endpoints.buscarAlumnos)
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

  function BuscarAl(parametro) {
    parametro.Offset = 0;
    parametro.Limite = filasxpagina;

    setDC(parametro);
    setCargando(true);
    consultas(parametro, endpoints.buscarAlumnos)
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

  function CambioPagina(pag) {
    var datos = datosconsulta;
    datos.Offset = pag * filasxpagina - filasxpagina;
    datos.Limite = filasxpagina;

    setDC(datos);
    setCargando(true);
    consultas(datosconsulta, endpoints.buscarAlumnos)
      .then((response) => {
        setFilas(response);
        setCargando(false);
      })
      .catch((error) => {
        navegar(routes.iniciarSesion);
      });

    setPagina(pag);
  }

  function CambioFPP(pag) {
    setFXP(pag);
    var datos = datosconsulta;
    datos.Offset = 0;
    datos.Limite = pag;

    setDC(datos);

    setCargando(true);

    consultas(datos, endpoints.buscarAlumnos)
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
      pUs: "",
      pMail: "",
      pDoc: "",
      pNom: "",
      pAp: "",
      pLib: "",
      piB: "B",
      Offset: 0,
      Limite: filasxpagina,
    };

    setDC(data);

    consultas(data, endpoints.buscarAlumnos)
      .then((response) => {
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
          Gestión alumnos
        </Typography>
      </Box>
      <CardMainPage visibleHeader={false}>
        <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Grid container>
            <Grid container>
              <Grid item paddingBottom={1} paddingX={2}>
                <BuscarAlumnos
                  actualizar={BuscarAl}
                  filasxpagina={filasxpagina}
                />
              </Grid>
            </Grid>

            {cargando === true && (
              <Grid container paddingTop={3}>
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
                <AlumnosLista
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
              />{" "}
            </div>
          </Grid>
        </CardContent>
      </CardMainPage>
    </>
  );
}
