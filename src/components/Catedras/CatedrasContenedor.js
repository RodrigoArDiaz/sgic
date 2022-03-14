import React from "react";
import {
  Box,
  CardContent,
  CardHeader,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";
import CatedraLista from "./CatedraLista";
import { CrearCatedra } from "./CrearCatedra";
import BuscarCatedras from "./BuscarCatedras";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

import { useNavigate } from "react-router-dom";
import SnackMensajes from "./SnackMensajes";
import { CardMain } from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";

export default function CatedrasContenedor() {
  const navegar = useNavigate();

  const [datosconsulta, setDC] = React.useState({}); //datos del buscar
  const [filas, setFilas] = React.useState({}); // datos a mostrar
  const [filasxpagina, setFXP] = React.useState(1); //filas x pagina
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
        Authorization: "Bearer " + localStorage.getItem("tkn"),
      },
    });

    return response.json();
  }

  function Refrescar() {
    setCargando(true);
    consultas(datosconsulta, "http://127.0.0.1:8000/api/buscarcatedras")
      .then((response) => {
        setFilas(response);
        setCargando(false);

        if (response.res.length > 0) {
          setPaginacion(response.res[0].filas);
          setResultado(response.res[0].resultados);
        }
      })
      .catch((error) => {
        console.log("Error de conexión" + error);
        navegar("/registrarse");
      });
  }

  function BuscarCat(parametro) {
    parametro.Offset = 0;
    parametro.Limite = filasxpagina;

    setDC(parametro);
    setCargando(true);
    consultas(parametro, "http://127.0.0.1:8000/api/buscarcatedras")
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
        console.log("Error de conexión" + error);
        navegar("/registrarse");
      });
  }

  function CambioPagina(pag) {
    var datos = datosconsulta;
    datos.Offset = pag * filasxpagina - filasxpagina;
    datos.Limite = filasxpagina;

    setDC(datos);
    setCargando(true);
    consultas(datosconsulta, "http://127.0.0.1:8000/api/buscarcatedras")
      .then((response) => {
        setFilas(response);
        setCargando(false);
      })
      .catch((error) => {
        console.log("Error de conexión" + error);
        navegar("/registrarse");
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

    consultas(datos, "http://127.0.0.1:8000/api/buscarcatedras")
      .then((response) => {
        setFilas(response);

        if (response.res.length > 0) {
          setPaginacion(response.res[0].filas);
          setResultado(response.res[0].resultados);
          setCargando(false);
        }
      })
      .catch((error) => {
        console.log("Error de conexión" + error);

        navegar("/registrarse");
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

    consultas(data, "http://127.0.0.1:8000/api/buscarcatedras")
      .then((response) => {
        if (response.message === "Unauthenticated.") {
          //console.log(response.message);
          navegar("/iniciar_sesion_super");
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
        console.log("Error de conexión en useefect" + error);
        navegar("/registrarse");
      });
  }, []);

  return (
    <CardMain>
      <CardHeader
        title={<Typography variant="h5">Gestión de Cátedras</Typography>}
      />
      <Divider />
      <CardContent>
        <Grid container>
          <Grid container direction="row-reverse">
            <Grid item xs={12} sm={6} md={3.5} lg={2.5} xl={2}>
              <Grid
                container
                paddingX={2}
                paddingY={1}
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
            <Grid
              item
              xs={12}
              sm={12}
              md={8.5}
              lg={9.5}
              xl={10}
              paddingY={1}
              paddingX={2}
            >
              <BuscarCatedras
                actualizar={BuscarCat}
                filasxpagina={filasxpagina}
              />
            </Grid>
          </Grid>

          {cargando === true && (
            <Grid item xs={12} paddingX={1}>
              {/* <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}> */}
              <Box sx={{ width: "100%" }} padding={2}>
                <LinearProgress />
              </Box>
              {/* </Stack> */}
            </Grid>
          )}
          {cargando === false && (
            <Grid container pt={2}>
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
            />{" "}
          </div>
        </Grid>
      </CardContent>
    </CardMain>
  );
}
