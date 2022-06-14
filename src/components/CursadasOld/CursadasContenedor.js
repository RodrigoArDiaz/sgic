import React from "react";
//MUI
import { Paper, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
//router
import { useNavigate } from "react-router-dom";
//componentes propios
import SnackMensajes from "./SnackMensajes";
import CursadaLista from "./CursadaLista";
import { CrearCursada } from "./CrearCursada";
import BuscarCursadas from "./BuscarCursadas";
import { useSelector } from "react-redux";

export default function CursadasContenedor(props) {
  //
  const navegar = useNavigate();
  //Recupero informacion de la materia
  const { materia, idMateria } = useSelector((state) => state.materia);

  //paginacion
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

  /** */
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

  /** */
  function Refrescar() {
    setCargando(true);
    consultas(datosconsulta, "http://127.0.0.1:8000/api/buscarcursadas")
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
        navegar("/");
      });
  }

  /** */
  function BuscarCur(parametro) {
    parametro.Offset = 0;
    parametro.Limite = filasxpagina;

    setDC(parametro);
    setCargando(true);
    consultas(parametro, "http://127.0.0.1:8000/api/buscarcursadas")
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
        navegar("/");
      });
  }

  /** */
  function CambioPagina(pag) {
    var datos = datosconsulta;
    datos.Offset = pag * filasxpagina - filasxpagina;
    datos.Limite = filasxpagina;

    setDC(datos);
    setCargando(true);
    consultas(datosconsulta, "http://127.0.0.1:8000/api/buscarcursadas")
      .then((response) => {
        setFilas(response);
        setCargando(false);
      })
      .catch((error) => {
        console.log("Error de conexión" + error);
        navegar("/");
      });

    setPagina(pag);
  }

  /** */
  function CambioFPP(pag) {
    setFXP(pag);
    var datos = datosconsulta;
    datos.Offset = 0;
    datos.Limite = pag;

    setDC(datos);

    setCargando(true);

    consultas(datos, "http://127.0.0.1:8000/api/buscarcursadas")
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

        navegar("/");
      });
  }

  /** */
  React.useEffect(() => {
    var data = {
      pAn: "",
      pSem: "",
      piB: "B",
      Offset: 0,
      Limite: filasxpagina,
      pidMat: props.idmateria,
    };

    setDC(data);

    consultas(data, "http://127.0.0.1:8000/api/buscarcursadas")
      .then((response) => {
        if (response.message === "Unauthenticated.") {
          //console.log(response.message);
          navegar("/");
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
        navegar("/");
      });
  }, []);

  return (
    <Paper
      component="div"
      sx={{
        p: "4px 4px",
        // display: 'flex',
        alignItems: "center",
        width: "95%",
        mt: "10px",
        px: 2,
        pb: 3,
        // minHeight: "75vh",
      }}
      elevation={3}
    >
      <Grid container pt={1}>
        <Grid item xs={12}>
          <Typography variant="h4">Gestión de Cursadas - {materia}</Typography>
        </Grid>
      </Grid>

      <Grid container pt={2} justifyContent="flex-end" spacing={8}>
        <Grid item xs={9}>
          <BuscarCursadas actualizar={BuscarCur} filasxpagina={filasxpagina} />
        </Grid>

        <Grid sx={{ mt: 2 }} item xs={3}>
          <CrearCursada
            refrescar={Refrescar}
            abrir={setAbrir}
            mensaje={setMensaje}
            tipo={setTipo}
            idmateria={props.idmateria}
          />
        </Grid>
      </Grid>

      {cargando === true && (
        <Grid container pt={2}>
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="inherit" />
          </Stack>
        </Grid>
      )}
      {cargando === false && (
        <Grid container pt={2}>
          <CursadaLista
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
            Materia={props.Materia}
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
    </Paper>
  );
}
