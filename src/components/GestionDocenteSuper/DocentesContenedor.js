import React, { useEffect, useState } from "react";
//MUI
import {
  CardContent,
  CardHeader,
  Divider,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";
//
import { CardMain } from "../Material UI - Componentes Modificados/Componentes Inscripciones/ComponentesInscripciones";
import { CrearDocente } from "./CrearDocente";
import DocentesLista from "./DocentesLista";
import BuscarDocentes from "./BuscarDocentes";
import { Box } from "@mui/system";
import { peticionBuscarDocente } from "../../api/super/gestionDocentesApi";
import { useSelector } from "react-redux";

//Valor inicial de la paginacion
const paginacionInicial = {
  filasPorPagina: 4,
  totalPaginas: 0,
  paginaActual: 1,
};

export default function DocentesContenedor() {
  //Guarda el resultado de la busqueda(por pagina)
  const [docentes, setDocentes] = useState([]);
  //Indica si mostrar el loader (o spinner)
  const [isLoading, setIsLoading] = useState(false);
  //Datos ingresados en la busqueda (necesarios para la paginacion)
  const [datosBusqueda, setDatosBusqueda] = useState({});

  //Funcion para pasar a componentes hijos
  const modificarDatosBusqueda = (datos) => setDatosBusqueda(datos);

  //Para la paginacion
  const [paginacion, setPaginacion] = useState(paginacionInicial);
  //Actualiza
  const actualizaDatosPaginacion = (datos) => {
    //Actualizo dato de paginacion
    setPaginacion({ ...paginacion, ...datos });
    //Realizo peticion
    buscarDocentePaginado(datos.paginaActual);
  };
  //Recupero token
  const { token } = useSelector((state) => state.login);

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
    } catch (error) {
      //Ocurrio un error
    }
  };

  //
  const resultadoBusqueda = (resultadoBusq) => {
    setDocentes(resultadoBusq.docentes);
    setPaginacion({
      ...paginacion,
      totalPaginas: resultadoBusq.totalPaginas,
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
    <CardMain>
      <CardHeader
        title={<Typography variant="h5">Gestion Docentes</Typography>}
      />
      <Divider />
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Grid container justifyContent="end" paddingX={2} paddingY={1}>
              <Grid item xs={2.5} sm={4.5} md={3} lg={2.2} xl={1.8}>
                <CrearDocente />
              </Grid>
            </Grid>
          </Grid>

          <BuscarDocentes
            resultadoBusqueda={resultadoBusqueda}
            peticionIniciada={peticionIniciada}
            peticionFinalizada={peticionFinalizada}
            modificarDatosBusqueda={modificarDatosBusqueda}
            paginacion={paginacion}
          />

          {isLoading ? (
            <Grid item xs={12} paddingX={1}>
              <Box sx={{ width: "100%" }} padding={2}>
                <LinearProgress />
              </Box>
            </Grid>
          ) : (
            <Grid item xs={12} paddingX={1} sx={{ overflowX: "auto" }}>
              <Grid container justifyContent="end" sx={{ overflowX: "auto" }}>
                <Grid item xs={12} sx={{ overflowX: "auto" }}>
                  <DocentesLista
                    docentes={docentes}
                    paginacion={paginacion}
                    actualizaDatosPaginacion={actualizaDatosPaginacion}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </CardMain>
  );
}
