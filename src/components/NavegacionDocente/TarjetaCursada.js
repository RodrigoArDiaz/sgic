import * as React from "react";
//MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
//router
import { useNavigate } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  actualizarAnio,
  actualizarIdCursada,
  actualizarSemestre,
} from "../../store/slices/cursadaSlice";

export default function OutlinedCard(props) {
  //Recupero informacion de la materia
  const { materia, idMateria } = useSelector((state) => state.materia);
  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();
  //
  const navegar = useNavigate();

  /** */
  const handleSeleccionCursada = () => {
    dispatch(actualizarIdCursada(props.idcursada));
    dispatch(actualizarAnio(props.anio));
    dispatch(actualizarSemestre(props.semestre));
    // navegar("/docentes/cursadas");
  };

  return (
    <Box sx={{ minWidth: 600 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ mb: 1.5 }}
              align="center"
              variant="h5"
              component="div"
            >
              {materia}
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Año: {props.anio}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Semestre: {props.sem}
              </Typography>
            </Typography>
          </CardContent>
          <CardActions sx={{ align: "center" }}>
            <Button
              size="small"
              onClick={handleSeleccionCursada}
              // onClick={() => {
              //   localStorage.jsoncursada = JSON.stringify(props.cur);
              //   //console.log(JSON.parse(localStorage.jsoncursada));
              //   navegar("/docentes/cursadas");
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
