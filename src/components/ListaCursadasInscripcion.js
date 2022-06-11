import React, { useState, useEffect } from "react";
//mui
import {
  Button,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  LinearProgress,
  Typography,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
//Formik y yup
import * as yup from "yup";
import { useFormik } from "formik";
//Componentes
import InscripcionesCard from "./InscripcionesCard";
import SkeletonInscripcionesCard from "./SkeletonInscripcionesCard";
import {
  CardMain,
  OutlinedInputSearch,
} from "./Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";
import { Box } from "@mui/material";

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

//
const valoresInicialesForm = {
  materia: "",
};

const validaciones = yup.object({
  materia: yup.string(),
});

const ListaCursadasInscripcion = () => {
  // const [cursadas, setCursadas] = useState(cursadasPrueba);
  const [cursadas, setCursadas] = useState([]);
  //In
  const [isLoading, setIsLoading] = useState(false);
  //
  const formik = useFormik({
    initialValues: valoresInicialesForm,
    validationSchema: validaciones,
    onSubmit: (values) => {
      handleInscribirseEnCursada(values);
    },
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // }, []);

  const handleInscribirseEnCursada = (values) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCursadas(cursadasPrueba);
    }, 5000);
  };

  return (
    <CardMain>
      <CardHeader
        title={<Typography variant="h5">Inscripciones a cursadas</Typography>}
      ></CardHeader>
      <Divider></Divider>
      <CardContent>
        <Grid container>
          <Grid item xs={12} paddingY={1} paddingX={2}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
                <FormControl fullWidth>
                  <OutlinedInputSearch
                    id="materia"
                    value={formik.values.nombres}
                    onChange={formik.handleChange}
                    placeholder="Nombre de la materia"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        formik.handleSubmit();
                      }
                    }}
                    startAdornment={
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    }
                    size="small"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          {isLoading ? (
            <Grid item xs={12}>
              <Box sx={{ width: "100%" }} padding={2}>
                <LinearProgress />
              </Box>
            </Grid>
          ) : (
            cursadas.map((cursada, indice) => {
              return (
                <Grid item xl={3} lg={4} md={6} sm={12} xs={12} padding={2}>
                  <InscripcionesCard cursada={cursada} />
                </Grid>
              );
            })
          )}

          {/* 
          {isLoading ? (
            <>
              <Grid item xl={3} lg={4} md={6} sm={12} xs={12} padding={2}>
                <SkeletonInscripcionesCard />
              </Grid>
              <Grid item xl={3} lg={4} md={6} sm={12} xs={12} padding={2}>
                <SkeletonInscripcionesCard />
              </Grid>
              <Grid item xl={3} lg={4} md={6} sm={12} xs={12} padding={2}>
                <SkeletonInscripcionesCard />
              </Grid>
              <Grid item xl={3} lg={4} md={6} sm={12} xs={12} padding={2}>
                <SkeletonInscripcionesCard />
              </Grid>
            </>
          ) : (
            cursadas.map((cursada, indice) => {
              return (
                <Grid item xl={3} lg={4} md={6} sm={12} xs={12} padding={2}>
                  <InscripcionesCard cursada={cursada} />
                </Grid>
              );
            })
          )} */}
        </Grid>
      </CardContent>
    </CardMain>
  );
};

export default ListaCursadasInscripcion;
