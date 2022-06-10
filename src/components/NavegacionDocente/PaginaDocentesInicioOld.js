import React, { useEffect } from "react";
//MUI
import { CardContent, Grid, CardHeader } from "@mui/material";
import { Divider, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
//React router dom
import { useNavigate } from "react-router-dom";
//React redux
import { useDispatch, useSelector } from "react-redux";
//Componentes propios
import CatedrasUsuarioLista from "./CatedrasUsuarioLista";
import MateriasContenedor from "./MateriasContenedor";
import CursadasContenedor from "./CursadasContenedor";
import { CardMain } from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";
import { actualizarTitulo } from "../../store/slices/menuSlice";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import { GridBreadCrumbs } from "../Material UI - Componentes Modificados/ComponentesBreadCrumbs/ComponentesBreadCrumbs";
import BreadCrumbs from "../BreadCrumbs";

export default function PaginaDocentesInicio(props) {
  //Recupero token
  const { token } = useSelector((state) => state.login);
  //Recupero informacion del usuario
  const { user } = useSelector((state) => state.user);
  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();
  //Indica que subpagina cargar(Catedras = 1, materias = 3, cursadas = 3)
  const [salto, setSalto] = React.useState("1");

  //Variable para el redireccinoamiento (react router)
  const navegar = useNavigate();

  //Variables de estado para el manejo de la paginacion
  const [datosconsulta, setDC] = React.useState({}); //datos del buscar
  const [filas, setFilas] = React.useState({}); // datos a mostrar
  const [filasxpagina, setFXP] = React.useState(1); //filas x pagina
  const [pagina, setPagina] = React.useState(1); //pagina actual
  const [paginacion, setPaginacion] = React.useState(); // cantidad de paginas a mostrar
  const [resultados, setResultado] = React.useState(); //cantidad de resultados devuelto en la consulta
  const [cargando, setCargando] = React.useState(true); //Espera al consultar

  /**
   * Para realizar consultas
   */
  async function consultas(data, cadena) {
    const response = await fetch(cadena, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        // Authorization: "Bearer " + localStorage.getItem("tkn"),
      },
    });

    return response.json();
  }

  /** */
  function Refrescar() {
    setCargando(true);
    consultas(datosconsulta, "http://127.0.0.1:8000/api/listarcatus")
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

  /** */
  // function BuscarCat(parametro) {
  //   parametro.Offset = 0;
  //   parametro.Limite = filasxpagina;

  //   setDC(parametro);
  //   setCargando(true);
  //   consultas(parametro, "http://127.0.0.1:8000/api/listarcatus")
  //     .then((response) => {
  //       setFilas(response);

  //       if (response.res.length > 0) {
  //         setPaginacion(response.res[0].filas);
  //         setResultado(response.res[0].resultados);

  //         setPagina(1);
  //       }

  //       setCargando(false);
  //     })
  //     .catch((error) => {
  //       console.log("Error de conexión" + error);
  //       navegar("/registrarse");
  //     });
  // }

  /** */
  function CambioPagina(pag) {
    var datos = datosconsulta;
    datos.Offset = pag * filasxpagina - filasxpagina;
    datos.Limite = filasxpagina;

    setDC(datos);
    setCargando(true);
    consultas(datosconsulta, "http://127.0.0.1:8000/api/listarcatus")
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

    consultas(datos, "http://127.0.0.1:8000/api/listarcatus")
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

  //Carga del listado de catedras del usuario
  useEffect(() => {
    var data = {
      Catedra: "",
      Bajas: "B",
      Offset: 0,
      Limite: filasxpagina,
    };

    setDC(data);

    //Lista las catedras del usuario
    consultas(data, "http://127.0.0.1:8000/api/listarcatus")
      .then((response) => {
        if (response.message === "Unauthenticated.") {
          navegar("/");
          console.log(response);
        }

        setFilas(response);

        if (response.res === undefined) {
          setCargando(true);
        } else {
          /*if (response.res.length>0){
         // setPaginacion(response.res[0].filas);
       // setResultado(response.res[0].resultados);
               
       // setPagina(1);
        }*/
          setCargando(false);
        }
      })
      .catch((error) => {
        console.log("Error de conexión en useefect" + error);
        navegar("/");
      });

    //Actualiza el titulo al montar la pagina
    dispatch(actualizarTitulo("Seleccione la catedra"));
  }, []);

  //Actualiza el titulo al desmontar la pagina
  useEffect(() => {
    return () => {
      dispatch(actualizarTitulo(""));
    };
  }, []);

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <GridBreadCrumbs container>
          <BreadCrumbs />
        </GridBreadCrumbs>
      </Grid>

      <Grid item xs={12}>
        <CardMainPage
          // sx={{
          //   backgroundColor: "rgba(0, 0, 0, 0.000001)",
          // }}
          icon="assured_workload"
          title="Mis catedras"
          bgColorIcon="cyan.main300"
        >
          {/* <CardHeader title={<Typography variant="h5">Mis catedras</Typography>} /> */}
          <Divider />
          <CardContent>
            <Grid container>
              {cargando === true && (
                <Grid container>
                  <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                    <LinearProgress color="inherit" />
                  </Stack>
                </Grid>
              )}
              {/* Catedras */}
              {cargando === false && salto === "1" && (
                <Grid item xs={12} paddingX={2} sx={{ overflowX: "auto" }}>
                  <Grid
                    container
                    justifyContent="end"
                    sx={{ overflowX: "auto" }}
                  >
                    <Grid item xs={12} sx={{ overflowX: "auto" }}>
                      <CatedrasUsuarioLista
                        filas={filas}
                        filasxpagina={filasxpagina}
                        pagina={pagina}
                        paginacion={paginacion}
                        resultados={resultados}
                        actualizarpagina={CambioPagina}
                        actualizarfilas={CambioFPP}
                        refrescar={Refrescar}
                        setSalto={setSalto}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {/* Materias */}
              {cargando === false && salto === "2" && (
                <Grid item xs={12} paddingX={2} sx={{ overflowX: "auto" }}>
                  <Grid
                    container
                    justifyContent="end"
                    sx={{ overflowX: "auto" }}
                  >
                    <Grid item xs={12} sx={{ overflowX: "auto" }}>
                      <MateriasContenedor setSalto={setSalto} />
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {/* Cursadas */}
              {cargando === false && salto === "3" && (
                <Grid item xs={12} paddingX={2} sx={{ overflowX: "auto" }}>
                  <Grid
                    container
                    justifyContent="end"
                    sx={{ overflowX: "auto" }}
                  >
                    <Grid item xs={12} sx={{ overflowX: "auto" }}>
                      <CursadasContenedor setSalto={setSalto} />
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </CardMainPage>
      </Grid>
    </Grid>
  );
}
