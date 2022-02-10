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

// **********************

const docentesPrueba = [
  {
    Apellidos: "Diaz",
    Nombres: "Rodrigo",
    Documento: "39359920",
    Email: "diazrodrigoar@gmail.com",
    Estado: "A",
    Usuario: "diazrod",
  },
  {
    Apellidos: "Luchesse",
    Nombres: "Augusto Gustavo",
    Documento: "20300100",
    Email: "gustavo@gmail.com",
    Estado: "B",
    Usuario: "lucheseaug",
  },
  {
    Apellidos: "Gomez",
    Nombres: "Juan Pedro",
    Documento: "20300100",
    Email: "gomez@gmail.com",
    Estado: "B",
    Usuario: "gomezjuan",
  },
  {
    Apellidos: "Diaz",
    Nombres: "Rodrigo",
    Documento: "39359920",
    Email: "diazrodrigoar@gmail.com",
    Estado: "A",
    Usuario: "diazrod",
  },
  {
    Apellidos: "Luchesse",
    Nombres: "Augusto Gustavo",
    Documento: "20300100",
    Email: "gustavo@gmail.com",
    Estado: "B",
    Usuario: "lucheseaug",
  },
  {
    Apellidos: "Gomez",
    Nombres: "Juan Pedro",
    Documento: "20300100",
    Email: "gomez@gmail.com",
    Estado: "B",
    Usuario: "gomezjuan",
  },
  {
    Apellidos: "Diaz",
    Nombres: "Rodrigo",
    Documento: "39359920",
    Email: "diazrodrigoar@gmail.com",
    Estado: "A",
    Usuario: "diazrod",
  },
  {
    Apellidos: "Luchesse",
    Nombres: "Augusto Gustavo",
    Documento: "20300100",
    Email: "gustavo@gmail.com",
    Estado: "B",
    Usuario: "lucheseaug",
  },
  {
    Apellidos: "Gomez",
    Nombres: "Juan Pedro",
    Documento: "20300100",
    Email: "gomez@gmail.com",
    Estado: "B",
    Usuario: "gomezjuan",
  },
];
// **********************

//Valor inicial
const valoresInicialesForm = {
  Apellidos: "",
  Nombres: "",
  Documento: "",
  Email: "",
  Bajas: false,
};

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
}) {
  const formik = useFormik({
    initialValues: valoresInicialesForm,
    validationSchema: validaciones,
    onSubmit: (values) => {
      modificarDatosBusqueda(values);
      handleBuscarDocentes(values);
      console.log(values);
    },
  });

  const handleBuscarDocentes = (values) => {
    //Realizo peticion
    peticionIniciada();
    //....

    //
    const respuesta = {
      docentes: docentesPrueba.slice(0, 4),
      // totalFilas: 2,
      totalPaginas: 5,
    };

    // console.log(respuesta.docentes);

    //Devuelvo resultado
    setTimeout(() => {
      resultadoBusqueda(respuesta);
      peticionFinalizada();
    }, 1000);
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
