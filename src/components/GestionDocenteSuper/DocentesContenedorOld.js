import React, { useEffect, useState } from "react";
//MUI
import { CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";
//

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

//Valor inicial de la paginacion
const paginacionInicial = {
  filasPorPagina: 2,
  totalPaginas: 0,
  paginaActual: 1,
};

export default function DocentesContenedor() {
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
  //Indica si refrescar la pagina (para acciones de alta, baja , borrar)
  const [refrescarPagina, setRefrescarPagina] = useState(false);
  //Para la paginacion
  const [paginacion, setPaginacion] = useState(paginacionInicial);
  //Recupero token
  const { token } = useSelector((state) => state.login);

  //
  useEffect(() => {
    //Refresca la pagina actual, para reflejar los cambios
    buscarDocentePaginado(paginacion.paginaActual);
  }, [refrescarPagina]);

  //Funcion para pasar a los hijos. Indica que se refresque la pagina
  const handleRefrescarPagina = () => setRefrescarPagina(!refrescarPagina);

  //Funcion para pasar a componentes hijos. Actualiza los datos de busqueda
  const modificarDatosBusqueda = (datos) => setDatosBusqueda(datos);

  //Actualiza datos de paginacion
  const actualizaDatosPaginacion = (datos) => {
    //Actualizo dato de paginacion
    setPaginacion({ ...paginacion, ...datos });

    //Realizo peticion
    buscarDocentePaginado(datos.paginaActual);
  };

  //
  const buscarDocentePaginado = async (paginaActual) => {
    //Acondiciono valores
    const pag = {
      Offset: (paginaActual - 1) * paginacion.filasPorPagina,
      Limite: paginacion.filasPorPagina,
    };
    //Concateno los valores de busqueda y los de paginacions
    const datosAEnviar = Object.assign(datosBusqueda, pag);
    try {
      const respuesta = await peticionBuscarDocente(datosAEnviar, token);
      //Respuesta OK
      const resultados = respuesta.data.data.resultados;
      //Actualizo valor de busqueda
      setDocentes(resultados);

      //
      const totalFilas = respuesta.data.data.filas;
      //Calculo del numero total de paginas
      const totalPaginas = Math.ceil(totalFilas / paginacion.filasPorPagina);
      setPaginacion({
        ...paginacion,
        ...{
          totalPaginas: totalPaginas,
        },
      });
    } catch (error) {
      //Ocurrio un error
    }

    setIsLoading(false);
  };

  //Actualiza las variables de estado con los resultado de las busquedas
  const resultadoBusqueda = (resultadoBusq) => {
    setDocentes(resultadoBusq.docentes);
    setPaginacion({
      ...paginacion,
      ...{
        totalPaginas: resultadoBusq.totalPaginas,
        paginaActual: resultadoBusq.paginaActual,
      },
    });
  };

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
                  resultadoBusqueda={resultadoBusqueda}
                  peticionIniciada={peticionIniciada}
                  peticionFinalizada={peticionFinalizada}
                  modificarDatosBusqueda={modificarDatosBusqueda}
                  paginacion={paginacion}
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
                  paginacion={paginacion}
                  actualizaDatosPaginacion={actualizaDatosPaginacion}
                  handleRefrescarPagina={handleRefrescarPagina}
                />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </CardMainPage>
    </>
  );
}
