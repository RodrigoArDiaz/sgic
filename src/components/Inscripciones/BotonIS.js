import * as React from "react";
//MUI
import IconButton from "@mui/material/IconButton";
import { Chip, Tooltip, Zoom } from "@mui/material";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
//
import { useNavigate } from "react-router-dom";
import * as Responses from "../Responses";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";

/*** Componente BotonIS ***/
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
      Responses.consultas(data, endpoints.modificarInscripcion)
        .then((response) => {
          if (Responses.status === 200) {
            setSalto("N");
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
      if (salto === "N") {
        Responses.consultas(data, endpoints.modificarInscripcion)
          .then((response) => {
            if (Responses.status === 200) {
              setSalto("S");
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
      {salto === "S" && (
        <Grid item xs={12} sm="auto">
          <Chip
            variant="outlined"
            color="success"
            label="Inscripto"
            icon={<CheckCircleOutlineOutlined />}
            onClick={() => manejador()}
          />
        </Grid>
      )}
      {salto === "N" && (
        <Grid item xs={12} sm="auto">
          <Chip
            variant="outlined"
            color="error"
            label="No inscripto"
            icon={<HighlightOffOutlinedIcon />}
            onClick={() => manejador()}
          />
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
