import React from "react";
import { Grid } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
//
import { OutlinedInputSearch } from "../Material UI - Componentes Modificados/Componentes Inscripciones/ComponentesInscripciones";
import { Search } from "@mui/icons-material";
//
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { peticionBuscarDocente } from "../../api/super/gestionDocentesApi";

//Valor inicial del formulario de busqueda
const valoresInicialesForm = {
  Apellidos: "",
  Nombres: "",
  Documento: "",
  Email: "",
  Bajas: false,
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
      Offset: paginacion.paginaActual - 1,
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
      };
      //Actualizo resultado
      resultadoBusqueda(resultadoBusq);
    } catch (error) {
      //Ocurrio un error
      resultadoBusqueda({
        docentes: [],
        totalPaginas: 0,
      });
    }
    //
    peticionFinalizada();
  };

  return (
    <Grid item xs={12} paddingY={1} paddingX={2}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} lg={2.5} xl={3}>
          <FormControl fullWidth>
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
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} lg={2.5} xl={2}>
          <FormControl fullWidth>
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
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} lg={2} xl={2}>
          <FormControl fullWidth>
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
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} lg={3} xl={3}>
          <FormControl fullWidth>
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
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={2} xl={2}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox onChange={formik.handleChange} name="Bajas" />}
              label="Incluir bajas"
              id="Bajas"
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Grid>
  );
}
