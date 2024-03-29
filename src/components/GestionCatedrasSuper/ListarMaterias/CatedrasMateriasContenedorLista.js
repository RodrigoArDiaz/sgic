import React from "react";
//MUI
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
//
import { useNavigate } from "react-router-dom";
import SnackMensajes from "../SnackMensajes";
import MateriasListaListar from "./MateriasListaListar";
import { MoonLoader } from "react-spinners";
import { endpoints } from "../../../api/endpoints";
import { routes } from "../../../routes";
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../../styles/EstilosSpinners";

/*** Componente CatedrasMateriasContenedorLista ***/
export default function CatedrasMateriasContenedorLista(props) {
  //Recupero token
  const token = localStorage.getItem("tkn");

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
    //Adjunto token
    data = { ...data, ...{ token: token } };

    const response = await fetch(cadena, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  }

  function Refrescar() {
    setCargando(true);
    consultas(datosconsulta, endpoints.listarMaterias)
      .then((response) => {
        setFilas(response);
        setCargando(false);
      })
      .catch((error) => {
        // navegar("/registrarse");
        navegar(routes.iniciarSesion);
      });
  }

  function BuscarMat(parametro) {
    parametro.Offset = 0;
    parametro.Limite = filasxpagina;

    setDC(parametro);
    setCargando(true);
    consultas(parametro, endpoints.buscarMaterias)
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
        // navegar("/registrarse");
        navegar(routes.iniciarSesion);
      });
  }

  function CambioPagina(pag) {
    var datos = datosconsulta;
    datos.Offset = pag * filasxpagina - filasxpagina;
    datos.Limite = filasxpagina;

    setDC(datos);
    setCargando(true);
    consultas(datosconsulta, endpoints.buscarMaterias)
      .then((response) => {
        setFilas(response);
        setCargando(false);
      })
      .catch((error) => {
        // navegar("/registrarse");
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

    consultas(datos, endpoints.buscarMaterias)
      .then((response) => {
        setFilas(response);

        if (response.res.length > 0) {
          setPaginacion(response.res[0].filas);
          setResultado(response.res[0].resultados);
          setCargando(false);
        }
      })
      .catch((error) => {
        // navegar("/registrarse");
        navegar(routes.iniciarSesion);
      });
  }

  React.useEffect(() => {
    var data = {
      pidCa: props.idcatedra,
    };

    setDC(data);

    consultas(data, endpoints.listarMaterias)
      .then((response) => {
        setFilas(response);

        if (response.res === undefined) {
          setCargando(false);
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
        // navegar("/registrarse");
        navegar(routes.iniciarSesion);
      });
  }, []);

  return (
    <Grid container>
      {cargando === true && (
        <Grid container paddingTop={2}>
          <Grid item xs={12}>
            <Box component="div" display="flex" justifyContent="center">
              <MoonLoader color={colorMainSpinner} size={sizeMainSpinner} />
            </Box>
          </Grid>
        </Grid>
      )}
      {cargando === false && (
        <Grid item xs={12}>
          <MateriasListaListar
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
            idcatedra={props.idcatedra}
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
  );
}
