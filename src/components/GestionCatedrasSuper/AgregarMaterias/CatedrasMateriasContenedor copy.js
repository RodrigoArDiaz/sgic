import React, { useState } from "react";
//MUI
import { CardContent, Grid } from "@mui/material";
import { Box } from "@mui/material";
//React router dom
import { useNavigate } from "react-router-dom";
//
import SnackMensajes from "../SnackMensajes";
import MateriasLista from "./MateriasLista";
import BuscarMaterias from "../BuscarMaterias";
import { MoonLoader } from "react-spinners";
import { endpoints } from "../../../api/endpoints";
import { routes } from "../../../routes";
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../../styles/EstilosSpinners";
import * as Responses from "../../Responses";

/*** Componente CatedrasMateriasContenedor ***/
export default function CatedrasMateriasContenedor(props) {
  //Recupero token
  const token = localStorage.getItem("tkn");

  const navegar = useNavigate();

  const [datosconsulta, setDC] = useState({}); //datos del buscar
  const [filas, setFilas] = useState({}); // datos a mostrar
  const [filasxpagina, setFXP] = useState(10); //filas x pagina
  const [pagina, setPagina] = useState(1); //pagina actual
  const [paginacion, setPaginacion] = useState(); // cantidad de paginas a mostrar
  const [resultados, setResultado] = useState(); //cantidad de resultados devuelto en la consulta
  const [cargando, setCargando] = useState(true); //Espera al consultar
  const [mensajeFeedBack, setMensajeFeedBack] = useState("");

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

  //Refrescar
  function Refrescar() {
    setCargando(true);
    Responses.consultas(datosconsulta, endpoints.buscarMaterias)
      .then((response) => {
        console.log(response);
        console.log(Responses.status);
        setFilas(response);
        setCargando(false);

        if (response.res.length > 0) {
          setPaginacion(response.res[0].filas);
          setResultado(response.res[0].resultados);
        }
      })
      .catch((error) => {
        console.log(error.response);
        // navegar(routes.iniciarSesion);
      });
  }

  //Buscar materias
  function BuscarMat(parametro) {
    parametro.Offset = 0;
    parametro.Limite = filasxpagina;

    setDC(parametro);
    setCargando(true);
    Responses.consultas(parametro, endpoints.buscarMaterias)
      .then((response) => {
        console.log(response);
        console.log(Responses.status);

        setFilas(response);

        // if (response.res === undefined) {
        //   setCargando(false);
        // } else if (response.res.length > 0) {
        //   setPaginacion(response.res[0].filas);
        //   setResultado(response.res[0].resultados);
        //   setPagina(1);
        // }

        // setCargando(false);

        if (Responses.status == 200) {
          if (response.res === undefined) {
            setCargando(false);
          } else if (response.res.length > 0) {
            setPaginacion(response.res[0].filas);
            setResultado(response.res[0].resultados);
            setPagina(1);
          }
        } else {
          switch (Responses.status) {
            case 460:
              setMensajeFeedBack(response.Error);
              break;

            case 401:
              navegar(routes.iniciarSesion);
              break;

            case 500:
              navegar(routes.error);
              break;
          }
        }

        setCargando(false);
      })
      .catch((error) => {
        console.log("catch error");
        // navegar(routes.iniciarSesion);
        setCargando(false);
      });
  }

  //Cambio pagina
  function CambioPagina(pag) {
    var datos = datosconsulta;
    datos.Offset = pag * filasxpagina - filasxpagina;
    datos.Limite = filasxpagina;

    setDC(datos);
    setCargando(true);
    Responses.consultas(datosconsulta, endpoints.buscarMaterias)
      .then((response) => {
        console.log(response);
        console.log(Responses.status);
        setFilas(response);
        setCargando(false);
      })
      .catch((error) => {
        console.log(error.response);
        // navegar(routes.iniciarSesion);
      });

    setPagina(pag);
  }

  //Cambio FPP
  function CambioFPP(pag) {
    setFXP(pag);
    var datos = datosconsulta;
    datos.Offset = 0;
    datos.Limite = pag;

    setDC(datos);

    setCargando(true);

    Responses.consultas(datos, endpoints.buscarMaterias)
      .then((response) => {
        console.log(response);
        console.log(Responses.status);
        setFilas(response);

        if (response.res.length > 0) {
          setPaginacion(response.res[0].filas);
          setResultado(response.res[0].resultados);
          setCargando(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
        // navegar(routes.iniciarSesion);
      });
  }

  //Peticion al renderizar elemento
  React.useEffect(() => {
    var data = {
      pMat: "",
      pPla: "",
      pCar: "",
      piB: "B",
      Offset: 0,
      Limite: filasxpagina,
      pidCat: props.idcatedra,
    };

    setDC(data);

    Responses.consultas(data, endpoints.buscarMaterias)
      .then((response) => {
        console.log(response);
        console.log(Responses.status);
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
        console.log(error.response);
        // navegar(routes.iniciarSesion);
      });
  }, []);

  return (
    <CardContent sx={{ px: 0 }}>
      <Grid container>
        <Grid container>
          <Grid item paddingBottom={2} paddingX={2}>
            <BuscarMaterias
              actualizar={BuscarMat}
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
            <MateriasLista
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
              mensajeFeedBack={mensajeFeedBack}
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
  );
}
