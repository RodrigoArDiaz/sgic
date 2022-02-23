import React, { useEffect, useState } from "react";
//MUI
import {
  CardContent,
  CardHeader,
  Divider,
  LinearProgress,
  Skeleton,
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
  filasPorPagina: 10,
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
    <CardMain>
      <CardHeader
        title={<Typography variant="h5">Gestion Docentes</Typography>}
      />
      <Divider />
      <CardContent>
        <Grid container>
          <Grid container direction="row-reverse">
            <Grid item xs={12} sm={6} md={3.5} lg={2.5} xl={2}>
              <Grid
                container
                paddingX={2}
                paddingY={1}
                justifyContent="flex-end"
              >
                <Grid item xs={12}>
                  <CrearDocente />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={8.5}
              lg={9.5}
              xl={10}
              paddingY={1}
              paddingX={2}
            >
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
            <Grid item xs={12} paddingX={1}>
              <Box sx={{ width: "100%" }} padding={2}>
                <LinearProgress />
                {/* <Typography component="div" paddingBottom={3}>
                  <Skeleton />
                </Typography>
                <Divider />

                <Typography component="div" paddingY={3}>
                  <Skeleton />
                </Typography>
                <Divider />

                <Typography component="div" paddingY={3}>
                  <Skeleton />
                </Typography>
                <Divider />

                <Typography component="div" paddingY={3}>
                  <Skeleton />
                </Typography>
                <Divider />

                <Typography component="div" paddingY={3}>
                  <Skeleton />
                </Typography>
                <Divider />

                <Typography component="div" paddingY={3}>
                  <Skeleton />
                </Typography>
                <Divider />

                <Typography component="div" paddingY={3}>
                  <Skeleton />
                </Typography>
                <Divider /> */}
              </Box>
            </Grid>
          ) : (
            <Grid item xs={12} paddingX={2} sx={{ overflowX: "auto" }}>
              <Grid container justifyContent="end" sx={{ overflowX: "auto" }}>
                <Grid item xs={12} sx={{ overflowX: "auto" }}>
                  <DocentesLista
                    docentes={docentes}
                    paginacion={paginacion}
                    actualizaDatosPaginacion={actualizaDatosPaginacion}
                    handleRefrescarPagina={handleRefrescarPagina}
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
