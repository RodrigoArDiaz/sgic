import * as React from "react";
//MUI
import IconButton from "@mui/material/IconButton";
import { Chip, Tooltip, Zoom } from "@mui/material";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
//React router
import { useNavigate } from "react-router-dom";
//Responses
import * as Responses from "../Responses";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import { endpoints } from "../../api/endpoints";
import { routes } from "../../routes";

/*** Componente BotonEstado***/
export const BotonEstado = (props) => {
  const navegar = useNavigate();
  const [salto, setSalto] = React.useState(props.estado);

  function manejador() {
    var data = {
      pidCu: props.cursada.IdCursada,
      pidE: props.idexamen,
    };

    if (salto === "A") {
      setSalto("C");
      Responses.consultas(data, endpoints.bajaExamen)
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
        Responses.consultas(data, endpoints.altaExamen)
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
    }
  }

  return (
    <>
      {salto === "A" && (
        <Grid item xs={12} sm="auto">
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
          <Chip
            variant="outlined"
            color="error"
            label="Baja"
            icon={<HighlightOffOutlinedIcon />}
            onClick={() => manejador()}
          />
        </Grid>
      )}
      {salto === "C" && (
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
