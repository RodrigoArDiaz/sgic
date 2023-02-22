import * as React from "react";
//MUI
import { Grid } from "@mui/material";
import TarjetaCursada from "./TarjetaCursada";

/*** Componente CursadaLista ***/
export default function CursadaLista(props) {
  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  return (
    <Grid container pt={1} spacing={2}>
      {props.filas.res.map((row) => {
        return (
          <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
            <TarjetaCursada
              fila={props.Materia}
              idcursada={row.IdCursada}
              anio={row.Anio}
              sem={row.Semestre}
              salto={props.salto}
              setCur={props.setCur}
              setT={props.setT}
              cur={row}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
