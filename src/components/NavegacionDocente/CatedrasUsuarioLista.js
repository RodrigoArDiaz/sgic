import * as React from "react";
import { Grid } from "@mui/material";
import TarjetaCatedra from "./TarjetaCatedra";
//Redux
import { useDispatch } from "react-redux";
import { actualizarTitulo } from "../../store/slices/menuSlice";

export default function StickyHeadTable(props) {
  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actualizarTitulo("Seleccione la cátedra"));
  }, []);

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1)
    return <h4>Consulte al administrador para asociarse a una cátedra</h4>;

  return (
    <Grid container pt={1} spacing={2}>
      {props.filas.res.map((row) => {
        return (
          <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
            <TarjetaCatedra
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
