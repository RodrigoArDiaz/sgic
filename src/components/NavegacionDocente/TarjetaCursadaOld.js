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
  actualizarCursada,
  actualizarIdCursada,
  actualizarSemestre,
} from "../../store/slices/cursadaSlice";
import { actualizarMenu } from "../../store/slices/menuSlice";
import { listaItemsMenuSuperConCursada } from "../Menu/itemsMenu";

export default function TarjetaCursada({ cursada }) {
  //Recupero informacion de la materia
  const { materia, idMateria } = useSelector((state) => state.materia);
  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();
  //
  const navegar = useNavigate();

  /** */
  const handleSeleccionCursada = () => {
    //Actualizo datos cursada
    dispatch(actualizarCursada(cursada));
    //Actualizo menu
    dispatch(actualizarMenu(listaItemsMenuSuperConCursada));
    //Redirecciona
    navegar("/inicio/docentes/cursada/info_cursada");
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
                Año: {cursada.Anio}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Semestre: {cursada.Semestre}
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
