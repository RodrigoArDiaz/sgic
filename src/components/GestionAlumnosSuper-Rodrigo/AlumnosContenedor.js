import React, { useState, useEffect } from "react";
import {
  Grid,
  CardContent,
  CardHeader,
  Paper,
  Typography,
  Divider,
  LinearProgress,
} from "@mui/material";

import AlumnosLista from "./AlumnosLista";
import { CardMain } from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";
import BuscarAlumnos from "./BuscarAlumnos";
import { Box } from "@mui/material";

/**************** */
const alumnosPrueba = [
  {
    Apellidos: "Diaz",
    Nombres: "Rodrigo",
    Documento: "39359920",
    Libreta: "1410200",
    Email: "diazrodrigoar@gmail.com",
    Estado: "A",
    Usuario: "diazrod",
  },
  {
    Apellidos: "Luchesse",
    Nombres: "Augusto Gustavo",
    Documento: "20300100",
    Libreta: "14178900",
    Email: "gustavo@gmail.com",
    Estado: "B",
    Usuario: "lucheseaug",
  },
  {
    Apellidos: "Gomez",
    Nombres: "Juan Pedro",
    Documento: "20300100",
    Libreta: "1500000",
    Email: "gomez@gmail.com",
    Estado: "B",
    Usuario: "gomezjuan",
  },
  {
    Apellidos: "Diaz",
    Nombres: "Rodrigo",
    Documento: "39359920",
    Libreta: "10200100",
    Email: "diazrodrigoar@gmail.com",
    Estado: "A",
    Usuario: "diazrod",
  },
];
/****************/

//Valor inicial de la paginacion
const paginacionInicial = {
  filasPorPagina: 2,
  totalPaginas: 0,
  paginaActual: 1,
};

export default function AlumnosContenedor() {
  //Guarda el resultado de la busqueda(por pagina)
  const [alumnos, setAlumnos] = useState([]);
  //Indica si mostrar el loader (o spinner)
  const [isLoading, setIsLoading] = useState(false);
  //Datos ingresados en la busqueda (necesarios para la paginacion)
  const [datosBusqueda, setDatosBusqueda] = useState({});

  //Funciones para pasar a los componentes hijos
  const peticionIniciada = () => {
    setIsLoading(true);
  };
  const peticionFinalizada = () => {
    setIsLoading(false);
  };
  //Funcion para pasar a componentes hijos
  const modificarDatosBusqueda = (datos) => setDatosBusqueda(datos);

  //
  const resultadoBusqueda = (resultadoBusq) => {
    setAlumnos(resultadoBusq.alumnos);
    setPaginacion({
      ...paginacion,
      totalPaginas: resultadoBusq.totalPaginas,
    });
  };

  //Para la paginacion
  const [paginacion, setPaginacion] = useState(paginacionInicial);
  //Actualiza
  const actualizaDatosPaginacion = (datos) => {
    //Actualizo dato de paginacion
    setPaginacion({ ...paginacion, ...datos });
    //Realizo peticion
    buscarAlumnoPaginado(datos.paginaActual);
  };

  //
  const buscarAlumnoPaginado = (paginaActual) => {
    //Realizo peticion
    setAlumnos(
      alumnosPrueba.slice(
        paginaActual,
        paginaActual + paginacion.filasPorPagina
      )
    );
  };

  //Solo para pruebas
  useEffect(() => {
    // console.log(paginacion);
  }, [paginacion]);

  return (
    <CardMain>
      <CardHeader
        title={<Typography variant="h5">Gestión Alumnos</Typography>}
      />
      <Divider />
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Grid container justifyContent="end" paddingX={2} paddingY={1}>
              <Grid item xs={2.5} sm={4.5} md={3} lg={2.2} xl={1.8}></Grid>
            </Grid>
          </Grid>

          <BuscarAlumnos
            resultadoBusqueda={resultadoBusqueda}
            peticionIniciada={peticionIniciada}
            peticionFinalizada={peticionFinalizada}
            modificarDatosBusqueda={modificarDatosBusqueda}
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
                  <AlumnosLista
                    alumnos={alumnos}
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
