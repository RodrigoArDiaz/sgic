import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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

export default function TarjetaMateria(props) {
  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();

  return (
    <Box sx={{ minWidth: 600 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography align="center" variant="h5" component="div">
              {props.fila}
            </Typography>
          </CardContent>
          <CardActions sx={{ align: "center" }}>
            <Button
              size="small"
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
            >
              Ingresar
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
