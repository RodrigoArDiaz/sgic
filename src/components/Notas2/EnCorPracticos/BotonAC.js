import React from "react";
import IconButton from "@mui/material/IconButton";
import { Box, Divider, Tooltip, Zoom } from "@mui/material";
import BotonAceptar from "./BotonAceptar";
import ECVisual from "./ECVisual";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import * as Responses from "../../Responses";
import {
  CheckCircleOutlineOutlined,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import CorreccionesVisual from "./CorreccionesVisual";
import { endpoints } from "../../../api/endpoints";

//Componente
export const BotonAC = (props) => {
  const navegar = useNavigate();

  function Transformar(param) {
    if (param === "-") return "";
    else return param;
  }
  const [salto, setSalto] = React.useState(props.enunciado);
  const [salto2, setSalto2] = React.useState(props.correcciones);

  //Handler Enunciado
  function manejador(variable) {
    if (props.param1 !== undefined) {
      if (props.param1.trim() !== "") {
        if (variable === "1") {
          var data = {
            pEnc: props.param1,
            pCor: Transformar(props.correcciones),
            pidCP: props.IdCursadaPractico,
            pidCu: props.cursada.IdCursada,
            //
            // pidDoc: localStorage.getItem("tkn2"),
          };
          setSalto(false);

          Responses.consultas(data, endpoints.modificarecpra)
            .then((response) => {
              if (Responses.status === 200) {
                props.mensaje("Enunciado modificado");
                props.abrir(true);

                props.tipo2("success");

                setSalto(props.param1);
              } else if (Responses.status === 401) {
                // navegar("/ingreso");
                // console.log(Responses);
              } else {
                navegar("/error");
              }
            })
            .catch((error) => {
              navegar("/error");
              console.log(error);
            });
        }
      } else {
        props.mensaje(
          "No se puede cargar enunciado: el campo 'Enunciado' esta vacio"
        );
        props.abrir(true);
        props.tipo2("error");
      }
    } else {
      props.mensaje(
        "No se puede cargar enunciado: el campo 'Enunciado' esta vacio"
      );
      props.abrir(true);
      props.tipo2("error");
    }

    if (variable === "2") {
      var data = {
        pEnc: "",
        pCor: Transformar(props.correcciones),
        pidCP: props.IdCursadaPractico,
        pidCu: props.cursada.IdCursada,
      };

      setSalto(false);
      Responses.consultas(data, endpoints.modificarecpra)
        .then((response) => {
          if (Responses.status === 200) {
            setSalto("-");

            props.mensaje("Enunciado borrado");
            props.abrir(true);

            props.tipo2("warning");
          } else if (Responses.status === 401) {
            navegar("/ingreso");
          } else {
            navegar("/error");
          }
        })
        .catch((error) => {
          navegar("/error");
        });
    }
  }

  //Handler Correcciones
  function manejador2(variable) {
    if (props.param2 !== undefined) {
      if (props.param2.trim() !== "") {
        if (variable === "1") {
          var data = {
            pEnc: Transformar(props.enunciado),
            pCor: props.param2,
            pidCP: props.IdCursadaPractico,
            pidCu: props.cursada.IdCursada,
          };
          setSalto2(false);
          Responses.consultas(data, endpoints.modificarecpra)
            .then((response) => {
              if (Responses.status === 200) {
                props.mensaje("Enunciado modificado");
                props.abrir(true);

                props.tipo2("success");

                setSalto2(props.param2);
              } else if (Responses.status === 401) {
                navegar("/ingreso");
              } else {
                navegar("/error");
              }
            })
            .catch((error) => {
              navegar("/error");
            });
        }
      } else {
        props.mensaje(
          "No se puede cargar corrección: el campo 'Correcciones' esta vacio"
        );
        props.abrir(true);
        props.tipo2("error");
      }
    } else {
      props.mensaje(
        "No se puede cargar corrección: el campo 'Correcciones' esta vacio"
      );
      props.abrir(true);
      props.tipo2("error");
    }

    if (variable === "2") {
      var data = {
        pEnc: Transformar(props.enunciado),
        pCor: "",
        pidCP: props.IdCursadaPractico,
        pidCu: props.cursada.IdCursada,
      };

      setSalto2(false);
      Responses.consultas(data, endpoints.modificarecpra)
        .then((response) => {
          if (Responses.status === 200) {
            setSalto2("-");

            props.mensaje("Enunciado borrado");
            props.abrir(true);

            props.tipo2("warning");
          } else if (Responses.status === 401) {
            navegar("/ingreso");
          } else {
            navegar("/error");
          }
        })
        .catch((error) => {
          navegar("/error");
        });
    }
  }

  //*********************************************** */
  //Verificando
  if (salto === false && props.tipo === "Enunciado") {
    return (
      <IconButton aria-label="estado3" size="small" color="inherit">
        <CircularProgress size={25} color="primary" />
      </IconButton>
    );
  }

  if (salto2 === false && props.tipo === "Correcciones") {
    return (
      <IconButton aria-label="estado3" size="small" color="inherit">
        <CircularProgress size={25} color="primary" />
      </IconButton>
    );
  }

  //*********************************************** */
  //Con enunciado
  if (salto !== "-" && props.tipo === "Enunciado") {
    return (
      <Box
        display="inline-flex"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <ECVisual valor={salto} />

        <Divider orientation="vertical" flexItem />
        <BotonAceptar Operacion={manejador} />
        <Tooltip title="Borrar enunciado" TransitionComponent={Zoom} arrow>
          <IconButton
            aria-label="enunciado2"
            size="small"
            onClick={() => manejador("2")}
          >
            <DeleteOutlineOutlined color="secondary" />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  //*********************************************** */
  //SIN enunciado
  if (salto === "-" && props.tipo === "Enunciado") {
    return (
      <Box
        display="inline-flex"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <ECVisual valor={salto} label="Sin enunciado" type="error" />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ marginLeft: 2, marginRight: 1 }}
        />
        <Tooltip title="Cargar enunciado" TransitionComponent={Zoom} arrow>
          <IconButton
            aria-label="enunciado1"
            size="small"
            onClick={() => manejador("1")}
          >
            <CheckCircleOutlineOutlined color="secondary" />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  //*********************************************** */
  //Con correcciones
  if (salto2 !== "-" && props.tipo === "Correcciones") {
    return (
      <Box
        display="inline-flex"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <CorreccionesVisual valor={salto2} />

        <Divider
          orientation="vertical"
          flexItem
          sx={{ marginLeft: 2, marginRight: 1 }}
        />

        <Tooltip title="Recargar correcciones" TransitionComponent={Zoom} arrow>
          <IconButton
            aria-label="correcciones1"
            size="small"
            color="success"
            onClick={() => manejador2("1")}
          >
            <CheckCircleOutlineOutlined color="secondary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Borrar correcciones" TransitionComponent={Zoom} arrow>
          <IconButton
            aria-label="correcciones2"
            size="small"
            onClick={() => manejador2("2")}
          >
            <DeleteOutlineOutlined color="secondary" />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  //*********************************************** */
  //SIN correcciones
  if (salto2 === "-" && props.tipo === "Correcciones") {
    return (
      <Box
        display="inline-flex"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <CorreccionesVisual
          valor={salto2}
          label="Sin correcciones"
          type="info"
        />

        <Divider
          orientation="vertical"
          flexItem
          sx={{ marginLeft: 2, marginRight: 1 }}
        />

        <Tooltip title="Cargar correciones" TransitionComponent={Zoom} arrow>
          <IconButton
            aria-label="correcciones1"
            size="small"
            onClick={() => manejador2("1")}
          >
            <CheckCircleOutlineOutlined color="secondary" />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }
};
