import React from "react";
import { Grid, Paper } from "@mui/material";
import ListaCursadasInscripcion from "../components/ListaCursadasInscripcion";
import BuscarCursadasInscripciones from "../components/BuscarCursadasInscripcion";
import { styled } from "@mui/material/styles";

// const GridCont = styled(Grid)(({ theme }) => ({
//   marginLeft: "0",
//   height: "50px",
// }));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const gridSpacing = 3;
export default function PaginaInscripcionesCursadas() {
  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <Grid
          container
          sx={{ backgroundColor: "#fff", borderRadius: "10px" }}
        ></Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container sx={{ backgroundColor: "#fff", borderRadius: "10px" }}>
          <ListaCursadasInscripcion />
        </Grid>
      </Grid>
    </Grid>
  );
}
