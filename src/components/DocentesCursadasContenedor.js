import React from "react";
//MUI
import { Paper, Typography } from "@mui/material";
import { Grid } from "@mui/material";
//Componentes
import { ExportarInfoAlumnos } from "./ExportarInfoAlumnos";
import { ClonarCursada } from "./ClonarCursada";
import { GenerarCuadricula } from "./GenerarCuadricula";
import { useDispatch, useSelector } from "react-redux";

export default function DocentesCursadasContenedor() {
  //Recupero informacion de la materia
  const { cursada } = useSelector((state) => state.cursada);
  //Para el uso de funciones de los state de redux
  //   const dispatch = useDispatch();

  return (
    <Paper
      component="div"
      sx={{
        p: "4px 4px",
        // display: 'flex',
        alignItems: "center",
        width: "95%",
        mt: "10px",
        px: 2,
        pb: 3,
        // minHeight: "75vh",
      }}
      elevation={3}
    >
      <Grid container pt={1}>
        <Grid item xs={12}>
          <Typography variant="h5">Información de la cursada</Typography>
        </Grid>
      </Grid>

      <Grid container pt={2} rowSpacing={1}>
        <Typography variant="h8">Estado: {cursada.Estado}</Typography>
      </Grid>

      <Grid rowSpacing={1}>
        <Typography variant="h8">
          Permite grupos: {cursada.TieneGrupos}
        </Typography>
      </Grid>

      <Grid rowSpacing={1}>
        <Typography variant="h8">Cantidad de inscriptos:</Typography>
      </Grid>

      <Grid rowSpacing={1}>
        <Typography variant="h8">Cantidad de prácticos :</Typography>
      </Grid>

      <Grid rowSpacing={1}>
        <Typography variant="h8">Cantidad de exámenes:</Typography>
      </Grid>

      <Grid rowSpacing={1}>
        <Typography variant="h8">Cantidad de grupos:</Typography>
      </Grid>

      <Grid container pt={3} justifyContent="flex-start" spacing={1}>
        <Grid item xs={4}>
          <ExportarInfoAlumnos />
        </Grid>

        <Grid item xs={4}>
          <GenerarCuadricula />
        </Grid>

        <Grid item xs={4}>
          <ClonarCursada />
        </Grid>
      </Grid>
    </Paper>
  );
}
