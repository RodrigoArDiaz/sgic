import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
//Redux
import { useDispatch } from "react-redux";
import { actualizarTitulo } from "../../store/slices/menuSlice";

export default function TarjetaCatedra(props) {
  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();

  return (
    // <Box sx={{ minWidth: 100 }}>
    <Card variant="outlined">
      <React.Fragment>
        <CardContent>
          <Typography align="center" variant="h5" component="div">
            {props.catedra}
          </Typography>
        </CardContent>
        <CardActions sx={{ align: "center" }}>
          <Button
            size="small"
            onClick={() => {
              props.salto("2");
              props.setCat(props.idcatedra);
              // props.setT("Seleccione la materia");
              //Actualiza el titulo al montar la pagina
              dispatch(actualizarTitulo("Seleccione la materia"));
            }}
          >
            Ingresar
          </Button>
        </CardActions>
      </React.Fragment>
    </Card>
    // </Box>
  );
}
