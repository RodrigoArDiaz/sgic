import * as React from "react";
//MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
//
import { useDispatch } from "react-redux";
import {
  actualizarIdMateria,
  actualizarMateria,
} from "../../store/slices/materiaSlice";

export default function OutlinedCard(props) {
  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();

  /**
   * Guarda datos de la catedra seleccionada y
   * cambia vista a la pagina de materias
   */
  const handleSeleccionMateria = () => {
    props.setSalto("3");
    dispatch(actualizarMateria(props.materia));
    dispatch(actualizarIdMateria(props.idmateria));
  };

  return (
    <Box sx={{ minWidth: 600 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography align="center" variant="h5" component="div">
              {props.materia}
            </Typography>
          </CardContent>
          <CardActions sx={{ align: "center" }}>
            <Button
              size="small"
              onClick={handleSeleccionMateria}
              // onClick={() => {
              //   props.salto("3");
              //   props.setMat(props.idmateria);
              //   props.setT("Seleccione la cursada");
              //   props.setM(props.fila);
              //   localStorage.jsonmateria = JSON.stringify(props.m);
              // }}
            >
              Ingresar
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
