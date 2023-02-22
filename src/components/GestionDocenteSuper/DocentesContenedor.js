import React, { useEffect, useState } from "react";
//MUI
import { CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { CrearDocente } from "./CrearDocente";
import DocentesLista from "./DocentesLista";
import BuscarDocentes from "./BuscarDocentes";
import { Box } from "@mui/material";
import { peticionBuscarDocente } from "../../api/super/gestionDocentesApi";
import { useSelector } from "react-redux";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../styles/EstilosSpinners";
import { MoonLoader } from "react-spinners";
import { PaginacionContext } from "./PaginacionContext";

/*** Componente DocentesContenedor ***/
export default function DocentesContenedor() {
  //Recupero token
  const { token } = useSelector((state) => state.login);

  //Guarda el resultado de la busqueda(por pagina)
  const [docentes, setDocentes] = useState([]);

  //Indica si mostrar el loader (o spinner)
  const [isLoading, setIsLoading] = useState(true);

  //Datos ingresados en la busqueda (necesarios para la paginacion)
  const [datosBusqueda, setDatosBusqueda] = useState({
    Apellidos: "",
    Nombres: "",
    Documento: "",
    Email: "",
    Bajas: true,
  });

  //Paginacion
  const [filasPorPagina, setFilasPorPagina] = useState(10);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);
  const [cantidadResultados, setCantidadResultados] = useState(0);

  //Indica si refrescar la pagina (para acciones de alta, baja , borrar)
  const [refrescarPagina, setRefrescarPagina] = useState(false);

  //Funcion para pasar a los hijos. Indica que se refresque la pagina
  const handleRefrescarPagina = () => setRefrescarPagina(!refrescarPagina);

  //Funcion para pasar a componentes hijos. Actualiza los datos de busqueda
  const modificarDatosBusqueda = (datos) => setDatosBusqueda(datos);

  //Peticion
  const buscarDocentePaginado = async (paginaActualParam) => {
    if (!paginaActualParam) paginaActualParam = paginaActual;
    //Acondiciono valores
    const pag = {
      Offset: (paginaActualParam - 1) * filasPorPagina,
      Limite: filasPorPagina,
    };
    //Concateno los valores de busqueda y los de paginacions
    const datosAEnviar = Object.assign(datosBusqueda, pag);

    //
    setIsLoading(true);

    try {
      const respuesta = await peticionBuscarDocente(datosAEnviar, token);
      //Respuesta OK
      const resultados = respuesta.data.data.resultados;
      //Actualizo valor de busqueda
      setDocentes(resultados);

      //
      setCantidadResultados(respuesta.data.data.filas);

      //Calculo del numero total de paginas
      setTotalPaginas(Math.ceil(respuesta.data.data.filas / filasPorPagina));
    } catch (error) {
      //Ocurrio un error
    }
    setIsLoading(false);
  };

  //Muestra lista de docentes al cargar la pagina
  useEffect(() => {
    buscarDocentePaginado();
  }, []);

  //Actualiza  pagina si se seleccina otra pagina
  useEffect(() => {
    buscarDocentePaginado();
  }, [paginaActual]);

  useEffect(() => {
    buscarDocentePaginado();
  }, [filasPorPagina]);

  useEffect(() => {
    buscarDocentePaginado(1);
  }, [datosBusqueda]);

  useEffect(() => {
    buscarDocentePaginado(1);
  }, [refrescarPagina]);

  //Funciones para pasar a los componentes hijos
  const peticionIniciada = () => {
    setIsLoading(true);
  };

  const peticionFinalizada = () => {
    setIsLoading(false);
  };

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
          Gestión docentes
        </Typography>
      </Box>
      <CardMainPage visibleHeader={false}>
        <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <PaginacionContext.Provider
            value={{
              filasPorPagina,
              totalPaginas,
              paginaActual,
              setPaginaActual,
              setFilasPorPagina,
              cantidadResultados,
            }}
          >
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
                      <CrearDocente />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item paddingBottom={1} paddingX={2} marginRight="auto">
                  <BuscarDocentes
                    peticionIniciada={peticionIniciada}
                    peticionFinalizada={peticionFinalizada}
                    modificarDatosBusqueda={modificarDatosBusqueda}
                  />
                </Grid>
              </Grid>

              {isLoading ? (
                <Grid container pt={1}>
                  <Grid item xs={12}>
                    <Box component="div" display="flex" justifyContent="center">
                      <MoonLoader
                        color={colorMainSpinner}
                        size={sizeMainSpinner}
                      />
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <Grid container pt={1}>
                  <DocentesLista
                    docentes={docentes}
                    handleRefrescarPagina={handleRefrescarPagina}
                  />
                </Grid>
              )}
            </Grid>
          </PaginacionContext.Provider>
        </CardContent>
      </CardMainPage>
    </>
  );
}
