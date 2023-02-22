import React from "react";
//MUI
import { Box, CardContent } from "@mui/material";
import { Grid } from "@mui/material";
import UsuariosLista from "./UsuariosLista";
//
import { useNavigate } from "react-router-dom";
import SnackMensajes from "./SnackMensajes";
import BuscarUsuarios from "./BuscarUsuarios";
import { MoonLoader } from "react-spinners";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../styles/EstilosSpinners";

/*** Componente CatedrasUsuariosContenedor ***/
export default function CatedrasUsuariosContenedor(props) {
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
    consultas(datosconsulta, endpoints.buscarUsNoCat)
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

  function BuscarUsCat(parametro) {
    parametro.Offset = 0;
    parametro.Limite = filasxpagina;

    setDC(parametro);
    setCargando(true);
    consultas(parametro, endpoints.buscarUsNoCat)
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
    consultas(datosconsulta, endpoints.buscarUsNoCat)
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

    consultas(datos, endpoints.buscarUsNoCat)
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
      piB: "B",
      Offset: 0,
      Limite: filasxpagina,
      pidCa: props.idcatedra,
    };

    setDC(data);

    consultas(data, endpoints.buscarUsNoCat)
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
      <CardContent sx={{ paddingX: 0 }}>
        <Grid container>
          <Grid container paddingX={3} paddingBottom={2}>
            <Grid item xs={12}>
              <BuscarUsuarios
                actualizar={BuscarUsCat}
                filasxpagina={filasxpagina}
                idcatedra={props.idcatedra}
              />
            </Grid>
          </Grid>

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
              <UsuariosLista
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
      </CardContent>
    </>
  );
}
