import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { Box, Divider, Grid, IconButton } from "@mui/material";

//Redux - Sesion
import { useDispatch } from "react-redux";

//Redux - Materia
import {
  actualizarMateria,
  actualizarIdMateria,
  actualizarJsonMateria,
} from "../../store/slices/materiaSlice";

//Redux - Menu
import { actualizarTitulo } from "../../store/slices/menuSlice";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";

export default function TarjetaMateria(props) {
  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();

  return (
    <Box
      onClick={() => {
        props.salto("3");
        props.setMat(props.idmateria);
        // props.setT("Seleccione la cursada");
        props.setM(props.fila);
        localStorage.jsonmateria = JSON.stringify(props.m);
        //Actualizo datos cursada
        dispatch(actualizarJsonMateria(props.m));
        dispatch(actualizarMateria(props.m.Materia));
        dispatch(actualizarIdMateria(props.IdMateria));

        //Actualizo datos cursada
        dispatch(actualizarTitulo("Seleccione la cursada"));
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
          borderRightColor: "#00acc1",
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={3}>
            <Box
              sx={{
                // bgcolor: "rgb(24, 144, 255)",
                bgcolor: "#00acc1",
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
                  <MenuBookOutlinedIcon
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
              <CardContent sx={{ paddingY: 3.5, height: "60%" }}>
                <Typography variant="h5" align="center">
                  {props.fila}
                </Typography>{" "}
                <Divider />
              </CardContent>
              <Box textAlign="center" sx={{ mt: "0.5rem" }}>
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
