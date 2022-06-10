import * as React from "react";
import { Grid } from "@mui/material";
import TarjetaCatedra from "./TarjetaCatedra";

export default function StickyHeadTable(props) {
  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1)
    return <h4>Consulte al administrador para asociarse a una cátedra</h4>;

  return (
    <Grid container pt={1} spacing={2}>
      {props.filas.res.map((row) => {
        return (
          <Grid item xs={6}>
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
