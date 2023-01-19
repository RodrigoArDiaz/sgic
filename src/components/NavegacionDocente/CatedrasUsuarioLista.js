import * as React from "react";
import { AlertTitle, Grid, ListItem, ListItemText } from "@mui/material";
import TarjetaCatedra from "./TarjetaCatedra";
//Redux
import { useDispatch } from "react-redux";
import { actualizarTitulo } from "../../store/slices/menuSlice";
import MensajeFeedback from "../MensajeFeedback";

export default function CatedrasUsuarioLista(props) {
  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actualizarTitulo("Seleccione la cátedra"));
  }, []);

  if (props.filas.res === undefined) {
    return (
      <ListItem key="0" disablePadding>
        <ListItemText>
          <MensajeFeedback tipo="info">
            <AlertTitle>Error fatal.</AlertTitle>
          </MensajeFeedback>
        </ListItemText>
      </ListItem>
    );
  }

  if (props.filas.res.length < 1) {
    return (
      <ListItem key="0" disablePadding>
        <ListItemText>
          <MensajeFeedback>
            <AlertTitle>No esta asociado a una cátedra</AlertTitle>
            Consulte al administrador para asociarse a una cátedra
          </MensajeFeedback>
        </ListItemText>
      </ListItem>
    );
  }

  return (
    <Grid container pt={1} spacing={2}>
      {props.filas.res.map((row) => {
        return (
          <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
            <TarjetaCatedra
              key={row.IdCatedra}
              catedra={row.Catedra}
              idcatedra={row.IdCatedra}
              salto={props.salto}
              setCat={props.setCat}
              setT={props.setT}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
