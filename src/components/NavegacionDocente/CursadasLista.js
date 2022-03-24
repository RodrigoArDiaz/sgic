import * as React from "react";
//MUI
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
//
import FilasPorPagina from "./FilasPorPagina";
import TarjetaCursada from "./TarjetaCursada";

export default function StickyHeadTable(props) {
  function CambiarPagina(e, page) {
    props.actualizarpagina(page);
  }

  if (props.filas.res === undefined) return <h4>Error fatal</h4>;
  if (props.filas.res.length < 1) return <h4>No se encontraron resultados</h4>;

  return (
    <div>
      <Grid container pt={1} spacing={2}>
        {props.filas.res.map((cursada) => {
          return (
            <Grid item xs={6}>
              <TarjetaCursada cursada={cursada} />
            </Grid>
          );
        })}
      </Grid>

      <Grid justifyContent="flex-start" container pt={2}>
        <Grid item xs={6} sx={{ mt: 1 }}>
          <Stack spacing={2}>
            <Pagination
              variant="outlined"
              defaultPage={1}
              count={props.paginacion}
              page={props.pagina}
              onChange={(e, page) => CambiarPagina(e, page)}
            />
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ mt: 1 }}>
          Filas por página:{" "}
          {
            <FilasPorPagina
              actualizarfilas={props.actualizarfilas}
              fpp={props.filasxpagina}
            />
          }
        </Grid>
      </Grid>

      <Grid justifyContent="center" container pt={2} />
    </div>
  );
}
