import React from "react";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import * as Responses from "../../Responses";

export const InscribirAlumno = (props) => {
  const navegar = useNavigate();
  const [est, setE] = React.useState("1");

  function Inscribir() {
    setE("3");
    var data = {
      pidUs: props.idalumno,
      pidCu: props.idcursada,
    };
    Responses.consultas(data, "http://127.0.0.1:8000/api/inscribiralumno")
      .then((response) => {
        if (Responses.status === 200) {
          props.abrir(true);
          props.mensaje("Alumno inscripto con éxito");
          props.tipo("success");

          setE("2");
        } else if (Responses.status === 401) {
          navegar("/ingreso");
        } else if (Responses.status === 460) {
          setE("2");
        } else {
          navegar("/error");
        }
      })
      .catch((error) => {
        console.log("Error de conexión en borrar" + error);
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
            color="success"
            onClick={() => {
              Inscribir();
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}

      {est === "2" && (
        <Tooltip title="Inscripto">
          <IconButton aria-label="error" size="small">
            <Brightness1Icon />
          </IconButton>
        </Tooltip>
      )}

      {est === "3" && (
        <Tooltip title="Cargando">
          <IconButton aria-label="esperando" size="small">
            <CircularProgress />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};
