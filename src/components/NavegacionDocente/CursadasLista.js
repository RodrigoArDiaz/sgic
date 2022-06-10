import * as React from "react";
import { Grid } from "@mui/material";
import TarjetaCursada from "./TarjetaCursada";

export default function StickyHeadTable(props) {
  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  return (
    <div>
      <Grid container pt={1} spacing={2}>
        {props.filas.res.map((row) => {
          return (
            <Grid item xs={6}>
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

      <Grid justifyContent="center" container pt={2} />
    </div>
  );
}
