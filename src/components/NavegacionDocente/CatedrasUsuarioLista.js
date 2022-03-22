import * as React from "react";
import { Grid } from "@mui/material";
import TarjetaCatedra from "./TarjetaCatedra";

export default function StickyHeadTable(props) {
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
