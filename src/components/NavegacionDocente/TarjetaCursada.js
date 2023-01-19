import React, { useState } from "react";
//MUI
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Divider, Grid, IconButton } from "@mui/material";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
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

//Items del menu
import {
  listaItemsMenuSuperConCursada,
  listaItemsMenuDocenteConCursada,
} from "../Menu/itemsMenu";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";

export default function TarjetaCursada(props) {
  const navegar = useNavigate();
  //
  const [esSuper, setEsSuper] = useState(localStorage.EsSA);

  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();

  //Manejo del titulo e items del menu
  const { jsonMateria } = useSelector((state) => state.materia);

  return (
    <Box
      onClick={() => {
        localStorage.jsoncursada = JSON.stringify(props.cur);
        //Actualizo datos cursada
        dispatch(actualizarCursada(props.cur));

        //Actualizo titulo
        dispatch(
          actualizarTitulo(jsonMateria.Materia + " - " + props.cur.Anio)
        );
        //Actualizo items del menu
        if (esSuper === "S")
          dispatch(actualizarMenu(listaItemsMenuSuperConCursada));
        else dispatch(actualizarMenu(listaItemsMenuDocenteConCursada));

        // navegar("/docentes/cursadas");
        navegar("/inicio/docentes/cursada/info_cursada");
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
                  {props.fila}
                  {/* <Divider /> */}
                </Typography>
                <Typography
                  // variant="h6"
                  sx={{ mb: 0, fontSize: "1.10rem" }}
                  textAlign="center"
                >
                  Año: {props.anio}
                </Typography>
                <Typography
                  sx={{ mb: 0, fontSize: "1.10rem" }}
                  textAlign="center"
                >
                  Semestre: {props.sem}
                </Typography>
              </CardContent>

              <CardContent
                sx={{ width: "100%", paddingTop: 0, paddingBottom: 0 }}
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
  );
}
