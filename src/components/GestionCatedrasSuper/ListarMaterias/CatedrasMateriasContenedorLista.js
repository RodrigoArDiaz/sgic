import React from "react";
//MUI
import { CardContent } from "@mui/material";
import { Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";
//
import { useNavigate } from "react-router-dom";
import SnackMensajes from "../SnackMensajes";
import MateriasListaListar from "./MateriasListaListar";
import { CardMain } from "../../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";
import { MoonLoader } from "react-spinners";
import { teal } from "@mui/material/colors";

export default function CatedrasMateriasContenedorLista(props) {
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
      },
    });

    return response.json();
  }

  function Refrescar() {
    setCargando(true);
    consultas(datosconsulta, "http://127.0.0.1:8000/api/listarmaterias")
      .then((response) => {
        setFilas(response);
        setCargando(false);
      })
      .catch((error) => {
        console.log("Error de conexión" + error);
        navegar("/registrarse");
      });
  }

  function BuscarMat(parametro) {
    parametro.Offset = 0;
    parametro.Limite = filasxpagina;

    setDC(parametro);
    setCargando(true);
    consultas(parametro, "http://127.0.0.1:8000/api/buscarmaterias")
      .then((response) => {
        setFilas(response);
        console.log(response);
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
    consultas(datosconsulta, "http://127.0.0.1:8000/api/buscarmaterias")
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

    consultas(datos, "http://127.0.0.1:8000/api/buscarmaterias")
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
      /*
      pMat:'',
      //pCSM:'',
      pPla:'',
      //pCSP:'',

           pCar:'',
        //   pCSC:'',

           piB:'B',
    Offset:0,
    Limite:filasxpagina,*/
      pidCa: props.idcatedra,
      //pidCa:props.idcatedra,
    };

    setDC(data);

    consultas(data, "http://127.0.0.1:8000/api/listarmaterias")
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
        console.log("Error de conexión" + error);
        navegar("/registrarse");
      });
  }, []);

  const color = teal[700];

  return (
    <Grid container>
      {cargando === true && (
        <Grid container paddingTop={2}>
          <Grid item xs={12}>
            <Box component="div" display="flex" justifyContent="center">
              <MoonLoader color={color} size={60} />
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
