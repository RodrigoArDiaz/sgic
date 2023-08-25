import React from "react";
//MUI
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
//
import { useNavigate } from "react-router-dom";
import * as Responses from "../../Responses";
import { endpoints } from "../../../api/endpoints";
import { routes } from "../../../routes";

/*** Componente Inscribir***/
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

    Responses.consultas(data, endpoints.inscribirEnGrupo)
      .then((response) => {
        if (Responses.status === 200) {
          props.abrir(true);
          props.mensaje("Alumno inscripto con éxito");
          props.tipo("success");
          setE("2");
        } else if (Responses.status === 401) {
          navegar(routes.iniciarSesion);
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
          navegar(routes.error);
        }
      })
      .catch((error) => {
        navegar(routes.error);
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
