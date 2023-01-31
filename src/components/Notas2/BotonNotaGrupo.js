import * as React from "react";
import { useState } from "react";
//MUI
import { useTheme } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
//Responses
import * as Responses from "../Responses";
//React router
import { useNavigate } from "react-router-dom";
//React spinner
import { ScaleLoader } from "react-spinners";
//Formik, yup
import { useFormik } from "formik";
import * as yup from "yup";
import OutlinedInputEditableNote from "../Material UI - Componentes Modificados/ComponentesNotas/OutlinedInputEditableNote";

/*****************************************
 * Componente 'BotonNotaGrupo'
 */
export const BotonNotaGrupo = (props) => {
  //Para estilos
  const theme = useTheme();
  const colorBgSpinner = theme.palette.primary.main;

  //Navegacion React Router
  const navegar = useNavigate();

  //Variable de estado que indica la nota
  const [nota, setNota] = useState(props.Nota < 0 ? "" : props.Nota);

  //Variable de estado que indica el procesamiento de la peticion
  const [loading, setLoading] = useState(false);

  //Valores iniciales del objeto formik
  const valoresInicialesForm = { nota: nota };

  //Objeto formik
  const formik = useFormik({
    enableReinitialize: true, //Se habilita el reinicio del form
    initialValues: valoresInicialesForm, //Se setean valores iniciales
    validationSchema: yup.object({}), //Se setea el esquema de validacion (vacio)
    //Handle del evento submit
    onSubmit: (values) => {
      handleSubmit(values.nota);
    },
  });

  //Handle submit
  const handleSubmit = (notaParam) => {
    //Control: nota es numero
    if (!isNaN(notaParam)) {
      //Control: nota mayor a 0
      if (parseInt(notaParam) < 0) {
        props.abrir(true);
        props.mensaje("La nota debe ser mayor que 0");
        props.tipo("error");
        formik.resetForm();
      }
      //Comprueba si nota esta dentro de la escala
      else if (parseInt(notaParam) > props.cursada.EscalaPracticos) {
        props.abrir(true);
        props.mensaje(
          "La nota debe ser menor o igual que " + props.cursada.EscalaPracticos
        );
        props.tipo("error");
        formik.resetForm();
      } else if (notaParam.trim() == nota) {
        // No se modifica si la nota es igual a la anterior
      } else {
        //Se indica que se esta realizando la peticion
        setLoading(true);
        //Estructura de datos a enviar
        var data = {
          pNota: notaParam,
          pidAl: "",
          pidG: props.IdGrupo,
          pidDoc: localStorage.getItem("tkn2"), //IdDocente aunque aqui va el token
          pidP: props.IdPractico,
          pidCu: props.cursada.IdCursada,
        };
        //Peticion
        Responses.consultas(
          data,
          "http://127.0.0.1:8000/api/modificarnotapractico"
        )
          .then((response) => {
            setLoading(false);
            if (Responses.status === 200) {
              // if (parseInt(notaParam) === 0) {
              //   setNombre("-");
              //   props.mensaje("Nota modificada: " + "-");
              // } else {
              //   setNombre(notaParam);
              props.mensaje("Nota modificada: " + notaParam);
              props.abrir(true);
              props.tipo("success");
              setNota(notaParam);
            } else if (Responses.status === 401) {
              navegar("/ingreso");
            } else if (Responses.status === 460) {
              // setTexto("");
              // setSalto("1");
              // if (response.nota1 !== undefined) {
              //   props.abrir(true);
              //   props.mensaje(response.nota1);
              //   props.tipo("error");
              // } else if (response.nota2 !== undefined) {
              //   props.abrir(true);
              //   props.mensaje(response.nota2);
              //   props.tipo("error");
              // }
            } else {
              navegar("/error");
            }
          })
          .catch((error) => {
            navegar("/error");
          });
      }
    } else {
      formik.resetForm();
    }
  };

  return (
    <>
      {!loading ? (
        <FormControl fullWidth>
          <OutlinedInputEditableNote
            id="grupo"
            type="text"
            placeholder="-"
            size="small"
            name="nota"
            value={formik.values.nota}
            onChange={formik.handleChange}
            onBlur={formik.handleSubmit}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                formik.handleSubmit();
              }
            }}
            notaEstilo={nota}
            notaMinEstilo={props.NMA}
          />
        </FormControl>
      ) : (
        <IconButton aria-label="estado3" size="small" color="inherit">
          <ScaleLoader color={colorBgSpinner} width="0.5" height="15" />
        </IconButton>
      )}
    </>
  );
};
