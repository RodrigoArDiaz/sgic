import React, { useEffect } from "react";
//MUI
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
//React router
import { useNavigate } from "react-router-dom";
//react redux
import { useDispatch, useSelector } from "react-redux";
import { actualizarTitulo } from "../../store/slices/menuSlice";
//Componentes propios
import MateriasLista from "./MateriasLista";
import BuscarMaterias from "./BuscarMaterias";

export default function MateriasContenedor(props) {
  //Redireccionamiento con reac router
  const navegar = useNavigate();
  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();
  //Se recupera los datos de la catedra seleccionada
  const { idCatedra } = useSelector((state) => state.catedra);

  //Paginación
  const [datosconsulta, setDC] = React.useState({}); //datos del buscar
  const [filas, setFilas] = React.useState({}); // datos a mostrar
  const [filasxpagina, setFXP] = React.useState(1); //filas x pagina
  const [pagina, setPagina] = React.useState(1); //pagina actual
  const [paginacion, setPaginacion] = React.useState(); // cantidad de paginas a mostrar
  const [resultados, setResultado] = React.useState(); //cantidad de resultados devuelto en la consulta
  const [cargando, setCargando] = React.useState(true); //Espera al consultar

  /** */
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

  /** */
  function Refrescar() {
    setCargando(true);
    consultas(datosconsulta, "http://127.0.0.1:8000/api/buscarmateriascat")
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
  function BuscarMat(parametro) {
    parametro.Offset = 0;
    parametro.Limite = filasxpagina;
    parametro.pidCa = idCatedra;

    setDC(parametro);
    setCargando(true);
    consultas(parametro, "http://127.0.0.1:8000/api/buscarmateriascat")
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
    consultas(datosconsulta, "http://127.0.0.1:8000/api/buscarmateriascat")
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

    consultas(datos, "http://127.0.0.1:8000/api/buscarmateriascat")
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

  /**
   * Se lista las materias de la catedra
   */
  React.useEffect(() => {
    var data = {
      pMat: "",
      piB: "A",
      Offset: 0,
      Limite: filasxpagina,
      pidCa: idCatedra,
    };

    setDC(data);

    consultas(data, "http://127.0.0.1:8000/api/buscarmateriascat")
      .then((response) => {
        setFilas(response);
        //console.log(response) ;

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
        navegar("/");
      });
  }, []);

  /**
   * Actualiza el titulo al montar el componente
   */
  useEffect(() => {
    dispatch(actualizarTitulo("Seleccione la materia"));
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
      <Grid container pt={2} justifyContent="flex-end" spacing={8}>
        <Grid item xs={12}>
          <BuscarMaterias actualizar={BuscarMat} filasxpagina={filasxpagina} />
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
          <MateriasLista
            filas={filas}
            filasxpagina={filasxpagina}
            pagina={pagina}
            paginacion={paginacion}
            resultados={resultados}
            actualizarpagina={CambioPagina}
            actualizarfilas={CambioFPP}
            refrescar={Refrescar}
            setSalto={props.setSalto}
          />
        </Grid>
      )}

      <Grid container pt={2}>
        <Button
          onClick={() => {
            props.setSalto("1");
          }}
        >
          VOLVER
        </Button>
      </Grid>
    </Paper>
  );
}
