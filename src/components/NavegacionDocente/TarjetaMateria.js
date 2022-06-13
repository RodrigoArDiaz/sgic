import * as React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { amber } from "@mui/material/colors";

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
    // <Box sx={{ minWidth: 100 }}>
    <CardMainPage
      icon="menu_book"
      // title={props.catedra}
      bgColorIcon={amber[700]}
      titleTextAlign="left"
      dividerVisible={false}
    >
      <CardContent sx={{ paddingTop: "0" }}>
        <Typography align="center" variant="h5" component="div">
          {props.fila}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          align: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <Button
          size="large"
          variant="outlined"
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
          endIcon={<ArrowForwardIcon />}
        >
          Ingresar
        </Button>
      </CardActions>
    </CardMainPage>
  );
}
