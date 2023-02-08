import React from "react";
import {
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  Zoom,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
//
import { OutlinedInputSearch } from "../Material UI - Componentes Modificados/ComponentesPagina/ComponentesPagina";
import { Clear, Search } from "@mui/icons-material";
//
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { peticionBuscarDocente } from "../../api/super/gestionDocentesApi";
import { useTheme } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";

//Valor inicial del formulario de busqueda
const valoresInicialesForm = {
  Apellidos: "",
  Nombres: "",
  Documento: "",
  Email: "",
  Bajas: true,
};

//Reglas de validaciones de los campos
const validaciones = yup.object({
  Apellidos: yup.string(),
  Nombres: yup.string(),
  Documento: yup.string(),
  Email: yup.string(),
  Bajas: yup.bool(),
});

export default function BuscarDocentes({
  resultadoBusqueda,
  peticionIniciada,
  peticionFinalizada,
  modificarDatosBusqueda,
  paginacion,
}) {
  //Recupero token
  const { token } = useSelector((state) => state.login);

  //Para estilos
  const theme = useTheme();
  const esXs = useMediaQuery(theme.breakpoints.down("sm"));

  //Configuracion de Formik
  const formik = useFormik({
    initialValues: valoresInicialesForm,
    validationSchema: validaciones,
    onSubmit: (values) => {
      modificarDatosBusqueda(values);
      handleBuscarDocentes(values);
    },
  });

  //Funcion manejo de busqueda
  const handleBuscarDocentes = async (values) => {
    //Reseteo los valores del resultado de la busqueda anterior
    resultadoBusqueda({
      docentes: [],
      totalPaginas: 0,
    });

    //Acondiciono valores
    const pag = {
      Offset: 0,
      Limite: paginacion.filasPorPagina,
    };
    //Concateno los valores de busqueda y los de paginacion
    const datosAEnviar = Object.assign(values, pag);
    //Muesto loader o spinner
    peticionIniciada();
    try {
      const respuesta = await peticionBuscarDocente(datosAEnviar, token);
      //Respuesta OK
      const resultados = respuesta.data.data.resultados;
      const totalFilas = respuesta.data.data.filas;
      //Calculo del numero total de paginas
      const totalPaginas = Math.ceil(totalFilas / paginacion.filasPorPagina);

      //Acondiciono resultado
      const resultadoBusq = {
        docentes: resultados,
        totalPaginas: totalPaginas,
        paginaActual: 1,
      };
      //Actualizo resultado
      resultadoBusqueda(resultadoBusq);
    } catch (error) {
      //Ocurrio un error
      resultadoBusqueda({
        docentes: [],
        totalPaginas: 0,
        paginaActual: 1,
      });
    }
    //
    peticionFinalizada();
  };

  //Limpiar campo
  const limpiarCampo = (nombre, valor) => {
    formik.setFieldValue(nombre, valor);
  };

  return (
    <Grid container spacing={1}>
      <Grid item>
        <FormControl sx={{ width: "12rem" }}>
          <OutlinedInputSearch
            id="Apellidos"
            name="Apellidos"
            placeholder="Apellidos"
            size="small"
            value={formik.values.Apellidos}
            onChange={formik.handleChange}
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
            endAdornment={
              formik.values.Apellidos ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      limpiarCampo("Apellidos", valoresInicialesForm.Apellidos)
                    }
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
            sx={{ paddingRight: 0 }}
          />
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl sx={{ width: "10rem" }}>
          <OutlinedInputSearch
            id="Nombres"
            name="Nombres"
            placeholder="Nombres"
            size="small"
            value={formik.values.Nombres}
            onChange={formik.handleChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                formik.handleSubmit();
              }
            }}
            endAdornment={
              formik.values.Nombres ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      limpiarCampo("Nombres", valoresInicialesForm.Nombres)
                    }
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
            sx={{ paddingRight: 0 }}
          />
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl sx={{ width: "10rem" }}>
          <OutlinedInputSearch
            id="Documento"
            name="Documento"
            placeholder="Documento"
            size="small"
            value={formik.values.Documento}
            onChange={formik.handleChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                formik.handleSubmit();
              }
            }}
            endAdornment={
              formik.values.Documento ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      limpiarCampo("Documento", valoresInicialesForm.Documento)
                    }
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
            sx={{ paddingRight: 0 }}
          />
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl sx={{ width: "10rem" }}>
          <OutlinedInputSearch
            id="Email"
            name="Email"
            placeholder="Email"
            size="small"
            value={formik.values.Email}
            onChange={formik.handleChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                formik.handleSubmit();
              }
            }}
            endAdornment={
              formik.values.Email ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      limpiarCampo("Email", valoresInicialesForm.Email)
                    }
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ) : undefined
            }
            sx={{ paddingRight: 0 }}
          />
        </FormControl>
      </Grid>

      <Grid item>
        <FormGroup>
          <FormControlLabel
            control={
              <Tooltip title="Incluir bajas" TransitionComponent={Zoom}>
                <Checkbox
                  onChange={formik.handleChange}
                  name="Bajas"
                  defaultChecked
                />
              </Tooltip>
            }
            // label={
            //   esXs ? (
            //     <Typography variant="subtitle1">Incluir bajas</Typography>
            //   ) : (
            //     ""
            //   )
            // }
            label={<Typography variant="subtitle1">Incluir bajas</Typography>}
            id="Bajas"
            labelPlacement={esXs ? "start" : "end"}
          />
        </FormGroup>
      </Grid>

      <Grid item xs="auto" sm="auto" alignSelf="center">
        <Button
          color="primary"
          variant="outlined"
          // onClick={() => {
          //   manejador();
          // }}
        >
          <SearchIcon />
        </Button>
      </Grid>
    </Grid>
  );
}
