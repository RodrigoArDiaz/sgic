import React from "react";
//MUI
import {
  Avatar,
  Box,
  CardContent,
  Chip,
  Typography,
  Zoom,
} from "@mui/material";
import { Grid } from "@mui/material";
import { Cancel, CheckCircle, Info, InfoOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { blue } from "@mui/material/colors";
//React router
import { useNavigate } from "react-router-dom";
//Responses
import * as Responses from "../../Responses";
//Redux
import { useSelector } from "react-redux";
//MUI - personalizados
import CardMainPage from "../../Material UI - Componentes Modificados/CardMainPage";
import { CardMain } from "../../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";
import CardMainPageHeaderTransparent from "../../Material UI - Componentes Modificados/CardMainPageHeaderTransparent";
import DocentesCursadasContenedorEstadisticas from "./DocentesCursadasContenedorEstadisticas";
import { CircularProgressWithLabel } from "../../Material UI - Componentes Modificados/ComponentesEstadisticas/ComponentesEstadisticas";
//

const ChipCustom = React.forwardRef(function MyComponent(props, ref) {
  //  Spread the props to the underlying DOM element.
  return (
    <Chip {...props} ref={ref}>
      {props.children}
    </Chip>
  );
});

export default function DocentesCursadasContenedor(props) {
  //Recupero informacion de la cursada
  const { cursada } = useSelector((state) => state.cursada);
  //Recupero informacion de la materia
  const { materia } = useSelector((state) => state.materia);
  //
  const navegar = useNavigate();

  const [estado, setE] = React.useState(); //pagina actual
  const [pg, setPG] = React.useState(); // cantidad de paginas a mostrar
  const [ci, setCI] = React.useState(); //cantidad de resultados devuelto en la consulta
  const [cp, setCP] = React.useState(); //cantidad de resultados devuelto en la consulta
  const [ce, setCE] = React.useState(); //cantidad de resultados devuelto en la consulta
  const [cg, setCG] = React.useState(); //cantidad de resultados devuelto en la consulta
  const [pnt, setP] = React.useState(); //cantidad de resultados devuelto en la consulta

  React.useEffect(() => {
    var data = {
      pidCu: cursada.IdCursada,
      // pidCu: props.cursada.IdCursada,
    };

    Responses.consultas(data, "http://127.0.0.1:8000/api/infocursada")
      .then((response) => {
        if (Responses.status === 200) {
          setE(response.res[0].Estado);
          setPG(response.res[0].PermiteGrupos);
          setCI(response.res[0].CantidadIns);
          setCP(response.res[0].CantidadP);
          setCE(response.res[0].CantidadE);
          setCG(response.res[0].CantidadG);
          setP(response.res[0].SumaPrm);
        } else if (Responses.status === 401) {
          navegar("/ingreso");
        } else {
          navegar("/error");
        }
      })
      .catch((error) => {
        navegar("/error");
      });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {/* Fecha inicio, fecha fin, estado y permite grupos  */}
          <Grid item xs={12} md={6} lg={5} xl={4}>
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
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

              <Grid item xs={12}>
                <CardMainPage visibleHeader={false}>
                  <Box paddingY={2}>
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        paddingX={2}
                        sx={{ overflowX: "auto" }}
                      >
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
                              <Grid
                                container
                                justifyContent="space-between"
                                rowGap={2}
                              >
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
                                  <Chip
                                    label={
                                      cursada.Estado == "A" ? "Activo" : "Baja"
                                    }
                                    variant="outlined"
                                    color={
                                      cursada.Estado == "A"
                                        ? "success"
                                        : "danger"
                                    }
                                  />
                                  <Typography
                                    marginTop={1}
                                    variant="subtitle2"
                                    sx={{ opacity: "0.75" }}
                                  >
                                    Estado
                                  </Typography>
                                </Grid>

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
                                  <Chip
                                    label={
                                      cursada.TieneGrupos == "S" ? "SI" : "NO"
                                    }
                                    variant="outlined"
                                    color={
                                      cursada.TieneGrupos == "S"
                                        ? "success"
                                        : "error"
                                    }
                                    icon={
                                      cursada.TieneGrupos == "S" ? (
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
                                </Grid>
                              </Grid>
                            </CardMain>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </CardMainPage>
              </Grid>
            </Grid>
          </Grid>

          {/* Inscriptos, practicos, examenes, grupos */}
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <Grid container rowSpacing={3}>
              <Grid item xs={12}>
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
                            <Box paddingY={2}>
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
                                  <Typography variant="h5"> {ci}</Typography>
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
                                  <Typography variant="h5"> {cp}</Typography>
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

              <Grid item xs={12}>
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
                            <Box paddingY={2}>
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
                                  <Typography variant="h5">{ce}</Typography>
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
                                  <Typography variant="h5">{cg}</Typography>
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

            {/* <DocentesCursadasContenedorEstadisticas /> */}
          </Grid>

          {/* Parametros configurados  */}
          <Grid item xs={12} md={6} lg={3}>
            <Grid container>
              <Grid item xs={12} md={6} lg={8}>
                <CardMainPage visibleHeader={false}>
                  <CardMain
                    sx={{
                      border: "none",
                    }}
                  >
                    <CardContent>
                      <Grid container justifyContent="space-between" rowGap={2}>
                        {/* Cantidad de parametros: */}
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" textAlign="center">
                            Parámetros configurados
                          </Typography>
                          <Box sx={{ width: "100%" }} textAlign="center" pt={1}>
                            <CircularProgressWithLabel value={pnt} />
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </CardMain>
                </CardMainPage>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
