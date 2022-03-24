import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import TarjetaCatedra from "./TarjetaCatedra";
import { actualizarTitulo } from "../../store/slices/menuSlice";
import { useDispatch } from "react-redux";

export default function StickyHeadTable(props) {
  //Para el uso de funciones de los state de redux
  const dispatch = useDispatch();

  //Actualiza el titulo al montar la pagina
  useEffect(() => {
    dispatch(actualizarTitulo("Seleccione la catedra"));
  }, []);

  //Actualiza el titulo al desmontar la pagina
  useEffect(() => {
    return () => {
      dispatch(actualizarTitulo(""));
    };
  }, []);

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1)
    return <h4>Consulte al administrador para asociarse a una cátedra</h4>;

  return (
    <Grid container>
      {props.filas.res.map((row) => {
        return (
          <Grid item xl={3} lg={4} md={6} sm={12} xs={12} padding={2}>
            <TarjetaCatedra
              catedra={row.Catedra}
              idcatedra={row.IdCatedra}
              setSalto={props.setSalto}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
