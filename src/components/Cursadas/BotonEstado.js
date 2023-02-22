import * as React from "react";
//MUI
import IconButton from "@mui/material/IconButton";
import { Chip, Tooltip, Zoom } from "@mui/material";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
//
import { useNavigate } from "react-router-dom";
import * as Responses from "../Responses";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";

/*** Componente BotonEstado ***/
export const BotonEstado = (props) => {
  const navegar = useNavigate();
  const [salto, setSalto] = React.useState(props.estado);

  function manejador() {
    var data = {
      IdCursada: props.idcursada,
    };

    if (salto === "I") {
      setSalto("C");
      Responses.consultas(data, endpoints.altaCursada)
        .then((response) => {
          if (Responses.status === 200) {
            setSalto("A");
          } else if (Responses.status === 401) {
            navegar(routes.iniciarSesion);
          } else {
            navegar(routes.error);
          }
        })
        .catch((error) => {
          navegar(routes.error);
        });
    }

    if (salto === "A") {
      setSalto("C");
      Responses.consultas(data, endpoints.bajaCursada)
        .then((response) => {
          if (Responses.status === 200) {
            setSalto("B");
          } else if (Responses.status === 401) {
            navegar(routes.iniciarSesion);
          } else {
            navegar(routes.error);
          }
        })
        .catch((error) => {
          navegar(routes.error);
        });
    } else {
      if (salto === "B") {
        setSalto("C");
        Responses.consultas(data, endpoints.abrirInscripcion)
          .then((response) => {
            if (Responses.status === 200) {
              setSalto("I");
            } else if (Responses.status === 401) {
              navegar(routes.iniciarSesion);
            } else {
              navegar(routes.error);
            }
          })
          .catch((error) => {
            navegar(routes.error);
          });
      }
    }
  }

  return (
    <>
      {salto === "A" && (
        <Grid item xs={12} sm="auto">
          {/* <Tooltip title="Activa" TransitionComponent={Zoom} arrow>
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
          </Tooltip> */}
          <Chip
            variant="outlined"
            color="success"
            label="Alta"
            icon={<CheckCircleOutlineOutlined />}
            onClick={() => manejador()}
          />
        </Grid>
      )}

      {salto === "B" && (
        <Grid item xs={12} sm="auto">
          {/* <Tooltip title="Baja" TransitionComponent={Zoom} arrow>
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
          </Tooltip> */}
          <Chip
            variant="outlined"
            color="error"
            label="Baja"
            icon={<HighlightOffOutlinedIcon />}
            onClick={() => manejador()}
          />
        </Grid>
      )}

      {salto === "I" && (
        <Grid item xs={12} sm="auto">
          {/* <Tooltip title="Inscripción abierta" TransitionComponent={Zoom} arrow>
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
          </Tooltip> */}
          <Chip
            variant="outlined"
            color="warning"
            label="Inscripción abierta"
            icon={<CampaignOutlinedIcon />}
            onClick={() => manejador()}
          />
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
