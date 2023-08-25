import React from "react";
import { useState } from "react";
import { useEffect } from "react";
//MUI
import {
  AlertTitle,
  Box,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
//
import { peticionBuscarMisCursadas } from "../../api/alumnos/cursadasApi";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
//React router
import { useNavigate } from "react-router-dom";
//Redux - Sesion
import { useDispatch } from "react-redux";
//Redux - Menu
import { actualizarMenu, actualizarTitulo } from "../../store/slices/menuSlice";
//Redux - Cursada
import { actualizarCursada } from "../../store/slices/cursadaSlice";
//Redux - useSelector
import { useSelector } from "react-redux";
import { listaItemsMenuAlumnoConCursada } from "../Menu/itemsMenu";
//
import MensajeFeedback from "../MensajeFeedback";
import { MoonLoader } from "react-spinners";
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../styles/EstilosSpinners";
import { DriveFileRenameOutline } from "@mui/icons-material";
import { routes } from "../../routes/index";
import { actualizarMateria } from "../../store/slices/materiaSlice";

/*** Componente MisCursadasContenedor ***/
const MisCursadasContenedor = () => {
  //Variable de estado que indica el estado de la peticion
  const [isLoading, setIsLoading] = useState(false);

  //Variable de estado que guarda la lista de cursadas
  const [cursadas, setCursadas] = useState([]);

  //
  const navegar = useNavigate();

  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();

  //Manejo del titulo e items del menu
  const { jsonMateria } = useSelector((state) => state.materia);

  //Peticion de buscar
  const handleBuscarMisCursadas = async () => {
    setIsLoading(true);
    //Realizo peticon
    try {
      const respuesta = await peticionBuscarMisCursadas(0, 1000, null);
      setCursadas(respuesta.data.res);
    } catch (error) {
      if (error.response && error.response.status == 401) {
        //Sesion caducada (sin autorización)
        navegar(routes.iniciarSesion);
      }
    }
    setIsLoading(false);
  };

  //Carga de las cursadas del alumno
  useEffect(() => {
    handleBuscarMisCursadas();
  }, []);

  //
  const handleOnClick = (cursada) => {
    localStorage.jsoncursada = JSON.stringify(cursada);
    //Actualizo datos cursada
    dispatch(actualizarCursada(cursada));
    dispatch(actualizarMateria(cursada.Materia));
    //Actualizo titulo
    dispatch(
      actualizarTitulo(
        cursada.Materia +
          " - " +
          cursada.Anio +
          " - Semestre " +
          cursada.Semestre
      )
    );
    //Actualizo items del menu
    dispatch(actualizarMenu(listaItemsMenuAlumnoConCursada));
    //Redirigo
    navegar(routes.alumnosInfoCursada);
  };

  return (
    <>
      <Grid container pt={1} spacing={2}>
        {cursadas.map((cursada) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              xl={3}
              key={cursada.IdCursada}
            >
              <Box
                onClick={() => {
                  handleOnClick(cursada);
                }}
                sx={{
                  borderRadius: "4px",
                  height: "100%",

                  "&:hover": {
                    cursor: "pointer",
                    "&  svg": {
                      transform: "scale(1.2)",
                      transition: "transform 0.7s ease",
                    },
                  },
                }}
              >
                <CardMainPage
                  dividerVisible={false}
                  visibleIcon={false}
                  visibleHeader={false}
                  sx={{
                    height: "100%",
                    borderRightWidth: "3px",
                    borderRightColor: "#3d5afe",
                  }}
                >
                  <Grid container sx={{ height: "100%" }}>
                    <Grid item xs={3}>
                      <Box
                        sx={{
                          // bgcolor: "rgb(24, 144, 255)",
                          bgcolor: "#3d5afe",
                          borderRadius: "4px 0 0 4px",

                          height: "100%",
                          width: "100%",
                        }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box alignSelf="center">
                          <IconButton disableRipple>
                            <AutoStoriesOutlinedIcon
                              sx={{ color: "rgb(255,255,255)" }}
                              fontSize="large"
                            />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Box
                        sx={{
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center!important",
                          flexDirection: "column",
                        }}
                      >
                        <CardContent
                          sx={{
                            paddingY: 2,
                            paddingBottom: 1,
                            // height: "80%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            // sx={{ mb: 1.5 }}
                            align="center"
                            variant="h6"
                            component="div"
                          >
                            {cursada.Materia}
                            {/* {props.fila} */}
                            {/* <Divider /> */}
                          </Typography>
                          <Typography
                            // variant="h6"
                            sx={{ mb: 0, fontSize: "1.10rem" }}
                            textAlign="center"
                          >
                            Año: {cursada.Anio}
                          </Typography>
                          <Typography
                            sx={{ mb: 0, fontSize: "1.10rem" }}
                            textAlign="center"
                          >
                            Semestre: {cursada.Semestre}
                          </Typography>
                        </CardContent>

                        <CardContent
                          sx={{
                            width: "100%",
                            paddingTop: 0,
                            paddingBottom: 0,
                          }}
                        >
                          <Divider />
                        </CardContent>

                        <Box textAlign="center" sx={{ p: 1 }}>
                          <Typography
                            variant="text"
                            sx={{ color: "text.subtitle1secondary" }}
                          >
                            Ingresar &rarr;
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardMainPage>
              </Box>
            </Grid>
          );
        })}

        {!isLoading && cursadas.length == 0 && (
          <Grid item xs={12}>
            <MensajeFeedback>
              <AlertTitle>Aún no estas inscripto en una cursada.</AlertTitle>
              Para inscribirte en la cursada de una materia, dirígete la seccion{" "}
              <DriveFileRenameOutline
                sx={{ marginBottom: "-4px" }}
              ></DriveFileRenameOutline>
              <b>Inscripciones</b> {""} del menú.
            </MensajeFeedback>
          </Grid>
        )}

        {isLoading && (
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Box component="div" display="flex" justifyContent="center">
                <MoonLoader color={colorMainSpinner} size={sizeMainSpinner} />
              </Box>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default MisCursadasContenedor;
