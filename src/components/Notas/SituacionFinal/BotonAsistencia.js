import * as React from "react";
//MUI
import IconButton from "@mui/material/IconButton";
import { Chip, Tooltip, Zoom } from "@mui/material";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
//
import * as Responses from "../../Responses";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../../api/endpoints";
import { routes } from "../../../routes";

/*** Componente BotonAsistencia ***/
export const BotonAsistencia = (props) => {
  const navegar = useNavigate();
  const [salto, setSalto] = React.useState(props.asistencia);

  function manejador() {
    if (salto === "C") {
      var data = {
        pidUs: props.pidUs,
        pidCu: props.cursada.IdCursada,
        pISW: "",
        pIS: "",
        pAsis: "N",
        pNota: "",
      };
      setSalto("S");
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
        var data = {
          pidUs: props.pidUs,
          pAs: "S",
          pidCu: props.cursada.IdCursada,
          pISW: "",
          pIS: "",
          pAsis: "C",
          pNota: "",
        };
        setSalto("S");
        Responses.consultas(data, endpoints.modificarInscripcion)
          .then((response) => {
            if (Responses.status === 200) {
              setSalto("C");
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
      {salto === "C" && (
        <Grid item xs={12} sm="auto">
          <Chip
            variant="outlined"
            color="success"
            label="Cumple "
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
            label="No cumple"
            icon={<HighlightOffOutlinedIcon />}
            onClick={() => manejador()}
          />
        </Grid>
      )}
      {salto === "S" && (
        <Grid item xs={12} sm="auto" TransitionComponent={Zoom} arrow>
          <Tooltip title="Verificando">
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
