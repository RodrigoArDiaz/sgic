import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import InscripcionesCard from "./InscripcionesCard";

const cursadasPrueba = [
  {
    catedra: "Ingenieria de Software",
    materia: "Ingenieria de Software",
    anio: "2022",
    fechaInicio: "25-03-2022",
    idCursada: "1",
    idMateria: "1",
  },
  {
    catedra: "Ingenieria de Software",
    materia: "Laboratorio de Bases de Datos",
    anio: "2022",
    fechaInicio: "10-04-2022",
    idCursada: "2",
    idMateria: "2",
  },
  {
    catedra: "Ingenieria de Software",
    materia: "Ingenieria de Software",
    anio: "2022",
    fechaInicio: "25-03-2022",
    idCursada: "1",
    idMateria: "1",
  },
  {
    catedra: "Ingenieria de Software",
    materia: "Laboratorio de Bases de Datos",
    anio: "2022",
    fechaInicio: "10-04-2022",
    idCursada: "2",
    idMateria: "2",
  },
];

const ListaCursadasInscripcion = () => {
  const [cursadas, setCursadas] = useState(cursadasPrueba);
  return (
    <>
      {cursadas.map((cursada, indice) => {
        return (
          <Grid item lg={3} md={6} sm={12} xs={12}>
            <InscripcionesCard cursada={cursada} />
          </Grid>
        );
      })}
    </>
  );
};

export default ListaCursadasInscripcion;
