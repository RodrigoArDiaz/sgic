import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import InscripcionesCard from "./InscripcionesCard";
import SkeletonInscripcionesCard from "./SkeletonInscripcionesCard";

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
  //In
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Grid item lg={3} md={6} sm={12} xs={12}>
            <SkeletonInscripcionesCard />
          </Grid>
          <Grid item lg={3} md={6} sm={12} xs={12}>
            <SkeletonInscripcionesCard />
          </Grid>
          <Grid item lg={3} md={6} sm={12} xs={12}>
            <SkeletonInscripcionesCard />
          </Grid>
        </>
      ) : (
        cursadas.map((cursada, indice) => {
          return (
            <Grid item lg={3} md={6} sm={12} xs={12}>
              <InscripcionesCard cursada={cursada} />
            </Grid>
          );
        })
      )}
    </>
  );
};

export default ListaCursadasInscripcion;
