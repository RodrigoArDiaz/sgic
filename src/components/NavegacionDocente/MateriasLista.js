import * as React from "react";
import { Grid } from "@mui/material";
import TarjetaMateria from "./TarjetaMateria";

export default function StickyHeadTable(props) {
  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  return (
    <div>
      <Grid container pt={1} spacing={2}>
        {props.filas.res.map((row) => {
          return (
            <Grid item xs={6}>
              <TarjetaMateria
                fila={row.Materia}
                idmateria={row.IdMateria}
                salto={props.salto}
                setMat={props.setMat}
                setT={props.setT}
                setM={props.setM}
                m={row}
              />
            </Grid>
          );
        })}
      </Grid>

      <Grid justifyContent="center" container pt={2} />
    </div>
  );
}
