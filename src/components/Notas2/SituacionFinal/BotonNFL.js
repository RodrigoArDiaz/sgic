import * as React from "react";
import { useState } from "react";
//MUI
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
//Responses
import * as Responses from "../../Responses";
//React router
import { useNavigate } from "react-router-dom";
//React spinner
import { ScaleLoader } from "react-spinners";
//Formik, yup
import { useFormik } from "formik";
import * as yup from "yup";

import { blue } from "@mui/material/colors";
import { OutlinedInputEditable } from "../../Material UI - Componentes Modificados/ComponentesNotas/ComponentesNotas";
import { useModal } from "../../../hooks/useModal";
import DialogCustom from "../../Material UI - Componentes Modificados/DialogCustom";
import { ErrorOutline } from "@mui/icons-material";

/*****************************************
 * Componente 'BotonNotaGrupo'
 */
export const BotonNFL = (props) => {
  //Para estilos
  const theme = useTheme();
  const colorBgSpinner = theme.palette.secondary.main;

  //Navegacion React Router
  const navegar = useNavigate();

  //Variable de estado que indica la nota
  const [nota, setNota] = useState(props.Nota < 0 ? "" : props.Nota);

  //Variable de estado que indica la nota
  const [notaNoCumpleCond, setNotaNoCumpleCond] = useState();

  //Variable de estado que indica el procesamiento de la peticion
  const [loading, setLoading] = useState(false);

  //Funciones modal
  const [isOpen, handleOpen, handleClose] = useModal(false);

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
      console.log("es numero");
      //Control: nota mayor a 0
      if (parseInt(notaParam) < 0) {
        props.abrir(true);
        props.mensaje("La nota debe ser mayor que 0");
        props.tipo("error");
        formik.resetForm();
      }
      //Comprueba si nota esta dentro de la escala
      else if (parseInt(notaParam) > props.Escala) {
        props.abrir(true);
        props.mensaje("La nota debe ser menor o igual que " + props.Escala);
        props.tipo("error");
        formik.resetForm();
      }
      //Comprueba si nuevo valor de nota es igual que el anterior
      else if (notaParam.trim() == nota) {
        // No se modifica si la nota es igual a la anterior
      }
      //Comprobacion si cumple condiciones
      else if (
        props.Cond1 > 0 ||
        props.Cond2 > 0 ||
        props.Cond3 > 0 ||
        props.Cond4 > 0
      ) {
        //Se  guarda la nota ingresada para ser usada luego de la confirmacio
        setNotaNoCumpleCond(notaParam);
        //Se muestra ventana modal de confirmacion si no cumple condicion
        handleOpen();
      }
      //Comprobacion completa, se realiza petición
      else {
        enviarPeticion(notaParam);
      }
    } else {
      formik.resetForm();
    }
  };

  //Envio de peticion
  const enviarPeticion = (notaParam) => {
    setLoading(true);
    //Estructura de datos a enviar
    // var data = {
    //   pNota: notaParam,
    //   pidAl: props.IdUsuario,
    //   //pidG: props.IdGrupo,
    //   pidDoc: localStorage.getItem("tkn2"), //IdDocente aunque aqui va el token
    //   pidE: props.IdExamen,
    //   pidCu: props.cursada.IdCursada,
    // };
    var data = {
      pidUs: props.pidUs,
      pidCu: props.cursada.IdCursada,
      pISW: "",
      pIS: "",
      pAsis: "",
      pNota: notaParam,
    };
    //Peticion
    Responses.consultas(data, "http://127.0.0.1:8000/api/modificarinscripcion")
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
  };

  return (
    <>
      {!loading ? (
        <FormControl sx={{ m: 1, width: 60 }}>
          {/* Sin estilos segun nota */}
          <OutlinedInputEditable
            id="notafinallibreta"
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
            sx={{
              color: blue[900],

              "& fieldset.MuiOutlinedInput-notchedOutline": {
                borderColor: blue[700] + "!important",
              },
            }}
          />
        </FormControl>
      ) : (
        <IconButton aria-label="estado3" size="small" color="inherit">
          <ScaleLoader color={colorBgSpinner} width="0.5" height="15" />
        </IconButton>
      )}

      {/* Modal confirmacion */}

      <DialogCustom
        open={isOpen}
        onClose={() => {
          handleClose();
          formik.resetForm();
        }}
      >
        <DialogTitle display="flex" flexDirection="row">
          <ErrorOutline sx={{ alignSelf: "center", marginRight: 1 }} />
          No cumple requisitos
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            El alumno no cumple requisitos mínimos de aprobación. ¿Desea asignar
            la nota?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              enviarPeticion(notaNoCumpleCond);
              handleClose();
            }}
          >
            Aceptar
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              handleClose();
              formik.resetForm();
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </DialogCustom>
    </>
  );
};
