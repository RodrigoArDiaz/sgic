import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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

export default function TarjetaCursada(props) {
  const navegar = useNavigate();
  //
  const [esSuper, setEsSuper] = useState(localStorage.EsSA);

  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();

  //Manejo del titulo e items del menu
  const { jsonMateria } = useSelector((state) => state.materia);

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
              {props.fila}
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
            >
              Ingresar
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
