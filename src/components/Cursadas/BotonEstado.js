import * as React from "react";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip, Zoom } from "@mui/material";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import CampaignIcon from "@mui/icons-material/Campaign";
import * as Responses from "../Responses";

export const BotonEstado = (props) => {
  const navegar = useNavigate();
  const [salto, setSalto] = React.useState(props.estado);

  function manejador() {
    var data = {
      IdCursada: props.idcursada,
    };

    if (salto === "I") {
      setSalto("C");
      Responses.consultas(data, "http://127.0.0.1:8000/api/altacursada")
        .then((response) => {
          if (Responses.status === 200) {
            setSalto("A");
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

    if (salto === "A") {
      setSalto("C");
      Responses.consultas(data, "http://127.0.0.1:8000/api/bajacursada")
        .then((response) => {
          if (Responses.status === 200) {
            setSalto("B");
          } else if (Responses.status === 401) {
            navegar("/ingreso");
          } else {
            navegar("/error");
          }
        })
        .catch((error) => {
          navegar("/error");
        });
    } else {
      if (salto === "B") {
        setSalto("C");
        Responses.consultas(data, "http://127.0.0.1:8000/api/abririnscripcion")
          .then((response) => {
            if (Responses.status === 200) {
              setSalto("I");
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
  }

  return (
    <>
      {salto === "A" && (
        <Grid item xs={12} sm="auto">
          <Tooltip title="Activa" TransitionComponent={Zoom} arrow>
            <span>
              <IconButton
                aria-label="estado"
                size="small"
                color="success"
                onClick={() => manejador()}
              >
                <CheckIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Grid>
      )}
      {salto === "B" && (
        <Grid item xs={12} sm="auto">
          <Tooltip title="Baja" TransitionComponent={Zoom} arrow>
            <span>
              <IconButton
                aria-label="estado2"
                size="small"
                color="error"
                onClick={() => manejador()}
              >
                <CloseIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Grid>
      )}

      {salto === "I" && (
        <Grid item xs={12} sm="auto">
          <Tooltip title="Inscripción abierta" TransitionComponent={Zoom} arrow>
            <span>
              <IconButton
                aria-label="estado5"
                size="small"
                color="warning"
                onClick={() => manejador()}
              >
                <CampaignIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Grid>
      )}

      {salto === "C" && (
        <Grid item xs={12} sm="auto">
          <Tooltip title="Verificando" TransitionComponent={Zoom} arrow>
            <span>
              <IconButton
                aria-label="estado3"
                size="small"
                color="inherit"
                onClick={() => manejador()}
              >
                <CircularProgress size={21} />
              </IconButton>
            </span>
          </Tooltip>
        </Grid>
      )}
    </>
  );
};
