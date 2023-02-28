import React from "react";
import { useEffect } from "react";
import { useState } from "react";
//MUI
import { Avatar, Box, CardContent, Chip, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
//React router
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
//MUI - personalizados
import CardMainPage from "../../Material UI - Componentes Modificados/CardMainPage";
import { CardMain } from "../../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";
import { peticionInfoCursada } from "../../../api/alumnos/notasApi";
import { routes } from "../../../routes";
import InfoAlumno from "./InfoAlumno";

/*** Componente InfoCursadaContenedor ***/
export default function InfoCursadaContenedor(props) {
  //Recupero informacion de la cursada
  const { cursada } = useSelector((state) => state.cursada);
  //Recupero informacion de la materia
  const { materia } = useSelector((state) => state.materia);

  //Variable de estado de la peticion
  const [isLoading, setIsLoading] = useState(false);

  //
  const navegar = useNavigate();

  //
  const [infoCursada, setInfoCursada] = useState([]);

  //Peticion de buscar
  const handleBuscarInfoCursada = async () => {
    setIsLoading(true);

    //Realizo peticon
    try {
      const respuesta = await peticionInfoCursada(cursada.IdCursada, null);

      console.log(respuesta.data.res[0]);
      setInfoCursada(respuesta.data.res[0]);
    } catch (error) {
      if (error.response && error.response.status == 401) {
        //Sesion caducada (sin autorización)
        navegar(routes.iniciarSesion);
      }
    }
    setIsLoading(false);
  };

  //Carga correcciones
  useEffect(() => {
    handleBuscarInfoCursada();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {/* Fecha inicio y fecha fin */}
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Grid container columnSpacing={3}>
              <Grid item xs={6}>
                <CardMainPage visibleHeader={false}>
                  <CardContent>
                    <Box display="flex" flexDirection="row">
                      <Avatar
                        sx={{
                          bgcolor: "secondary.main50",
                          color: "secondary.main",
                        }}
                      >
                        <CalendarTodayIcon fontSize="60" />
                      </Avatar>
                      <Box
                        width="70%"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            opacity: "0.75",
                          }}
                        >
                          Fecha Inicio
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="h6"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {cursada.FechaInicio}
                    </Typography>
                  </CardContent>
                </CardMainPage>
              </Grid>

              <Grid item xs={6}>
                <CardMainPage visibleHeader={false}>
                  <CardContent>
                    <Box display="flex" flexDirection="row">
                      <Avatar
                        sx={{
                          bgcolor: "secondary.main50",
                          color: "secondary.main",
                        }}
                      >
                        <CalendarTodayIcon fontSize="60" />
                      </Avatar>

                      <Box
                        width="70%"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            opacity: "0.75",
                          }}
                        >
                          Fecha Fin
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="h6"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {cursada.FechaFin}
                    </Typography>
                  </CardContent>
                </CardMainPage>
              </Grid>
            </Grid>
          </Grid>

          {/* Estado Cursada */}
          <Grid item xs={6} sm={3} md={4} lg={1.5}>
            <CardMainPage visibleHeader={false}>
              <Box textAlign="center" paddingTop={3} paddingBottom={3}>
                {infoCursada.Estado != undefined && (
                  <Chip
                    label={infoCursada.Estado == "A" ? "Activo" : "Baja"}
                    variant="outlined"
                    color={infoCursada.Estado == "A" ? "success" : "danger"}
                  />
                )}
                <Typography
                  marginTop={1}
                  variant="subtitle2"
                  sx={{ opacity: "0.75" }}
                >
                  Estado cursada
                </Typography>
              </Box>
            </CardMainPage>
          </Grid>

          {/* Permite grupo */}
          <Grid item xs={6} sm={3} md={4} lg={1.5}>
            <CardMainPage visibleHeader={false}>
              <Box textAlign="center" paddingTop={3} paddingBottom={3}>
                <Chip
                  label={infoCursada.PermiteGrupos == "S" ? "SI" : "NO"}
                  variant="outlined"
                  color={infoCursada.PermiteGrupos == "S" ? "success" : "error"}
                  icon={
                    infoCursada.PermiteGrupos == "S" ? (
                      <CheckCircle />
                    ) : (
                      <Cancel />
                    )
                  }
                />
                <Typography
                  marginTop={1}
                  variant="subtitle2"
                  sx={{ opacity: "0.75" }}
                >
                  Permite grupos
                </Typography>
              </Box>
            </CardMainPage>
          </Grid>

          {/* Estadisticas */}
          <Grid item xs={6} sm={4.5} md={4} lg={2}>
            <CardMainPage visibleHeader={false}>
              <Grid container>
                <Grid item xs={12} paddingX={2} sx={{ overflowX: "auto" }}>
                  <Grid
                    container
                    justifyContent="end"
                    sx={{ overflowX: "auto" }}
                  >
                    <Grid item xs={12} sx={{ overflowX: "auto" }}>
                      <CardMain
                        sx={{
                          border: "none",
                        }}
                      >
                        <Box paddingY={1.4}>
                          <Grid
                            container
                            justifyContent="space-between"
                            // rowGap={2}
                          >
                            {/* Cantidad de inscriptos */}
                            <Grid
                              item
                              xs={5.5}
                              textAlign="center"
                              paddingTop={2}
                              paddingBottom={2}
                              sx={{
                                borderRadius: "10px",
                                border: "1px solid",
                                borderColor: "secondary.light100",
                              }}
                            >
                              <Typography variant="h5">
                                {infoCursada.CantidadIns}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                sx={{ opacity: "0.75" }}
                              >
                                Inscriptos
                              </Typography>
                            </Grid>

                            {/* Cantidad de prácticos */}
                            <Grid
                              item
                              xs={5.5}
                              textAlign="center"
                              paddingTop={2}
                              paddingBottom={2}
                              sx={{
                                borderRadius: "10px",
                                border: "1px solid",
                                borderColor: "secondary.light100",
                              }}
                            >
                              <Typography variant="h5">
                                {infoCursada.CantidadP}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                sx={{ opacity: "0.75" }}
                              >
                                Prácticos
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </CardMain>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardMainPage>
          </Grid>

          {/* Estadisticas */}
          <Grid item xs={6} sm={4.5} md={4} lg={2}>
            <CardMainPage visibleHeader={false}>
              <Grid container>
                <Grid item xs={12} paddingX={2} sx={{ overflowX: "auto" }}>
                  <Grid
                    container
                    justifyContent="end"
                    sx={{ overflowX: "auto" }}
                  >
                    <Grid item xs={12} sx={{ overflowX: "auto" }}>
                      <CardMain
                        sx={{
                          border: "none",
                        }}
                      >
                        <Box paddingY={1.4}>
                          <Grid container justifyContent="space-between" s>
                            {/* Cantidad de exámenes: */}
                            <Grid
                              item
                              xs={5.5}
                              textAlign="center"
                              paddingTop={2}
                              paddingBottom={2}
                              sx={{
                                borderRadius: "10px",
                                border: "1px solid",
                                borderColor: "secondary.light100",
                              }}
                            >
                              <Typography variant="h5">
                                {infoCursada.CantidadE}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                sx={{ opacity: "0.75" }}
                              >
                                Exámenes
                              </Typography>
                            </Grid>

                            {/* Cantidad de grupos: */}
                            <Grid
                              item
                              xs={5.5}
                              textAlign="center"
                              paddingTop={2}
                              paddingBottom={2}
                              sx={{
                                borderRadius: "10px",
                                border: "1px solid",
                                borderColor: "secondary.light100",
                              }}
                            >
                              <Typography variant="h5">
                                {infoCursada.CantidadG}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                sx={{ opacity: "0.75" }}
                              >
                                Grupos
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </CardMain>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardMainPage>
          </Grid>
        </Grid>
      </Grid>

      {/* Info alumno */}
      <Grid item xs={12}>
        <InfoAlumno />
      </Grid>
    </Grid>
  );
}
