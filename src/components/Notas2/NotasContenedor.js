import React from "react";
import { Paper, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotasContenedorPracticos from "./NotasContenedorPracticos";
import NotasContenedorExamenes from "./NotasExamenes/NotasContenedorExamenes";
import SituacionFinalContenedor from "./SituacionFinal/SituacionFinalContenedor";
import { useSelector } from "react-redux";

export default function NotasContenedor(props) {
  //Recupero informacion de la cursada
  const { cursada } = useSelector((state) => state.cursada);

  const [titulo, setTitulo] = React.useState("Trabajos Prácticos");
  const [cambiocontexto, setCT] = React.useState("1");

  return (
    <>
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
        <Grid container pt={10} spacing={8}>
          <Grid item xs={6}>
            <Typography variant="h4">Gestión de Notas</Typography>
          </Grid>
        </Grid>

        <Grid container pt={1} justifyContent="flex-end" spacing={8}>
          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={() => {
                setCT("1");
                setTitulo("Trabajos Práctricos");
              }}
            >
              Prácticos
            </Button>
          </Grid>

          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={() => {
                setCT("2");
                setTitulo("Exámenes");
              }}
            >
              Exámenes
            </Button>
          </Grid>

          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={() => {
                setCT("3");
                setTitulo("Situación Final");
              }}
            >
              Situación Final
            </Button>
          </Grid>
        </Grid>

        {cambiocontexto === "1" && (
          <NotasContenedorPracticos cursada={cursada} titulo={titulo} />
        )}
        {cambiocontexto === "2" && (
          <NotasContenedorExamenes cursada={cursada} titulo={titulo} />
        )}
        {cambiocontexto === "3" && (
          <SituacionFinalContenedor cursada={cursada} titulo={titulo} />
        )}
      </Paper>
    </>
  );
}
