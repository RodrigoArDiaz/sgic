import React, { useEffect, useState } from "react";
//mui
import {
  Button,
  CardContent,
  FormControl,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
//Formik y yup
import * as yup from "yup";
import { useFormik } from "formik";
//Componentes
import InscripcionesCard from "./InscripcionesCard";
import { OutlinedInputSearch } from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";
import CardMainPage from "../Material UI - Componentes Modificados/CardMainPage";
import {
  colorMainSpinner,
  sizeMainSpinner,
} from "../../styles/EstilosSpinners";
import { MoonLoader } from "react-spinners";
import { peticionListarCursadasInscripciones } from "../../api/alumnos/cursadasApi";
import MensajeFeedback from "../MensajeFeedback";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

const valoresInicialesForm = {
  materia: "",
};

const validaciones = yup.object({
  materia: yup.string(),
});

/*** Componente CursadasInscripcionContenedor ***/
const CursadasInscripcionContenedor = () => {
  // const [cursadas, setCursadas] = useState(cursadasPrueba);
  const [cursadas, setCursadas] = useState([]);
  //Indica que se esta realizando una peticion
  const [isLoading, setIsLoading] = useState(false);
  //Para mostra mensaje de resultado
  const [sinResultados, setSinResultados] = useState(false);

  //
  const navegar = useNavigate();

  //
  const formik = useFormik({
    initialValues: valoresInicialesForm,
    validationSchema: validaciones,
    onSubmit: (values) => {
      handleListarCursadasEnInscripcion(values);
    },
  });

  //
  const handleListarCursadasEnInscripcion = async (values) => {
    setIsLoading(true);
    setSinResultados(false);
    // Realizo peticon
    try {
      const respuesta = await peticionListarCursadasInscripciones(
        values.materia,
        null
      );
      setCursadas(respuesta.data.res);
    } catch (error) {
      console.log(error.response);
      setCursadas([]);
      setSinResultados(true);
      if (error.response && error.response.status == 401) {
        //Sesion caducada (sin autorización)
        navegar(routes.iniciarSesion);
      }
    }

    setIsLoading(false);
  };

  //Carga las materias en inscripcion
  useEffect(() => {
    handleListarCursadasEnInscripcion({ materia: "" });
  }, []);

  return (
    <>
      <Box paddingBottom={2}>
        <Typography
          variant="h2"
          sx={{
            margin: "0px",
            fontWeight: "500",
            fontSize: "1.5rem",
            lineHeight: "1.27",
            fontFamily: "Public Sans, sans-serif",
          }}
        >
          Inscripciones
        </Typography>
      </Box>
      {/* Buscar cursadas en inscripcion */}
      <CardMainPage visibleHeader={false} sx={{ width: "max-content" }}>
        <CardContent
          sx={{
            "&.MuiCardContent-root:last-child": { paddingBottom: "16px" },
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={9} sm="auto">
                  <FormControl fullWidth>
                    <OutlinedInputSearch
                      id="materia"
                      value={formik.values.nombres}
                      onChange={formik.handleChange}
                      placeholder="Materia"
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

                <Grid item xs={2}>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                  >
                    <SearchIcon />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardMainPage>

      <Grid container pt={2} spacing={2}>
        {isLoading ? (
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Box
                component="div"
                display="flex"
                justifyContent="center"
                paddingTop={2}
              >
                <MoonLoader color={colorMainSpinner} size={sizeMainSpinner} />
              </Box>
            </Grid>
          </Grid>
        ) : (
          cursadas.map((cursada, indice) => {
            return (
              <Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
                <InscripcionesCard cursada={cursada} />
              </Grid>
            );
          })
        )}

        {sinResultados && (
          <Grid item xs={12}>
            <MensajeFeedback>No se encontraron resultados.</MensajeFeedback>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default CursadasInscripcionContenedor;
