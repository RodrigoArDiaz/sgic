import * as React from "react";
//MUI
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip, Zoom } from "@mui/material";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
//
import { useNavigate } from "react-router-dom";
import * as Responses from "../Responses";

export const BotonIS = (props) => {
  const navegar = useNavigate();
  const [salto, setSalto] = React.useState(props.inscripto);

  function manejador() {
    setSalto("C");

    if (props.inscripto === "S") {
      var data = {
        pISW: "",
        pIS: "N",
        pAsis: "",
        pNota: "",
        pidCu: props.cursada.IdCursada,
        pidUs: props.alumno.IdUsuario,
      };
    } else {
      var data = {
        pISW: "",
        pIS: "S",
        pAsis: "",
        pNota: "",
        pidCu: props.cursada.IdCursada,
        pidUs: props.alumno.IdUsuario,
      };
    }

    if (salto === "S") {
      Responses.consultas(
        data,
        "http://127.0.0.1:8000/api/modificarinscripcion"
      )
        .then((response) => {
          if (Responses.status === 200) {
            setSalto("N");
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
      if (salto === "N") {
        Responses.consultas(
          data,
          "http://127.0.0.1:8000/api/modificarinscripcion"
        )
          .then((response) => {
            if (Responses.status === 200) {
              setSalto("S");
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
      {salto === "S" && (
        <Grid item xs={12} sm="auto">
          <Tooltip title="Inscripto" TransitionComponent={Zoom} arrow>
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
      {salto === "N" && (
        <Grid item xs={12} sm="auto">
          <Tooltip title="No inscripto" TransitionComponent={Zoom} arrow>
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
      {salto === "C" && (
        <Grid item xs={12} sm="auto">
          <Tooltip title="Cargando" TransitionComponent={Zoom} arrow>
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
