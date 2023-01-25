import React from "react";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import * as Responses from "../../Responses";

export const Inscribir = (props) => {
  const navegar = useNavigate();
  const [est, setE] = React.useState("1");

  function Inscribir() {
    setE("3");
    var data = {
      pidUs: props.alumno.IdUsuario,
      pidCu: props.cursada.IdCursada,
      pidG: props.grupo.IdGrupo,
    };

    Responses.consultas(data, "http://127.0.0.1:8000/api/inscribirengrupo")
      .then((response) => {
        if (Responses.status === 200) {
          props.abrir(true);
          props.mensaje("Alumno inscripto con éxito");
          props.tipo("success");
          setE("2");
        } else if (Responses.status === 401) {
          navegar("/ingreso");
        } else if (Responses.status === 460) {
          if (response.Integrantes !== "") {
            props.abrir(true);
            props.mensaje(response.Integrantes);
            props.tipo("error");
            setE("1");
          } else {
            setE("2");
          }
        } else {
          navegar("/error");
        }
      })
      .catch((error) => {
        navegar("/error");
      });
  }

  return (
    <>
      {est === "1" && (
        <Tooltip title="Inscribir">
          <IconButton
            aria-label="verificado"
            size="small"
            color="secondary"
            onClick={() => {
              Inscribir();
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      )}

      {est === "2" && (
        <Tooltip title="Inscripto">
          <IconButton aria-label="Inscripto" size="small" color="success">
            <CheckCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      )}

      {est === "3" && (
        <Tooltip title="Cargando">
          <IconButton aria-label="esperando" size="small">
            <CircularProgress size={21} />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};
